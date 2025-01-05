document.getElementById('subscriptionForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email')?.value;
    if (email) {
        // Wyślij email do serwera
        fetch('/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        })
        .then(response => response.json())
        .then(data => {
            alert('Subskrypcja zakończona sukcesem!');
        })
        .catch(error => {
            console.error('Błąd:', error);
            alert('Wystąpił błąd przy subskrypcji.');
        });
    } else {
        alert('Proszę podać poprawny adres email!');
    }
});
