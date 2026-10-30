A projekt a BankAccount, NotificationService és ExchangeRateService implementációjáról és teszteléséről szól. A tesztekhez különálló fájlok készültek.
---
A projekt Java-t, JUnit 5-öt és Maven-t használ. A telepítéshez a teszt fájlokat az src/test mappában kell elhelyezni, a többi fájlt pedig az src/main állományban.
---
A tesztek lefedik:
1. A NofiticationService alapvető működését
2. A deposit után érkező üzenet működését a NotificationService-ből.
3. Sikertelen befizetés nem küld értesítést.
4. Az Exchange szolgáltatás működését EURO - > Forint átváltással.
5. Helytelen pénznem közötti átváltás kivételt dob.
