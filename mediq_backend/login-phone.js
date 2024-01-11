document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var phoneNumber = document.getElementsByName('phoneNumber')[0].value;
    var password = document.getElementsByName('password')[0].value;

    fetch('/login-phone', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({phoneNumber: phoneNumber, password: password}),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'error') {
            if (data.message === 'Maaf, nomor telepon tidak terdaftar') {
                document.getElementById('error').innerText = data.message;
            } else if (data.message === 'Maaf, password salah') {
                document.getElementById('error').innerText = data.message;
            }
        } else {
            // Lakukan sesuatu jika login berhasil
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
