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

//Az első if feltétel nem megfelelő
//Második if feltételben a csomag beleeshet a SMALL kategóriába is a hiányzó feltételek miatt
//LARGE kategóriában a csomagok úgyszintén beleeshetnek a kisebb kategóriákba
//Negatív vagy 0 eseteket nincsenek kezelve
