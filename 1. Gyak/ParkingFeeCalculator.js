function calculateParkingFee(minutes, isWeekend, isVip) {
    if (minutes < 15) {
        return 0;
    }

    let hours = Math.floor(minutes / 60);
    let fee = hours * 600;

    if (isWeekend) {
        fee = fee * 0.5;
    }

    if (isVip) {
        fee = fee - 20;
    }

    if (fee > 5000) {
        fee = 5000;
    }

    return fee;
}

// Negatív érték esete nincsen beállítva
// A perc < 15 feltétel nem megfelelő
// A VIP kedvezmény nem megfelelően van levonva
// A hétvégi kedvezmény nem megfelelően van hozzáadva
// A maximális díj nem felel meg a specifikációnak
// A végső összeg sem felel meg a specifikációnak