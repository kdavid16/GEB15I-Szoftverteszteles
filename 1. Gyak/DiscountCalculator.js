function calculateDiscountedPrice(orderValue, isVip) {
    let discount = 0;
    if (orderValue > 10000 && orderValue < 25000) {
        discount = 0.05;
    } else if (orderValue >= 25000 && orderValue <= 50000) {
        discount = 0.10;
    } else if (orderValue > 50000) {
        discount = 0.15;
    }
    if (isVip === true) {
        discount += 5;
    }

    if (discount > 0.20) {
        discount = 0.20;
    }

    return orderValue - discount;
}

//10000ft alatti eset nincsen implementálva
//10000ft és 24999ft közötti esetben a felső határ értéke nem megfelelő
//25000ft és 49999ft közötti esetben a felső határ értéke nem megfelelő
//VIP esetén a kedvezmény nem megfelelően kerül hozzáadásra
//A maximális kedvezmény nem megfelelő
//Negatív érték esete nincsen beállítva
//Return értéke sem megfelelő