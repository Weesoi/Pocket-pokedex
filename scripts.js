document.addEventListener("DOMContentLoaded", function () {
    let submitNappi = document.querySelector("#submit");

    submitNappi.addEventListener("click", function () {
        getPokemonInfo();
    });

    function getPokemonInfo() {
        var apiUrl = "https://pokeapi.co/api/v2/pokemon/";
        var pokemonNimi = document.querySelector("#writePokemon").value.toLowerCase(); // Hae syötekentän arvo ja muuta se pieniksi kirjaimiksi

        // Luo uusi XMLHttpRequest-objekti
        var pyynto = new XMLHttpRequest();

        // Määritä pyyntötyyppi ja kohde
        pyynto.open("GET", apiUrl + pokemonNimi, true);

        // Määritä tapahtumakäsittelijä, kun pyyntö on valmis
        pyynto.onreadystatechange = function () {
            if (pyynto.readyState === XMLHttpRequest.DONE) {
                if (pyynto.status === 200) {
                    // Käsittellään vastaus tässä
                    const data = JSON.parse(pyynto.responseText);
                    console.log(data);
                    AddData(data);
                } else {
                    // Jos pyyntö epäonnistuu, tulostataan virheilmoitus
                    console.error("Pokemontietoja ei saatukaan haettua. :( Status:", pyynto.status);
                }
            }
        };

        // Lähetä pyyntö
        pyynto.send();
    }

    function AddData(data) {
        var pokeContainer = document.getElementById("pokeContainer"); // Hae pokeContainer täällä
        pokeContainer.innerHTML = ""; // Tyhjennä aiemmat tiedot

        // Tässä vaiheessa voit muokata, miten haluat näyttää tiedot HTML-sivulla
        // Esimerkiksi, jos haluat lisätä Pokemonin nimen div-elementtiin, voit tehdä näin:
        const pokemonNimi = data.name;
        const nimiElementti = document.createElement("div");
        nimiElementti.textContent = "Pokemonin nimi: " + pokemonNimi;

        // Lisää luodut elementit pokeContainer-diviin
        pokeContainer.appendChild(nimiElementti);
    }
});



// tällä saadaan pokemon extry teksti
// GET https://pokeapi.co/api/v2/pokemon-species/

//halutut tiedot: types, entry, name+ pokedex number , height, abilities, weight

//tee suprise me- nappi jos kerkeät



// https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/87.svg 
// täältä spritet


//täältä loput:
//https://github.com/favware/graphql-pokemon#using-fetch