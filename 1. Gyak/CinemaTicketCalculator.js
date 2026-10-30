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

/*
   Hibák és javításaik

1. Negatív és 120 feletti életkor nincsen beállítva
   - Hibás kódrészlet helye: 1-4. sor (a függvény belépési pontján hiányzik az ellenőrzés)
   - Hibás kód: Hiányzik az életkor érvényességi vizsgálata.
   - Helyes működés: Életkor nem lehet negatív és nem lehet irreálisan magas (0 <= age <= 120).
     Jelenleg pl. age = -5 esetén 0 Ft-ot ad vissza (mert -5 <= 6), hibajelzés helyett.
   - Javítás módja: Bemeneti validáció elhelyezése a függvény legelején:
     if (typeof age !== 'number' || age < 0 || age > 120) {
         throw new Error("Érvénytelen életkor! (0 és 120 közötti szám szükséges)");
     }

2. A 6 éves kor alatti feltétel nem megfelelő
   - Hibás kódrészlet helye: 4-5. sor
   - Hibás kód:
     if (age <= 6) {
         price = 0;
     }
   - Helyes működés: A "6 éves kor alatt" kifejezés szigorú egyenlőtlenséget jelent (age < 6).
     A 6 éves gyermek már a következő (kedvezményes gyermek/diák) kategóriába tartozik.
     A jelenlegi <= operátor miatt egy pontosan 6 éves gyermek még ingyen kap jegyet.
   - Javítás módja: Szigorú kisebb reláció használata:
     if (age < 6) {
         return 0; // 6 év alattiaknak ingyenes
     }

3. A 6-17 éves korhoz tartozó feltétel nem megfelelő
   - Hibás kódrészlet helye: 6-7. sor
   - Hibás kód:
     else if (age < 18) {
         price = price * 0.7;
     }
   - Helyes működés: Az előző hiba miatt a 6 éves kor nem ebbe a sávba esett.
     A helyes életkori intervallum: [6, 17], azaz 6 és 17 év közötti gyermekek (30% kedvezmény).
   - Javítás módja: Ha az előző ág `age < 6`, akkor az `else if (age < 18)` (vagy `age >= 6 && age < 18`)
     már helyesen a 6-17 éves korosztályt fedi le.

4. A legnagyobb kedvezmény nem kerül követésre, hogy az ahhoz kapcsolt feltétel megfelelő legyen
   - Hibás kódrészlet helye: 6-14. sor
   - Hibás kód:
     if (isStudent) {
         price = price * 0.8;
     }
   - Helyes működés: A kedvezmények egymásra halmozódnak (pl. egy 16 éves diák megkapja a 30%-os
     gyerekkedvezményt, majd arra még a 20%-os diákkedvezményt is: 3000 * 0.7 * 0.8 = 1680 Ft).
     A mozik szabályzata szerint a kedvezmények nem vonhatók össze, hanem mindig a vendég számára
     elérhető legnagyobb kedvezményt kell érvényesíteni (pl. Max(életkori kedvezmény, diákkedvezmény)).
   - Javítás módja: A kedvezmények mértékének külön meghatározása és a maximum alkalmazása:
     let ageDiscount = 0;
     if (age < 18) ageDiscount = 0.30;
     else if (age >= 65) ageDiscount = 0.40;

     let studentDiscount = isStudent ? 0.20 : 0;
     let bestDiscount = Math.max(ageDiscount, studentDiscount);
     price = basePrice * (1 - bestDiscount);

5. 3D esetén nem megfelelően kerül az ár kiszámításra
   - Hibás kódrészlet helye: 16-18. sor
   - Hibás kód:
     if (is3D) {
         price = price * 1.8;
     }
   - Helyes működés: A `price * 1.8` egy 80%-os felárat jelent az aktuális árra szorozva!
     A moziban a 3D nem 80%-os szorzó, hanem fix felár (pl. +500 Ft vagy +800 Ft szemüveg/vetítési díj).
   - Javítás módja: Fix felár hozzáadása az árhoz:
     if (is3D) {
         price += 500; // Fix 3D pótdíj
     }

6. 3D esetén nem kerül figyelembevételre, ha már más kedvezményt alkalmazunk
   - Hibás kódrészlet helye: 16-18. sor (kapcsolódva a 4-5. sorhoz és a kedvezményes árhoz)
   - Hibás kód: A `price = price * 1.8` szorzó a kedvezményes jegyárat szorozza fel, illetve ha
     az életkor < 6 (ár = 0), akkor a `0 * 1.8 = 0` Ft marad, tehát ingyenes nézőnél a 3D felár elvész,
     míg egy nyugdíjas kevesebb 3D felárat fizetne, mint egy teljes árú felnőtt.
   - Helyes működés: A 3D technikai felárának függetlennek kell lennie az alapjegy kedvezményeitől
     (mindenki ugyanazt a fix technikai díjat fizeti, aki 3D előadásra megy).
   - Javítás módja: Az alapár kedvezményét és a 3D felárat külön lépésben, egymástól függetlenül kezeljük.
============================================================================= */

// Javitott verzió:
function calculateTicketPriceCorrected(age, isStudent, is3D) {
  if (typeof age !== 'number' || age < 0 || age > 120) {
    throw new Error("Érvénytelen életkor! (0 és 120 közötti szám szükséges)");
  }

  const BASE_PRICE = 3000;
  const FEE_3D = 500; // Fix 3D kiegészítő jegyár

  // 6 év alatti gyermekek ingyen léphetnek be az alapelőadásra
  if (age < 6) {
    return is3D ? FEE_3D : 0;
  }

  // Kedvezmények kiszámítása (csak a legnagyobb kedvezmény érvényesül)
  let ageDiscount = 0;
  if (age < 18) {
    ageDiscount = 0.30; // 30% gyermek/ifjúsági kedvezmény
  } else if (age >= 65) {
    ageDiscount = 0.40; // 40% nyugdíjas kedvezmény
  }

  let studentDiscount = isStudent ? 0.20 : 0; // 20% diákkedvezmény

  let maxDiscount = Math.max(ageDiscount, studentDiscount);
  let finalPrice = BASE_PRICE * (1 - maxDiscount);

  // 3D vetítés esetén a fix felár hozzáadása
  if (is3D) {
    finalPrice += FEE_3D;
  }

  return finalPrice;
}
