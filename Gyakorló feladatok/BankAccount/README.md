A BankAccount osztály került implementálásra, a withdraw, deposit és getBalance metódusokkal. A projekt JUnit 5 keretrendszert használ, Java-t és Maven-t.
---
A Maven segítségével futtattható.
---
A telepítéshez az src/main állományban el kell helyezni a BankAccount.java fájlt, valamint az src/test állományban a BankAccountTest.java fájlt.
A tesztesetek lefedik a következőket:
1. Új számla egyenlege 0
2. deposit(1000) után az egyenleg 1000.
3. Több befizetés helyesen összeadódik.
4. A withdraw() helyesen csökkenti az értéket.
5. A teljes egyenleg felvehető.
6. Túl nagy összeg felvétele esetén hibát dob.
7. Negatív befizetés esetén kivételt dob.
8. 0 összegű befizetés esetén kivételt dob.
9. Negatív pénzfelvétel esetén kivételt dob.
10. 0 összegű pénzfelvétel esetén kivételt dob.
