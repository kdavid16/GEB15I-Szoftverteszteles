function calculateTicketPrice(age, isStudent, is3D) {
    let price = 3000;

    if (age <= 6) {
        price = 0;
    } else if (age < 18) {
        price = price * 0.7;
    } else if (age > 65) {
        price = price * 0.6;
    }

    if (isStudent) {
        price = price * 0.8;
    }

    if (is3D) {
        price = price * 1.8;
    }

    return price;
}

//Negatív és 120 feletti életkor nincsen beállítva
//A 6 éves kor alatti feltétel nem megfelelő
//A 6-17 éves korhoz tartozó feltétel nem megfelelő
//A legnagyobb kedvezmény nem kerül követésre, hogy az ahhoz kapcsolt feltétel megfelelő legyen
//3D esetén nem megfelelően kerül az ár kiszámításra
//3D esetén nem kerül figyelembevételre, ha már más kedvezményt alkalmazunk