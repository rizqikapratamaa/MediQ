const express = require('express');
const firebase = require('firebase');
const router = express.Router();


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
    
    // Cek apakah email atau NIK sudah ada di database
    db.collection('users').where('email', '==', email).get()
    .then((snapshot) => {
        if (!snapshot.empty) {
            // Jika email sudah ada, kirim pesan error
            res.redirect('/signup-email?error=Email sudah terdaftar');
        } else {
            db.collection('users').where('nik', '==', nik).get()
            .then((snapshot) => {
                if (!snapshot.empty) {
                    // Jika NIK sudah ada, kirim pesan error
                    res.redirect('/signup-email?error=NIK sudah terdaftar');
                } else {
                    // Jika email dan NIK belum ada, lanjutkan proses pendaftaran
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
                            res.redirect('/login-email?message=Akun berhasil didaftarkan, silahkan login untuk melanjutkan');
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
    
    // Cek apakah nomor telepon atau NIK sudah ada di database
    db.collection('users').where('phoneNumber', '==', phoneNumber).get()
    .then((snapshot) => {
        if (!snapshot.empty) {
            // Jika nomor telepon sudah ada, kirim pesan error
            res.redirect('/signup-phone?error=Nomor telepon sudah terdaftar');
        } else {
            db.collection('users').where('nik', '==', nik).get()
            .then((snapshot) => {
                if (!snapshot.empty) {
                    // Jika NIK sudah ada, kirim pesan error
                    res.redirect('/signup-phone?error=NIK sudah terdaftar');
                } else {
                    // Jika nomor telepon dan NIK belum ada, lanjutkan proses pendaftaran
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
                            res.redirect('/login-phone?message=Akun berhasil didaftarkan, silahkan login untuk melanjutkan');
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



router.get('/login-phone', redirectIfLoggedIn, (req, res) => {
    res.sendFile(__dirname + '/public/login-phone.html');
});

router.post('/login-phone', (req, res) => {
    const { phoneNumber, password } = req.body;
    const db = firebase.firestore();
    db.collection('users').where('phoneNumber', '==', phoneNumber).get()
    .then((snapshot) => {
        if (snapshot.empty) {
            res.redirect('/login-phone?error=Maaf, nomor telepon tidak terdaftar');
            return;
        }
        snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.password !== password) {
                res.redirect('/login-phone?error=Maaf, password salah');
                return;
            }
            req.session.user = data;
            res.redirect('/dashboard');
        });
    }).catch((error) => {
        console.error("Error adding data: ", error);
    });
});


router.get('/login-email', redirectIfLoggedIn, (req, res) => {
    res.sendFile(__dirname + '/public/login-email.html');
});

router.post('/login-email', (req, res) => {
    const { email, password } = req.body;
    const db = firebase.firestore();
    db.collection('users').where('email', '==', email).get()
    .then((snapshot) => {
        if (snapshot.empty) {
            res.redirect('/login-email?error=Maaf, email tidak terdaftar');
            return;
        }
        snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.password !== password) {
                res.redirect('/login-email?error=Maaf, password salah');
                return;
            }
            req.session.user = data;
            res.redirect('/dashboard');
        });
    }).catch((error) => {
        console.error("Error adding data: ", error);
    });
});

router.post('/logout', (req, res) => {
    delete req.session.user;
    res.redirect('/');
});

router.get('/dashboard', (req, res) => {
    if (!req.session.user){
        res.redirect('/');
        return;
    }
    res.render('dashboard-user', { user: req.session.user });
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

router.get('/konsultasi-kesehatan/layanan-umum', (req, res) => {
    if (!req.session.user){
        res.redirect('/');
        return;
    }
    let doctors = [];
    const db = firebase.firestore();
    db.collection('users').where('role', '==', 'clinic').get()
        .then((querySnapshot) => {
            let promises = [];
            querySnapshot.forEach((doc) => {
                let promise = db.collection('users').doc(doc.id).collection('doctor').where('bidang', '==', 'umum').get()
                    .then((subQuerySnapshot) => {
                        subQuerySnapshot.forEach((subDoc) => {
                            doctors.push(subDoc.data());
                        });
                    });
                promises.push(promise);
            });
            return Promise.all(promises);
        })
        .then(() => {
            res.render('layanan-umum', { doctors: doctors });
        })
        .catch((error) => {
            console.error("Error getting data: ", error);
        });
});

router.get('/konsultasi-kesehatan/layanan-gigi-mulut', (req, res) => {
    if (!req.session.user){
        res.redirect('/');
        return;
    }
    let doctors = [];
    const db = firebase.firestore();
    db.collection('users').where('role', '==', 'clinic').get()
        .then((querySnapshot) => {
            let promises = [];
            querySnapshot.forEach((doc) => {
                let promise = db.collection('users').doc(doc.id).collection('doctor').where('bidang', '==', 'gigi dan mulut').get()
                    .then((subQuerySnapshot) => {
                        subQuerySnapshot.forEach((subDoc) => {
                            doctors.push(subDoc.data());
                        });
                    });
                promises.push(promise);
            });
            return Promise.all(promises);
        })
        .then(() => {
            res.render('layanan-gigi-mulut', { doctors: doctors });
        })
        .catch((error) => {
            console.error("Error getting data: ", error);
        });
});

router.get('/konsultasi-kesehatan/layanan-anak-remaja', (req, res) => {
    if (!req.session.user){
        res.redirect('/');
        return;
    }
    let doctors = [];
    const db = firebase.firestore();
    db.collection('users').where('role', '==', 'clinic').get()
        .then((querySnapshot) => {
            let promises = [];
            querySnapshot.forEach((doc) => {
                let promise = db.collection('users').doc(doc.id).collection('doctor').where('bidang', '==', 'anak dan remaja').get()
                    .then((subQuerySnapshot) => {
                        subQuerySnapshot.forEach((subDoc) => {
                            doctors.push(subDoc.data());
                        });
                    });
                promises.push(promise);
            });
            return Promise.all(promises);
        })
        .then(() => {
            res.render('layanan-anak-remaja', { doctors: doctors });
        })
        .catch((error) => {
            console.error("Error getting data: ", error);
        });
});

router.get('/konsultasi-kesehatan/layanan-ibu-kb', (req, res) => {
    if (!req.session.user){
        res.redirect('/');
        return;
    }
    let doctors = [];
    const db = firebase.firestore();
    db.collection('users').where('role', '==', 'clinic').get()
        .then((querySnapshot) => {
            let promises = [];
            querySnapshot.forEach((doc) => {
                let promise = db.collection('users').doc(doc.id).collection('doctor').where('bidang', '==', 'ibu dan kb').get()
                    .then((subQuerySnapshot) => {
                        subQuerySnapshot.forEach((subDoc) => {
                            doctors.push(subDoc.data());
                        });
                    });
                promises.push(promise);
            });
            return Promise.all(promises);
        })
        .then(() => {
            res.render('layanan-ibu-kb', { doctors: doctors });
        })
        .catch((error) => {
            console.error("Error getting data: ", error);
        });
});

router.get('/konsultasi-kesehatan/layanan-lansia', (req, res) => {
    if (!req.session.user){
        res.redirect('/');
        return;
    }
    let doctors = [];
    const db = firebase.firestore();
    db.collection('users').where('role', '==', 'clinic').get()
        .then((querySnapshot) => {
            let promises = [];
            querySnapshot.forEach((doc) => {
                let promise = db.collection('users').doc(doc.id).collection('doctor').where('bidang', '==', 'lansia').get()
                    .then((subQuerySnapshot) => {
                        subQuerySnapshot.forEach((subDoc) => {
                            doctors.push(subDoc.data());
                        });
                    });
                promises.push(promise);
            });
            return Promise.all(promises);
        })
        .then(() => {
            res.render('layanan-lansia', { doctors: doctors });
        })
        .catch((error) => {
            console.error("Error getting data: ", error);
        });
});

router.get('/konsultasi-kesehatan/layanan-umum/:doctorId', (req, res) => {
    if (!req.session.user){
        res.redirect('/');
        return;
    }
    let doctors = [];
    const doctorId = req.params.doctorId;
    const db = firebase.firestore();
    db.collection('users').where('role', '==', 'clinic').get()
        .then((querySnapshot) => {
            let promises = [];
            querySnapshot.forEach((doc) => {
                let promise = db.collection('users').doc(doc.id).collection('doctor').where('id', '==', doctorId).get()
                    .then((subQuerySnapshot) => {
                        subQuerySnapshot.forEach((subDoc) => {
                            doctors.push(subDoc.data());
                        });
                    });
                promises.push(promise);
            });
            return Promise.all(promises);
        })
        .then(() => {
            res.render('pilih-jadwal-dokter', { doctors: doctors });
        })
        .catch((error) => {
            console.error("Error getting data: ", error);
        });
});

router.post('/konsultasi-kesehatan/layanan-umum/:doctorId/booking', (req, res) => {
    if (!req.session.user) {
        res.redirect('/');
        return;
    }

    const userId = req.session.user.id;
    const doctorId = req.params.doctorId;
    const { tanggal, waktu } = req.body;

    const db = firebase.firestore();

    const doctorRef = db.collection('users').doc(doctorId).collection('doctor').doc(doctorId);
    doctorRef.get()
        .then((doctorDoc) => {
            const doctorData = doctorDoc.data();
            const doctorName = doctorData.name;
            const bidangDokter = doctorData.bidang;
            const idDoctor = doctorData.id;

            const doctorScheduleRef = doctorRef.collection('schedule').add({
                pasien: req.session.user.fullName,
                tanggal: new Date(tanggal), // Ubah ke dalam format timestamp jika perlu
                waktu: waktu,
                nik: req.session.user.nik
            });

            // Menambahkan jadwal ke koleksi booking pengguna
            const userBookingRef = db.collection('users').doc(userId).collection('booking').add({
                doctorName: doctorName,
                bidangDokter: bidangDokter,
                tanggal: new Date(tanggal),
                waktu: waktu,
                id: idDoctor
            });

            // Menunggu kedua operasi selesai sebelum memberikan respons
            return Promise.all([doctorScheduleRef, userBookingRef]);
        })
        .then(() => {
            res.redirect('/');
        })
        .catch((error) => {
            console.error("Error handling booking:", error);
            res.status(500).send('Terjadi kesalahan.');
        });
});

module.exports = router;