document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementsByName('email')[0].value;
    var password = document.getElementsByName('password')[0].value;

    fetch('/login-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email, password: password}),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'error') {
            if (data.message === 'Maaf, email tidak terdaftar') {
                document.getElementById('emailWarning').innerText = data.message;
            } else if (data.message === 'Maaf, password salah') {
                document.getElementById('passwordWarning').innerText = data.message;
            }
        } else {
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});