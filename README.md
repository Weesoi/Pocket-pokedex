# PocketPokedex

Tervetuloa pokemonien ihmeellisen maailmaan!
Tällä pienellä ohjelmalla pystyy hakemaan pokemoneja numerojen 001-1021 väliltä (gen 1-9). Kanta jota ohjelmassa käytetään on siis päivitetty uusimpaan peliin 
asti.

Pokemonin nimen input-kenttään syötettäessä, hakee ohjelma pokemonin nimen, pokedex-numeron, pituuden, painon, kyvyt (abilities) sekä 
pokedex kuvaus-tekstin joka kertoo pokemonista jotakin tyypillisiä lajitietoja.
Muutamien pokemonien kanssa on vielä ongelmia josta löytyy lisätietoja alhaalta.

"Vinkkejä"-painikkeesta saa vihjeitä minkä nimisiä pokemoneja on olemassa, jos pokemonien maailma ei ole itselle tuttu.

Muutamia ongelmia:

- pokemonien jolla on useampi form esim. deoxys ja enamorus koska tietokannasta ja kuvalähteestä löytyy useampi entry saman-nimiselle pokemonille
Formit pitää spesifoida esimerkiksi: "deoxys-defence" tai "raitchu-alola"
- pokemonin jolla on nimessä väliviiva tai välilyönti ei pysty hakemaan kannasta. Tämän voisi vielä kehittää myöhemmin.
- joillakin gen 9 pokemoneilla joilla on vain yksi ability, näkyy sama ability kahteen kertaan
- teksteissä näkyy chromella ihmeellisiä nuolia, en tiedä mistä tämä johtuu

Linkki netify-sivuun:
https://pocket-pokedex.netlify.app/



TODO:

- lisää ettei nappi makaa kiinni tekstikentässä
- tee enter-mahdollisuus
