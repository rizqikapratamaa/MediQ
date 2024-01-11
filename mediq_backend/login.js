document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var identifier = document.getElementsByName('identifier')[0].value;
    var password = document.getElementsByName('password')[0].value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier: identifier, password: password }),
    })

    .then(response => response.json())
    .then(data => {
        if (data.status === 'error') {
            if (data.message === 'Maaf, nomor telepon atau email tidak terdaftar') {
                document.getElementById('error').innerText = data.message;
            } else if (data.message === 'Maaf, password salah') {
                document.getElementById('error').innerText = data.message;
            }
        } else {
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
