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

/* 
   Hibák elemzése és javítása

1. Negatív érték esete nincsen beállítva
   - Hibás kódrészlet helye: 1-3. sor (függvény belépési pontja, validáció hiánya)
   - Hibás kód: Hiányzik az orderValue vizsgálata negatív értékekre.
   - Helyes működés: A rendelési érték nem lehet negatív szám (orderValue < 0). Negatív érték
     esetén kivételt kell dobni vagy hibát kell jelezni.
   - Javítás módja: Bemeneti ellenőrzés beépítése a függvény legelején:
     if (typeof orderValue !== 'number' || orderValue < 0) {
         throw new Error("Érvénytelen rendelési érték! Nem lehet negatív.");
     }

2. 10000ft alatti eset nincsen implementálva
   - Hibás kódrészlet helye: 3. sor
   - Hibás kód:
     if (orderValue > 10000 && orderValue < 25000)
   - Helyes működés: A 10 000 Ft alatti tartományra (0 - 9999 Ft) nincs explicit sáv megadva,
     és a szigorú `>` miatt pontosan 10 000 Ft-nál sem lép be az 5%-os ágba.
     A specifikáció szerint 0 - 9999 Ft között 0% kedvezmény jár, 10 000 Ft-tól pedig 5%.
   - Javítás módja: Explicit kezelés vagy alsó határérték beállítása:
     if (orderValue < 10000) {
         discount = 0;
     } else if (orderValue >= 10000 && orderValue < 25000) {
         discount = 0.05;
     }

3. 10000ft és 24999ft közötti esetben a felső határ értéke nem megfelelő
   - Hibás kódrészlet helye: 3. sor
   - Hibás kód:
     if (orderValue > 10000 && orderValue < 25000)
   - Helyes működés: A bal oldali szigorú `>` miatt a 10 000 Ft kimarad az 5%-ból.
     A helyes tartomány a [10000, 25000) intervallum (azaz 10 000 Ft-tól 24 999 Ft-ig).
   - Javítás módja: `>= 10000` és `< 25000` relációk használata:
     if (orderValue >= 10000 && orderValue < 25000) {
         discount = 0.05;
     }

4. 25000ft és 49999ft közötti esetben a felső határ értéke nem megfelelő
   - Hibás kódrészlet helye: 5. és 7. sor
   - Hibás kód:
     else if (orderValue >= 25000 && orderValue <= 50000) {
         discount = 0.10;
     } else if (orderValue > 50000) {
         discount = 0.15;
     }
   - Helyes működés: Az `orderValue <= 50000` feltétel miatt egy pontosan 50 000 Ft értékű vásárlás
     csak 10% kedvezményt kap, holott 50 000 Ft-tól már 15% járna (`orderValue >= 50000`).
     A 25 000 - 49 999 Ft közötti sáv felső határának szigorúan `< 50000`-nek kell lennie.
   - Javítás módja:
     else if (orderValue >= 25000 && orderValue < 50000) {
         discount = 0.10;
     } else if (orderValue >= 50000) {
         discount = 0.15;
     }

5. VIP esetén a kedvezmény nem megfelelően kerül hozzáadásra
   - Hibás kódrészlet helye: 10-12. sor
   - Hibás kód:
     if (isVip === true) {
         discount += 5;
     }
   - Helyes működés: A kedvezmény mértéke tizedes tört formátumú (0.05 = 5%, 0.10 = 10%, 0.15 = 15%).
     Az egész 5 hozzáadása 500%-os kedvezményt jelent! A helyes VIP kedvezmény 5%, azaz 0.05.
   - Javítás módja: Egész 5 helyett 0.05 hozzáadása:
     if (isVip) {
         discount += 0.05;
     }

6. A maximális kedvezmény nem megfelelő
   - Hibás kódrészlet helye: 14-16. sor
   - Hibás kód:
     if (discount > 0.20) {
         discount = 0.20;
     }
   - Helyes működés: A fenti `discount += 5` hiba miatt a discount értéke 5.00 fölé ugrott, így a plafon
     minden VIP vásárlónál kötelezően 0.20-ra állította a kedvezményt (pl. 5000 Ft vásárlásnál is 20%-ot adott).
     A helyes VIP hozzáadással (0.05) a 20%-os felső plafon helyesen fog működni (pl. 15% alap + 5% VIP = 20%).
   - Javítás módja: A VIP növelés javítása után a plafon megtartása:
     if (discount > 0.20) {
         discount = 0.20;
     }

7. Return értéke sem megfelelő
   - Hibás kódrészlet helye: 18. sor
   - Hibás kód:
     return orderValue - discount;
   - Helyes működés: A `discount` változó kedvezmény-százalékot (arányt, pl. 0.10) tárol, nem forintösszeget.
     Az `orderValue - discount` művelet egy 30 000 Ft-os rendelésnél 30 000 - 0.10 = 29 999.9 Ft-ot eredményez!
     A levonandó összeg forintban `orderValue * discount`, a fizetendő ár pedig `orderValue * (1 - discount)`.
   - Javítás módja: A kedvezmény arányos levonása az összegből:
     return orderValue * (1 - discount);
============================================================================= */

// Javitott verzió:
function calculateDiscountedPriceCorrected(orderValue, isVip) {
  if (typeof orderValue !== 'number' || orderValue < 0) {
    throw new Error("Érvénytelen rendelési érték! Nem lehet negatív szám.");
  }

  let discount = 0;

  // Sávos kedvezmények a rendelés értéke alapján
  if (orderValue >= 10000 && orderValue < 25000) {
    discount = 0.05; // 5%
  } else if (orderValue >= 25000 && orderValue < 50000) {
    discount = 0.10; // 10%
  } else if (orderValue >= 50000) {
    discount = 0.15; // 15%
  }

  // VIP vásárlóknak további 5% kedvezmény
  if (isVip) {
    discount += 0.05;
  }

  // Maximális kedvezmény korlátozása (legfeljebb 20%)
  if (discount > 0.20) {
    discount = 0.20;
  }

  // Fizetendő összeg kiszámítása (százalékos levonás)
  return orderValue * (1 - discount);
}
