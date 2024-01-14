const express = require('express');
const firebase = require('firebase');
const router = express.Router();
const moment = require('moment-timezone');

const firebaseConfig = {
    apiKey: "AIzaSyBU-D4ErWsAMc9RWsP8CgT-B47EO75Ie8s",
    authDomain: "mediq-12a20.firebaseapp.com",
    projectId: "mediq-12a20",
    storageBucket: "mediq-12a20.appspot.com",
    messagingSenderId: "98485645678",
    appId: "1:98485645678:web:137bfd2bd4b6598c5dd17f",
    measurementId: "G-3MHN20Z2KJ"
};

firebase.initializeApp(firebaseConfig);

function redirectIfLoggedIn(req, res, next) {
    if (req.session.user) {
        res.redirect('/dashboard');
    } else {
        next();
    }
}


router.get('/signup-email', redirectIfLoggedIn, (req, res) => {
    res.sendFile(__dirname + '/public/signup-email.html');
});

router.post('/signup-email', (req, res) => {
    const { email, gender, fullName, birthDate, nik, password} = req.body;
    const role = 'patient';
    const db = firebase.firestore();
    
    db.collection('users').where('email', '==', email).get()
    .then((snapshot) => {
        if (!snapshot.empty) {
            // res.status(400).json({ status: 'error', message: 'Email sudah terdaftar', field: 'email' });
            res.status(400).send('Email sudah terdaftar');
        } else {
            db.collection('users').where('nik', '==', nik).get()
            .then((snapshot) => {
                if (!snapshot.empty) {
                    res.status(400).send('Nik sudah terdaftar');
                } else {
                    db.collection('users').add({
                        email,
                        phoneNumber: '',
                        gender,
                        fullName,
                        birthDate,
                        nik,
                        password,
                        role
                    }).then((docRef) => {
                        db.collection('users').doc(docRef.id).collection('booking').add({}).then(() => {
                            res.status(200).json({ status: 'success', message: 'Akun berhasil didaftarkan, silahkan login untuk melanjutkan', field: 'nik' });
                        }).catch((error) => {
                            console.error("Error adding booking collection: ", error);
                        });
                    }).catch((error) => {
                        console.error("Error adding data: ", error);
                    });
                }
            }).catch((error) => {
                console.error("Error checking NIK: ", error);
            });
        }
    }).catch((error) => {
        console.error("Error checking email: ", error);
    });
});




router.get('/signup-phone', redirectIfLoggedIn, (req, res) => {
    res.sendFile(__dirname + '/public/signup-phone.html');
});

router.post('/signup-phone', (req, res) => {
    const { phoneNumber, gender, fullName, birthDate, nik, password} = req.body;
    const role = 'patient';
    const db = firebase.firestore();
    
    db.collection('users').where('phoneNumber', '==', phoneNumber).get()
    .then((snapshot) => {
        if (!snapshot.empty) {
            res.status(400).send("no telepon sudah terdaftar");
        } else {
            db.collection('users').where('nik', '==', nik).get()
            .then((snapshot) => {
                if (!snapshot.empty) {
                    res.status(400).send('NIK sudah terdaftar');
                } else {
                    db.collection('users').add({
                        email: '',
                        phoneNumber,
                        gender,
                        fullName,
                        birthDate,
                        nik,
                        password,
                        role
                    }).then((docRef) => {
                        db.collection('users').doc(docRef.id).collection('booking').add({}).then(() => {
                            res.status(200).send('Akun anda sudah berhasil dibuat');
                        }).catch((error) => {
                            console.error("Error adding booking collection: ", error);
                        });
                    }).catch((error) => {
                        console.error("Error adding data: ", error);
                    });
                }
            }).catch((error) => {
                console.error("Error checking NIK: ", error);
            });
        }
    }).catch((error) => {
        console.error("Error checking phone number: ", error);
    });
});



router.get('/login', redirectIfLoggedIn, (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

router.post('/login', (req, res) => {
    const { identifier, password } = req.body;
    const db = firebase.firestore();

    if (typeof identifier !== 'string' || !identifier.trim()) {
        res.status(400).send('Format identifier tidak terdaftar')
        return;
    }

    let queryField = 'email';
    if (identifier.includes('@')) {
        queryField = 'email';
    } else {
        queryField = 'phoneNumber';
    }

    db.collection('users').where(queryField, '==', identifier).get()
        .then((snapshot) => {
            if (snapshot.empty) {
                res.status(400).send('Maaf, '+queryField + ' tidak terdaftar' );
                return;
            }

            snapshot.forEach((doc) => {
                const data = doc.data();
                if (data.password !== password) {
                    res.status(400).send('Maaf, Password salah');
                    return;
                }
                const userFullName = data.fullName;
                const userRole = data.role
                req.session.user = data;
                res.status(200).json({
                    message : 'Anda berhasil Login',
                    fullName : userFullName, role : userRole,
                });
                res.redirect('/dashboard');
            });
        })
        .catch((error) => {
            console.error("Error during login:", error);
        });
});

router.post('/logout', (req, res) => {
    delete req.session.user;
    res.redirect('/');
});

router.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        res.redirect('/');
        return;
    }

    const { role } = req.session.user;

    if (role === 'patient') {
        res.render('dashboard-user', { user: req.session.user });
    } else if (role === 'clinic') {
        res.render('dashboard-clinic', { user: req.session.user });
    } else {
        res.redirect('/');
    }
});

router.get('/rekam-medis', (req, res) => {
    if (!req.session.user){
        res.redirect('/');
        return;
    }
    res.render('rekam-medis', { user: req.session.user });
});

router.get('/konsultasi-kesehatan', (req, res) => {
    if (!req.session.user){
        res.redirect('/');
        return;
    }
    res.sendFile(__dirname + '/public/konsultasi-kesehatan.html');
});

router.get('/konsultasi-kesehatan/dokter-umum', (req, res) => {
    if (!req.session.user){
        res.redirect('/');
        return;
    }
    let doctors = [];
    const db = firebase.firestore();
    db.collection('doctors').where('bidang', '==', 'umum').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doctors.push(doc.data());
            });
            res.render('dokter-umum', { doctors: doctors });
        })
        .catch((error) => {
            console.error("Error getting data: ", error);
        });
});


router.get('/konsultasi-kesehatan/dokter-gigi-mulut', (req, res) => {
    if (!req.session.user){
        res.redirect('/');
        return;
    }
    let doctors = [];
    const db = firebase.firestore();
    db.collection('doctors').where('bidang', '==', 'gigi mulut').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doctors.push(doc.data());
            });
            res.render('dokter-gigi-mulut', { doctors: doctors });
        })
        .catch((error) => {
            console.error("Error getting data: ", error);
        });
});

router.get('/konsultasi-kesehatan/dokter-anak-remaja', (req, res) => {
    if (!req.session.user){
        res.redirect('/');
        return;
    }
    let doctors = [];
    const db = firebase.firestore();
    db.collection('doctors').where('bidang', '==', 'anak dan remaja').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doctors.push(doc.data());
            });
            res.render('dokter-anak-remaja', { doctors: doctors });
        })
        .catch((error) => {
            console.error("Error getting data: ", error);
        });
});

router.get('/konsultasi-kesehatan/dokter-ibu-kb', (req, res) => {
    if (!req.session.user){
        res.redirect('/');
        return;
    }
    let doctors = [];
    const db = firebase.firestore();
    db.collection('doctors').where('bidang', '==', 'ibu dan kb').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doctors.push(doc.data());
            });
            res.render('dokter-ibu-kb', { doctors: doctors });
        })
        .catch((error) => {
            console.error("Error getting data: ", error);
        });
});

router.get('/konsultasi-kesehatan/dokter-lansia', (req, res) => {
    if (!req.session.user){
        res.redirect('/');
        return;
    }
    let doctors = [];
    const db = firebase.firestore();
    db.collection('doctors').where('bidang', '==', 'lansia').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doctors.push(doc.data());
            });
            res.render('dokter-lansia', { doctors: doctors });
        })
        .catch((error) => {
            console.error("Error getting data: ", error);
        });
});

router.get('/konsultasi-kesehatan/dokter-umum/:doctorId', (req, res) => {
    if (!req.session.user) {
        res.redirect('/');
        return;
    }
    
    const doctorId = req.params.doctorId;
    const db = firebase.firestore();

    db.collection('doctors').where('id', '==', doctorId).get()
        .then((querySnapshot) => {
            const doctors = querySnapshot.docs.map((doc) => doc.data());
            res.render('pilih-jadwal-dokter', { doctors: doctors });
        })
        .catch((error) => {
            console.error("Error getting data: ", error);
            res.status(500).send("Error getting data");
        });
});

router.get('/konsultasi-kesehatan/dokter-gigi-mulut/:doctorId', (req, res) => {
    if (!req.session.user) {
        res.redirect('/');
        return;
    }
    
    const doctorId = req.params.doctorId;
    const db = firebase.firestore();

    db.collection('doctors').where('id', '==', doctorId).get()
        .then((querySnapshot) => {
            const doctors = querySnapshot.docs.map((doc) => doc.data());
            res.render('pilih-jadwal-dokter', { doctors: doctors });
        })
        .catch((error) => {
            console.error("Error getting data: ", error);
            res.status(500).send("Error getting data");
        });
});

router.get('/konsultasi-kesehatan/dokter-anak-remaja/:doctorId', (req, res) => {
    if (!req.session.user) {
        res.redirect('/');
        return;
    }
    
    const doctorId = req.params.doctorId;
    const db = firebase.firestore();

    db.collection('doctors').where('id', '==', doctorId).get()
        .then((querySnapshot) => {
            const doctors = querySnapshot.docs.map((doc) => doc.data());
            res.render('pilih-jadwal-dokter', { doctors: doctors });
        })
        .catch((error) => {
            console.error("Error getting data: ", error);
            res.status(500).send("Error getting data");
        });
});

router.get('/konsultasi-kesehatan/dokter-gizi/:doctorId', (req, res) => {
    if (!req.session.user) {
        res.redirect('/');
        return;
    }
    
    const doctorId = req.params.doctorId;
    const db = firebase.firestore();

    db.collection('doctors').where('id', '==', doctorId).get()
        .then((querySnapshot) => {
            const doctors = querySnapshot.docs.map((doc) => doc.data());
            res.render('pilih-jadwal-dokter', { doctors: doctors });
        })
        .catch((error) => {
            console.error("Error getting data: ", error);
            res.status(500).send("Error getting data");
        });
});

router.get('/konsultasi-kesehatan/dokter-ibu-kb/:doctorId', (req, res) => {
    if (!req.session.user) {
        res.redirect('/');
        return;
    }
    
    const doctorId = req.params.doctorId;
    const db = firebase.firestore();

    db.collection('doctors').where('id', '==', doctorId).get()
        .then((querySnapshot) => {
            const doctors = querySnapshot.docs.map((doc) => doc.data());
            res.render('pilih-jadwal-dokter', { doctors: doctors });
        })
        .catch((error) => {
            console.error("Error getting data: ", error);
            res.status(500).send("Error getting data");
        });
});

router.get('/konsultasi-kesehatan/dokter-lansia/:doctorId', (req, res) => {
    if (!req.session.user) {
        res.redirect('/');
        return;
    }
    
    const doctorId = req.params.doctorId;
    const db = firebase.firestore();

    db.collection('doctors').where('id', '==', doctorId).get()
        .then((querySnapshot) => {
            const doctors = querySnapshot.docs.map((doc) => doc.data());
            res.render('pilih-jadwal-dokter', { doctors: doctors });
        })
        .catch((error) => {
            console.error("Error getting data: ", error);
            res.status(500).send("Error getting data");
        });
});


router.post('/konsultasi-kesehatan/dokter-umum/:doctorId/booking', async (req, res) => {
    if (!req.session.user) {
        res.redirect('/');
        return;
    }

    const userNIK = req.session.user.nik;
    const doctorId = req.params.doctorId;
    const { tanggal, waktu } = req.body;
    const timezone = 'Asia/Jakarta';

    const db = firebase.firestore();

    try {
        const doctorRef = db.collection('doctors').doc(doctorId);
        const doc = await doctorRef.get();

        if (!doc.exists) {
            res.status(404).send('Dokter tidak ditemukan.');
            return;
        }

        const doctorData = doc.data();
        const doctorName = doctorData.name;
        const doctorBidang = doctorData.bidang;

        const datetime = moment.tz(`${tanggal} ${waktu}`, 'YYYY-MM-DD HH:mm', timezone);
        const timestamp = datetime.toDate();

        await doctorRef.collection('schedule').add({
            pasien: req.session.user.fullName,
            nikPasien: userNIK,
            tanggal: timestamp,
            waktu: waktu,
        });

        const userDocRef = db.collection('users').where('nik', '==', userNIK);
        const userQuerySnapshot = await userDocRef.get();

        if (userQuerySnapshot.empty) {
            throw new Error('Pengguna dengan NIK tersebut tidak ditemukan.');
        }

        const userDoc = userQuerySnapshot.docs[0].ref;
        await userDoc.collection('booking').add({
            doctorName: doctorName,
            doctorBidang: doctorBidang,
            tanggal: timestamp,
            waktu: waktu,
            doctorId: doctorId
        });

        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).send('Terjadi kesalahan.');
    }
});

router.post('/konsultasi-kesehatan/dokter-anak-remaja/:doctorId/booking', async (req, res) => {
    if (!req.session.user) {
        res.redirect('/');
        return;
    }

    const userNIK = req.session.user.nik;
    const doctorId = req.params.doctorId;
    const { tanggal, waktu } = req.body;
    const timezone = 'Asia/Jakarta';

    const db = firebase.firestore();

    try {
        const doctorRef = db.collection('doctors').doc(doctorId);
        const doc = await doctorRef.get();

        if (!doc.exists) {
            res.status(404).send('Dokter tidak ditemukan.');
            return;
        }

        const doctorData = doc.data();
        const doctorName = doctorData.name;
        const doctorBidang = doctorData.bidang;

        const datetime = moment.tz(`${tanggal} ${waktu}`, 'YYYY-MM-DD HH:mm', timezone);
        const timestamp = datetime.toDate();

        await doctorRef.collection('schedule').add({
            pasien: req.session.user.fullName,
            nikPasien: userNIK,
            tanggal: timestamp,
            waktu: waktu,
        });

        const userDocRef = db.collection('users').where('nik', '==', userNIK);
        const userQuerySnapshot = await userDocRef.get();

        if (userQuerySnapshot.empty) {
            throw new Error('Pengguna dengan NIK tersebut tidak ditemukan.');
        }

        const userDoc = userQuerySnapshot.docs[0].ref;
        await userDoc.collection('booking').add({
            doctorName: doctorName,
            doctorBidang: doctorBidang,
            tanggal: timestamp,
            waktu: waktu,
            doctorId: doctorId
        });

        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).send('Terjadi kesalahan.');
    }
});

router.post('/konsultasi-kesehatan/dokter-gigi-mulut/:doctorId/booking', async (req, res) => {
    if (!req.session.user) {
        res.redirect('/');
        return;
    }

    const userNIK = req.session.user.nik;
    const doctorId = req.params.doctorId;
    const { tanggal, waktu } = req.body;
    const timezone = 'Asia/Jakarta';

    const db = firebase.firestore();

    try {
        const doctorRef = db.collection('doctors').doc(doctorId);
        const doc = await doctorRef.get();

        if (!doc.exists) {
            res.status(404).send('Dokter tidak ditemukan.');
            return;
        }

        const doctorData = doc.data();
        const doctorName = doctorData.name;
        const doctorBidang = doctorData.bidang;

        const datetime = moment.tz(`${tanggal} ${waktu}`, 'YYYY-MM-DD HH:mm', timezone);
        const timestamp = datetime.toDate();

        await doctorRef.collection('schedule').add({
            pasien: req.session.user.fullName,
            nikPasien: userNIK,
            tanggal: timestamp,
            waktu: waktu,
        });

        const userDocRef = db.collection('users').where('nik', '==', userNIK);
        const userQuerySnapshot = await userDocRef.get();

        if (userQuerySnapshot.empty) {
            throw new Error('Pengguna dengan NIK tersebut tidak ditemukan.');
        }

        const userDoc = userQuerySnapshot.docs[0].ref;
        await userDoc.collection('booking').add({
            doctorName: doctorName,
            doctorBidang: doctorBidang,
            tanggal: timestamp,
            waktu: waktu,
            doctorId: doctorId
        });

        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).send('Terjadi kesalahan.');
    }
});

router.post('/konsultasi-kesehatan/dokter-gizi/:doctorId/booking', async (req, res) => {
    if (!req.session.user) {
        res.redirect('/');
        return;
    }

    const userNIK = req.session.user.nik;
    const doctorId = req.params.doctorId;
    const { tanggal, waktu } = req.body;
    const timezone = 'Asia/Jakarta';

    const db = firebase.firestore();

    try {
        const doctorRef = db.collection('doctors').doc(doctorId);
        const doc = await doctorRef.get();

        if (!doc.exists) {
            res.status(404).send('Dokter tidak ditemukan.');
            return;
        }

        const doctorData = doc.data();
        const doctorName = doctorData.name;
        const doctorBidang = doctorData.bidang;

        const datetime = moment.tz(`${tanggal} ${waktu}`, 'YYYY-MM-DD HH:mm', timezone);
        const timestamp = datetime.toDate();

        await doctorRef.collection('schedule').add({
            pasien: req.session.user.fullName,
            nikPasien: userNIK,
            tanggal: timestamp,
            waktu: waktu,
        });

        const userDocRef = db.collection('users').where('nik', '==', userNIK);
        const userQuerySnapshot = await userDocRef.get();

        if (userQuerySnapshot.empty) {
            throw new Error('Pengguna dengan NIK tersebut tidak ditemukan.');
        }

        const userDoc = userQuerySnapshot.docs[0].ref;
        await userDoc.collection('booking').add({
            doctorName: doctorName,
            doctorBidang: doctorBidang,
            tanggal: timestamp,
            waktu: waktu,
            doctorId: doctorId
        });

        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).send('Terjadi kesalahan.');
    }
});

router.post('/konsultasi-kesehatan/dokter-ibu-kb/:doctorId/booking', async (req, res) => {
    if (!req.session.user) {
        res.redirect('/');
        return;
    }

    const userNIK = req.session.user.nik;
    const doctorId = req.params.doctorId;
    const { tanggal, waktu } = req.body;
    const timezone = 'Asia/Jakarta';

    const db = firebase.firestore();

    try {
        const doctorRef = db.collection('doctors').doc(doctorId);
        const doc = await doctorRef.get();

        if (!doc.exists) {
            res.status(404).send('Dokter tidak ditemukan.');
            return;
        }

        const doctorData = doc.data();
        const doctorName = doctorData.name;
        const doctorBidang = doctorData.bidang;

        const datetime = moment.tz(`${tanggal} ${waktu}`, 'YYYY-MM-DD HH:mm', timezone);
        const timestamp = datetime.toDate();

        await doctorRef.collection('schedule').add({
            pasien: req.session.user.fullName,
            nikPasien: userNIK,
            tanggal: timestamp,
            waktu: waktu,
        });

        const userDocRef = db.collection('users').where('nik', '==', userNIK);
        const userQuerySnapshot = await userDocRef.get();

        if (userQuerySnapshot.empty) {
            throw new Error('Pengguna dengan NIK tersebut tidak ditemukan.');
        }

        const userDoc = userQuerySnapshot.docs[0].ref;
        await userDoc.collection('booking').add({
            doctorName: doctorName,
            doctorBidang: doctorBidang,
            tanggal: timestamp,
            waktu: waktu,
            doctorId: doctorId
        });

        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).send('Terjadi kesalahan.');
    }
});

router.post('/konsultasi-kesehatan/dokter-lansia/:doctorId/booking', async (req, res) => {
    if (!req.session.user) {
        res.redirect('/');
        return;
    }

    const userNIK = req.session.user.nik;
    const doctorId = req.params.doctorId;
    const { tanggal, waktu } = req.body;
    const timezone = 'Asia/Jakarta';

    const db = firebase.firestore();

    try {
        const doctorRef = db.collection('doctors').doc(doctorId);
        const doc = await doctorRef.get();

        if (!doc.exists) {
            res.status(404).send('Dokter tidak ditemukan.');
            return;
        }

        const doctorData = doc.data();
        const doctorName = doctorData.name;
        const doctorBidang = doctorData.bidang;

        const datetime = moment.tz(`${tanggal} ${waktu}`, 'YYYY-MM-DD HH:mm', timezone);
        const timestamp = datetime.toDate();

        await doctorRef.collection('schedule').add({
            pasien: req.session.user.fullName,
            nikPasien: userNIK,
            tanggal: timestamp,
            waktu: waktu,
        });

        const userDocRef = db.collection('users').where('nik', '==', userNIK);
        const userQuerySnapshot = await userDocRef.get();

        if (userQuerySnapshot.empty) {
            throw new Error('Pengguna dengan NIK tersebut tidak ditemukan.');
        }

        const userDoc = userQuerySnapshot.docs[0].ref;
        await userDoc.collection('booking').add({
            doctorName: doctorName,
            doctorBidang: doctorBidang,
            tanggal: timestamp,
            waktu: waktu,
            doctorId: doctorId
        });

        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).send('Terjadi kesalahan.');
    }
});

// router.post('/process-payment', async (req, res) => {
//     const paymentMethod = req.body.paymentMethod;
//     const doctorId = req.params.doctorId;
//     const db = firebase.firestore();

//     try {
//         const doctorRef = db.collection('doctors').doc(doctorId);
//         const doctorDoc = await doctorRef.get();
//         if (!doctorDoc.exists) {
//             return res.status(404).send('Dokter tidak ditemukan.');
//         }
//         const doctorData = doctorDoc.data();

//         const clinicRef = db.collection('users').doc(doctorData.clinicId);
//         const clinicDoc = await clinicRef.get();
//         if (!clinicDoc.exists || clinicDoc.data().role !== 'clinic') {
//             return res.status(404).send('Klinik tidak ditemukan.');
//         }
//         const clinicData = clinicDoc.data();

//         console.log(`Memproses pembayaran menggunakan metode: ${paymentMethod}`);

//         res.render('payment-confirmation', {
//             doctor: doctorData,
//             clinicName: clinicData.fullName,
//             paymentMethod: paymentMethod
//         });
//     } catch (error) {
//         console.error('Error processing payment:', error);
//         res.status(500).send('Terjadi kesalahan saat memproses pembayaran.');
//     }
// });

module.exports = router;
