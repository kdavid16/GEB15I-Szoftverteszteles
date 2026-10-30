function calculateGrade(theory, practice) {
    let total = theory + practice;

    if (theory < 30 && practice < 20) {
        return 1;
    }

    if (total < 50) {
        return 1;
    } else if (total <= 60) {
        return 2;
    } else if (total <= 70) {
        return 3;
    } else if (total <= 85) {
        return 4;
    } else {
        return 5;
    }
}

/* Hibak es azok javításai

1. Nincs beállítva az elmélet és gyakorlat maximum felső határa
   - Hibás kódrészlet helye: 1-3. sor (függvény belépési pontja, validáció hiánya)
   - Hibás kód: Hiányzik a theory és practice pontszámok alsó és felső határainak ellenőrzése.
   - Helyes működés: A pontszámok nem lehetnek negatívak és nem haladhatják meg a feladatrészek
     maximumát (általában elmélet max. 60 pont, gyakorlat max. 40 pont, összesen max. 100 pont).
     Ha a pontszám ezen határokon kívül esik, kivételt kell dobni.
   - Javítás módja: Bemeneti határok ellenőrzése:
     if (typeof theory !== 'number' || typeof practice !== 'number' ||
         theory < 0 || theory > 60 || practice < 0 || practice > 40) {
         throw new Error("Érvénytelen pontszámok! (Elmélet: 0-60, Gyakorlat: 0-40)");
     }

2. A minimum elméleti és gyakorlati pont feltétele nem megfelelő
   - Hibás kódrészlet helye: 4-6. sor
   - Hibás kód:
     if (theory < 30 && practice < 20) {
         return 1;
     }
   - Helyes működés: A kódban logikai ÉS (&&) operátor szerepel, így a hallgató csak akkor bukik meg
     a beugró minimumon, ha MINDKÉT részből elbukik! Ha elméletből 0 pontot kap (minimum 30 helyett),
     de gyakorlatból 20 pontot szerez, a feltétel hamis lesz és a kód tovább engedi.
     A követelmény szerint ha BÁRMELYIK rész nem éri el a minimumot (logikai VAGY: ||), a jegy elégtelen (1).
   - Javítás módja: Logikai VAGY operátor (||) használata:
     if (theory < 30 || practice < 20) {
         return 1;
     }

3. A ponthatárok az if-else elágazásban nem megfelelőek
   - Hibás kódrészlet helye: 8-16. sor
   - Hibás kód:
     } else if (total <= 60) {
         return 2;
     } else if (total <= 70) {
         return 3;
     } else if (total <= 85) {
         return 4;
     }
   - Helyes működés: A ponthatárok eltérnek a szabványos felsőoktatási érdemjegy-sávoktól:
     * 0 - 49 pont: 1 (elégtelen)
     * 50 - 64 pont: 2 (elégséges)  -> a kódban hibásan csak 60 pontig tart
     * 65 - 74 pont: 3 (közepes)    -> a kódban hibásan csak 70 pontig tart
     * 75 - 84 pont: 4 (jó)         -> a kódban hibásan 85 pontig tart (így a 85 pontra még 4-est ad!)
     * 85 - 100 pont: 5 (jeles)
   - Javítás módja: A helyes ponthatárok beállítása:
     if (total < 50) return 1;
     else if (total < 65) return 2;  // 50 - 64
     else if (total < 75) return 3;  // 65 - 74
     else if (total < 85) return 4;  // 75 - 84
     else if (total <= 100) return 5;// 85 - 100

4. A maximum pontszámnak megfelelő feltétel hiányzik
   - Hibás kódrészlet helye: 1-4. és 16-18. sor
   - Hibás kód: Hiányzik a total <= 100 ellenőrzése.
   - Helyes működés: Az összpontszám legfeljebb 100 pont lehet. 100 feletti összpontszám hibás bemenet,
     nem minősülhet automatikusan 5-ösnek.
   - Javítás módja:
     if (total > 100) {
         throw new Error("Az összpontszám nem haladhatja meg a 100 pontot!");
     }

5. A végső else és return nem felel meg az elvárásoknak
   - Hibás kódrészlet helye: 16-18. sor
   - Hibás kód:
     } else {
         return 5;
     }
   - Helyes működés: A nyitott `else` ág bármilyen értékre (akár érvénytelen, 100 feletti számokra is)
     5-öst ad. A jeles (5) érdemjegyhez explicit felső határvizsgálat szükséges (85 <= total <= 100).
   - Javítás módja: Explicit sávvizsgálat az 5-ös jegyre:
     else if (total <= 100) {
         return 5;
     } else {
         throw new Error("Érvénytelen összpontszám!");
     }
============================================================================= */

// Javitott verzió:
function calculateGradeCorrected(theory, practice) {
    // 1. és 4. Bemeneti adatok és maximum határok validációja
    if (typeof theory !== 'number' || typeof practice !== 'number' ||
        theory < 0 || theory > 60 || practice < 0 || practice > 40) {
        throw new Error("Érvénytelen pontszámok! (Elmélet: 0-60, Gyakorlat: 0-40 pont között lehet)");
    }

    // 2. Minimum beugró feltétel: ha bármelyik nem éri el a küszöböt, automatikusan elégtelen (1)
    if (theory < 30 || practice < 20) {
        return 1;
    }

    let total = theory + practice;

    // 3. és 5. Standard egyetemi ponthatárok és lezárás
    if (total < 50) {
        return 1;
    } else if (total < 65) {
        return 2; // 50 - 64 pont
    } else if (total < 75) {
        return 3; // 65 - 74 pont
    } else if (total < 85) {
        return 4; // 75 - 84 pont
    } else if (total <= 100) {
        return 5; // 85 - 100 pont
    } else {
        throw new Error("Érvénytelen összpontszám!");
    }
}
