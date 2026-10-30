function classifyPackage(weight, length, width, height) {
    if (weight < 2 &&
        length < 30 &&
        width < 30 &&
        height < 30) {
        return "SMALL";
    }

    if (weight <= 10 &&
        (length <= 60 || width <= 60 || height <= 60)) {
        return "MEDIUM";
    }

    if (weight <= 30 &&
        length <= 120 &&
        width <= 120 &&
        height <= 120) {
        return "LARGE";
    }

    return "OVERSIZE";
}

/* Hibak

1. Negatív vagy 0 esetek nincsenek kezelve
   - Hibás kódrészlet helye: 1-2. sor (függvény belépési pontja, validáció hiánya)
   - Hibás kód: Hiányzik a bemeneti fizikai méretek és a súly pozitivitásának ellenőrzése.
   - Helyes működés: A fizikai csomag paraméterei szigorúan pozitív valós számok kell legyenek
     (weight > 0, length > 0, width > 0, height > 0). Jelenleg pl. `classifyPackage(-5, 0, -10, -20)`
     a `< 2` és `< 30` feltételek miatt érvényes "SMALL" kategóriát ad vissza hibajelzés helyett.
   - Javítás módja: Bemeneti validáció a függvény legelején:
     if (typeof weight !== 'number' || typeof length !== 'number' ||
         typeof width !== 'number' || typeof height !== 'number' ||
         weight <= 0 || length <= 0 || width <= 0 || height <= 0) {
         throw new Error("Érvénytelen méretek! Minden értéknek 0-nál nagyobbnak kell lennie.");
     }

2. Az első if feltétel nem megfelelő
   - Hibás kódrészlet helye: 2-7. sor
   - Hibás kód:
     if (weight < 2 &&
         length < 30 &&
         width < 30 &&
         height < 30) {
         return "SMALL";
     }
   - Helyes működés: Szigorú kisebb (`<`) reláció szerepel a megengedő (`<=`) helyett.
     A specifikáció szerint a határértékek inclusívak (pl. pontosan 2 kg vagy 30x30x30 cm még
     a SMALL kategóriába tartozik). A jelenlegi kódban egy 2 kg-os csomag kiesik a MEDIUM-ba.
   - Javítás módja: `<` helyett `<=` operátorok használata:
     if (weight <= 2 && length <= 30 && width <= 30 && height <= 30) {
         return "SMALL";
     }

3. Második if feltételben a csomag beleeshet a SMALL kategóriába is a hiányzó feltételek miatt
   - Hibás kódrészlet helye: 9-12. sor
   - Hibás kód:
     if (weight <= 10 &&
         (length <= 60 || width <= 60 || height <= 60)) {
         return "MEDIUM";
     }
   - Helyes működés:
     a) Logikai VAGY (`||`) van a méretek között logikai ÉS (`&&`) helyett! Emiatt ha egy csomag
        mérete 10 x 500 x 500 cm, a `length <= 60` miatt azonnal MEDIUM-nak minősül, holott
        óriási mérete miatt túlméretes (OVERSIZE) kategóriába kellene esnie!
     b) Hiányzik az `else if` összekapcsolás, és a méretek együttes korlátja. A MEDIUM kategória
        minden dimenziójában maximum 60 cm lehet.
   - Javítás módja: Logikai `&&` operátorok és `else if` alkalmazása:
     else if (weight <= 10 && length <= 60 && width <= 60 && height <= 60) {
         return "MEDIUM";
     }

4. LARGE kategóriában a csomagok úgyszintén beleeshetnek a kisebb kategóriákba
   - Hibás kódrészlet helye: 14-19. sor
   - Hibás kód:
     if (weight <= 30 &&
         length <= 120 &&
         width <= 120 &&
         height <= 120) {
         return "LARGE";
     }
   - Helyes működés: Független `if` van `else if` helyett. Az ekvivalencia-osztályoknak egymást
     kizáró döntési fát kell alkotniuk sorrendben (SMALL -> MEDIUM -> LARGE -> OVERSIZE).
     Ha az elágazások nincsenek összefűzve, a kategóriák logikája átfedhet.
   - Javítás módja: `else if` szerkezet használata, és a túlméretes csomagok lezárása végső `else`-ben:
     else if (weight <= 30 && length <= 120 && width <= 120 && height <= 120) {
         return "LARGE";
     } else {
         return "OVERSIZE";
     }
============================================================================= */
// Javitott verzió:
function classifyPackageCorrected(weight, length, width, height) {
    // 1. Negatív és 0 méretek/súly kizárása
    if (typeof weight !== 'number' || typeof length !== 'number' ||
        typeof width !== 'number' || typeof height !== 'number' ||
        weight <= 0 || length <= 0 || width <= 0 || height <= 0) {
        throw new Error("Érvénytelen méretek! Minden értéknek szigorúan pozitívnak kell lennie.");
    }

    // 2. SMALL kategória: max. 2 kg és max. 30x30x30 cm
    if (weight <= 2 && length <= 30 && width <= 30 && height <= 30) {
        return "SMALL";
    }
    // 3. MEDIUM kategória: max. 10 kg és minden méret max. 60 cm (logikai ÉS kapcsolat)
    else if (weight <= 10 && length <= 60 && width <= 60 && height <= 60) {
        return "MEDIUM";
    }
    // 4. LARGE kategória: max. 30 kg és minden méret max. 120 cm
    else if (weight <= 30 && length <= 120 && width <= 120 && height <= 120) {
        return "LARGE";
    }
    // Minden más (bármely méret > 120 cm vagy súly > 30 kg): OVERSIZE
    else {
        return "OVERSIZE";
    }
}
