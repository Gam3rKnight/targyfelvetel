#Tárgyfelvétel


##Funkcionális követelmények
------------------------------

Megvalósítani egy tantárgyak felvételére, kezelésére szolgáló webes technológiákkal fejlesztett alkalmazást. Elvárt követelmények aminek tartalmaznia kell:

    * legalább két modellt, egy-sok kapcsolatban
    * legalább 1 űrlapot
    * legalább 1 listázó oldalt
    * legyen lehetőség új felvételére
    * legyen lehetőség meglévő szerkesztésére
    * legyen lehetőség meglévő törlésére
    * legyenek benne csak hitelesítés után elérhető funkciók
    * perzisztálás fájlba történjen
    * közzététel Herokun

##Nem funkcionális követelmények
   
    * Jól átlátható, ergonómikus kezelőfelület
    * Jelszavak titkosított tárolása
    * Bővíthatőség

##Szerepkör lista:
    * vendég: regisztrálhat, bejelentkezhet
    * hallgató: tárgyat hozzáadhat, módosíthat illetve törölhet és kilistázhatja az eddig tárgyolt tárgyakat

##Használat eseti diagram:
    [Használat eseti diagram](/docs/images/haszndiag.png)
    
#Tervezés
----------

##Oldaltérkép

Publikus:

    * Info oldal (fő oldal)
    * Bejelentkezés
    * Regisztráció

Bejelentkezett:
    
    * Info oldal (fő oldal)
    * Hozzáadás
    * Listázás
        * Módosítás
        * Törlés

##Végpontok

    * GET/: fő oldal
    * GET/login/login: bejelentkező űrlap
    * POST/login/login: bejelentkezési adatok felküldése
    * POST/
    * GET/login/signup: regisztrációs űrlap
    * POST/login/signup: regisztrációs adatok felküldése
    * GET/list: felvett tárgyak kilistázása
    * GET/add: tárgy felvételi űrlap
    * GET/edit:id: tárgy módosítása űrlap
    * POST/edit:id: tárgy módosítása, adatok felküldése
    * POST/delete:id: tárgy törlése
    * GET/subject:id: tárgy adatainak megjelenítése

## Oldalvázlatok
    
Főoldal:

    ![Főoldal](https://github.com/Gam3rKnight/targyfelvetel/blob/master/docs/images/foold.jpg)

Regisztráló oldal:

    ![Listázó oldal](https://github.com/Gam3rKnight/targyfelvetel/blob/master/docs/images/reg.jpg)
    
##Adatmodell

    ![Adatmodell](https://github.com/Gam3rKnight/targyfelvetel/blob/master/docs/images/adat.png)
    
##Adatbázis terv

    ![Adatbázis terv](https://github.com/Gam3rKnight/targyfelvetel/blob/master/docs/images/adatb.png)
    
##Állapot diagram

Új tárgy felvétele:

    ![Állapot diagram](https://github.com/Gam3rKnight/targyfelvetel/blob/master/docs/images/allapot.png)
    
#Felhasználói dokumentáció
---------------------------

##Implementáció

Az alkalmazás Cloud9 webes fejlesztői környezetben készült javascript nyelven.

##Könyvtár struktúra

    * ./docs: a dokumentáció szükséges fájljai
    * ./models: az adatmodelleket ábrázoló fájlok
    * ./views: a megjelenítő réteg fájljait tartalmazza
    * ./views/login: a bejelentkező illetve regisztrációs űrlapok fájljai
    * ./views/partials: az oldal menüjének fájlja
    
##Futtatás

Az alkalmazás futtatásához a ma alkalmazott multicore processzorral és több GB rammal felszerelt számítógépet tökéletesen megfelelőek.
Szoftveresen szükség van a futtatáshoz egy keretrendszerre ami ellátja az alkalmazást a megfelelő segédkönyvtárakkal. Ilyenek a Cloud9, a Herokun.

##Telepítés

A telepítés az állományok letöltésével kezdődik. Miután kicsomagoltuk, fel kell töltenünk a keretrendszerbe. Végül az npm install parancs kiadásával a terminálban, a program feltelepíti a szükséges könyvtárakat.

##A program használata

A program elindításához a node index parancs kiadása szükséges, illetve ellenőriznünk kell még, hogy a program gyökérkönyvtárában áll-e a prompt. Amennyiben nem ezt módosítanunk kell. Ezután a program használatra kész.