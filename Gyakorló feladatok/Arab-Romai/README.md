Arab-Római szám konvertáló, amely TDD fejleszéssel készült, Java alkalmazás, az 1-3999 tartományban operál.
Szükséges hozzá: Java, Maven
A telepítéshez a RomanNumeralConverter.java fájlt az src/main mappában kell elhelyezni, a teszteket tartalmazó fájlt pedig, az src/test mappában.
A tesztek a Maven segítségével futtatthatóak.
A projekt JUnit 5 keretrendszert használ. A tesztek a RomanNumeralConverterTest osztályban találhatók, és lefedik:
1. Alapeset (`1 -> I`)
2. Ismétlődés (`2 -> II`, `3 -> III`)
3. Kivonásos szabály és az `5`-ös számjegy (`4 -> IV`, `5 -> V`, `6 -> VI`)
4. Tízesek kezelése (`9 -> IX`, `10 -> X`, `20 -> XX`, `39 -> XXXIX`)
5. Nagyobb helyiértékek és összetett számok (`L`, `C`, `D`, `M`, pl. `1994 -> MCMXCIV`, `3999 -> MMMCMXCIX`)
6. Határérték-analízis és kivételkezelés (`<= 0` és `> 3999` esetén `IllegalArgumentException`)
