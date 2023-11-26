document.addEventListener("DOMContentLoaded", function () {
    let submitNappi = document.querySelector("#submit");

    submitNappi.addEventListener("click", function () {
        getPokemonInfo();
    });

    function getPokemonInfo() {
        const pokemonNimi = document.querySelector("#writePokemon").value.toLowerCase();
        const apiUrl = "https://pokeapi.co/api/v2/pokemon/" + pokemonNimi;
        

        // Luo uusi XMLHttpRequest-objekti
        var pyynto = new XMLHttpRequest();

        // Määritä pyyntötyyppi ja kohde
        pyynto.open("GET", apiUrl, true);

        // Määritä tapahtumakäsittelijä, kun pyyntö on valmis
        pyynto.onreadystatechange = function () {
            if (pyynto.readyState === XMLHttpRequest.DONE) {
                if (pyynto.status === 200) {
                    // Käsittellään vastaus tässä
                    const data = JSON.parse(pyynto.responseText);
                    AddData(data);
                } else {
                    // Jos pyyntö epäonnistuu, tulostataan virheilmoitus
                    console.error("Pokemontietoja ei saatukaan haettua. :( Status:", pyynto.status);
                }
            }
            // Lähetä pyyntö
        pyynto.send();
        };

        
    }

    function AddData(data) {
        var pokeContainer = document.getElementById("pokeContainer");
        pokeContainer.innerHTML = ""; // Tyhjennä aiemmat tiedot
        console.log(data);
    
        // Tässä voit lisätä haluamiasi tietoja näytettäväksi
        const pokemonNimi = data.name;
        const nimiElementti = document.createElement("div");
        nimiElementti.textContent = "Pokemonin nimi: " + pokemonNimi;
    
        console.log("Adding data:", nimiElementti.textContent);
    
        // Lisää luodut elementit pokeContainer-diviin
        pokeContainer.appendChild(nimiElementti);
    
        console.log("pokeContainer content:", pokeContainer.innerHTML);
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