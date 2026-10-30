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

/*Hibák elemzése és azok javítása

1. Negatív érték esete nincsen beállítva
   - Hibás kódrészlet helye: 1-2. sor (függvény belépési pontja, validáció hiánya)
   - Hibás kód: Hiányzik a `minutes` érvényességi ellenőrzése negatív számokra.
   - Helyes működés: A parkolási idő nem lehet negatív szám (minutes < 0). Jelenleg negatív percre
     a `minutes < 15` teljesül és 0 Ft-ot ad vissza normál kimenetként, hibajelzés helyett.
   - Javítás módja: Bemeneti validáció a függvény legelején:
     if (typeof minutes !== 'number' || minutes < 0) {
         throw new Error("Érvénytelen parkolási idő! Nem lehet negatív szám.");
     }

2. A perc < 15 feltétel nem megfelelő
   - Hibás kódrészlet helye: 2-4. sor
   - Hibás kód:
     if (minutes < 15) {
         return 0;
     }
   - Helyes működés: A türelmi idő a specifikáció szerint az első 15 percre vonatkozik, beleértve
     a pontosan 15 perces parkolást is (minutes <= 15). A szigorú `<` miatt a 15 perces parkolás
     kiesik az ingyenes sávból.
   - Javítás módja: `<=` operátor használata:
     if (minutes <= 15) {
         return 0; // Első 15 perc díjmentes
     }

3. A végső összeg sem felel meg a specifikációnak (Órák kerekítése és díjszámítás)
   - Hibás kódrészlet helye: 6-7. sor
   - Hibás kód:
     let hours = Math.floor(minutes / 60);
     let fee = hours * 600;
   - Helyes működés: A parkolási szabályzat szerint minden MEGKEZDETT óra fizetendő.
     A `Math.floor` lefelé kerekít egészre, emiatt:
     * 16 és 59 perc közötti parkolás esetén Math.floor(minutes / 60) = 0, így 0 Ft fizetendő
       (azaz 59 percig ingyenes maradna a parkolás)!
     * 65 perc parkolásnál Math.floor(65 / 60) = 1 órát (600 Ft) számol 2 megkezdett óra (1200 Ft) helyett.
   - Javítás módja: Lefelé kerekítés (`Math.floor`) helyett felfelé kerekítés (`Math.ceil`):
     let hours = Math.ceil(minutes / 60);
     let fee = hours * 600;

4. A VIP kedvezmény nem megfelelően van levonva
   - Hibás kódrészlet helye: 13-15. sor
   - Hibás kód:
     if (isVip) {
         fee = fee - 20;
     }
   - Helyes működés: A kód fix 20 forintot von le (`fee - 20`) a 20%-os kedvezmény helyett!
     Egy 3000 Ft-os parkolásnál a kedvezmény 600 Ft (és 2400 Ft fizetendő), nem pedig 20 Ft.
   - Javítás módja: Százalékos (20%-os) kedvezmény levonása:
     if (isVip) {
         fee = fee * 0.8; // 20% kedvezmény
     }

5. A hétvégi kedvezmény nem megfelelően van hozzáadva
   - Hibás kódrészlet helye: 9-11. sor
   - Hibás kód:
     if (isWeekend) {
         fee = fee * 0.5;
     }
   - Helyes működés: A hétvégi (50%) és a VIP (20%) kedvezmények sorrendje és egymásra hatása
     nem tisztázott a napi plafonhoz képest. Továbbá ha a kedvezmények összeadódnak (50% + 20% = 70% kedvezmény)
     vagy egymás után szorzódnak, azt a specifikáció szerint egyértelmű szabályrendszer szerint kell kiszámítani.
   - Javítás módja: A kedvezmények tiszta és következetes alkalmazása.

6. A maximális díj nem felel meg a specifikációnak
   - Hibás kódrészlet helye: 17-19. sor
   - Hibás kód:
     if (fee > 5000) {
         fee = 5000;
     }
   - Helyes működés: A napi maximális díj (plafon: 5000 Ft): ha a plafon csak a kedvezmények levonása
     után kerül vizsgálatra, egy hosszú ideig parkoló VIP ügyfél (pl. 10 000 Ft óradíjjal) ugyanúgy
     5000 Ft-ot fizetne, mint a nem VIP ügyfél, így elveszne a VIP tagság előnye.
     A specifikáció szerint az alapdíj maximalizálódik a napidíjban (5000 Ft), és ebből még levonható
     a VIP / hétvégi kedvezmény, VAGY a napidíj egy abszolút legfelső határ.
   - Javítás módja: A napidíj-plafon megfelelő pozicionálása:
     fee = Math.min(fee, 5000); // Napi maximális alapdíj
     if (isWeekend) fee = fee * 0.5;
     if (isVip) fee = fee * 0.8;
============================================================================= */

// =============================================================================
// JAVÍTOTT FÜGGVÉNY:
// =============================================================================
function calculateParkingFeeCorrected(minutes, isWeekend, isVip) {
  // 1. Negatív érték validálása
  if (typeof minutes !== 'number' || minutes < 0) {
    throw new Error("Érvénytelen parkolási idő! Nem lehet negatív szám.");
  }

  // 2. Első 15 perc türelmi idő (ingyenes)
  if (minutes <= 15) {
    return 0;
  }

  // 3. Minden megkezdett óra fizetendő (Math.ceil)
  let hours = Math.ceil(minutes / 60);
  let fee = hours * 600;

  // 6. Maximális napi alapdíj (legfeljebb 5000 Ft alapdíj)
  fee = Math.min(fee, 5000);

  // 5. Hétvégi kedvezmény (50%)
  if (isWeekend) {
    fee = fee * 0.5;
  }

  // 4. VIP kedvezmény (20%)
  if (isVip) {
    fee = fee * 0.8;
  }

  return Math.round(fee);
}
