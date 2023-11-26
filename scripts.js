function haePokemon() {
    // Tyhjennä aiemmat hakut
    document.getElementById("pokemon-container").innerHTML = "";

    var pokemonNimi = document.getElementById("pokemon-input").value;

    if (pokemonNimi) {
        var apiUrl = "https://pokeapi.co/api/v2/pokemon/" + pokemonNimi.toLowerCase();

        // Fetch API:lla
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                haeLisatiedot(data);
            })
            .catch(error => {
                console.error('Virhe haettaessa Pokemonin tietoja:', error);
                alert('Virhe haettaessa Pokemonin tietoja. Tarkista nimi ja yritä uudelleen.');
            });
    }
}

function haeLisatiedot(pokemonData) {
    var pokemonContainer = document.getElementById("pokemon-container");

    // Luo uusi div-elementti näyttämään Pokemonin tiedot
    var pokemonDiv = document.createElement("div");
    var capitalizedPokemonName = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
    pokemonDiv.innerHTML = "<br><h2>" + capitalizedPokemonName + "</h2>" +
        "<p>Pokedex-number: " + pokemonData.id + "</p>" +
        "<p>Height: " + muunnaKilogrammoiksi(pokemonData.height) + "cm</p>" +
        "<p>Weight: " + muunnaKilogrammoiksi(pokemonData.weight) + "kg</p>" +
        "<p>Abilities: " + haeKyvyt(pokemonData.abilities) + "</p>";

    // Lisää div-elementti sivulle
    pokemonContainer.appendChild(pokemonDiv);

    // Hae maku (flavor text) eri API:sta
    var speciesUrl = pokemonData.species.url;
    fetch(speciesUrl)
        .then(response => response.json())
        .then(speciesData => {
            var flavorText = haeMaku(speciesData.flavor_text_entries);
            AddFlavourText(pokemonContainer, flavorText);
        })
        .catch(error => {
            console.error('Virhe haettaessa Pokemonin lajin tietoja:', error);
        });
}


function muunnaKilogrammoiksi(grammat) {
    // Muunna grammaa kilogrammoiksi jakamalla 1000:lla
    return (grammat / 100).toFixed(2); // Kaksi desimaalia
}

function haeKyvyt(abilities) {
    // Yhdistä Pokemonin kyvyt pilkulla
    return abilities.map(ability => ability.ability.name).join(", ");
}

function haeMaku(flavorTextEntries) {
    // Hae ensimmäinen englanninkielinen maku
    for (var i = 0; i < flavorTextEntries.length; i++) {
        if (flavorTextEntries[i].language.name === "en") {
            return flavorTextEntries[i].flavor_text;
        }
    }
    return "Ei saatavilla";
}

function AddFlavourText(container, flavorText) {
    var makuDiv = document.createElement("div");
    makuDiv.innerHTML = "<p>" + flavorText + "</p>";
    container.appendChild(makuDiv);
}


/*document.addEventListener("DOMContentLoaded", function () {
    let submitNappi = document.querySelector("#submit");

    submitNappi.addEventListener("click", function () {
        getPokemonInfo();
    });

    function getPokemonInfo() {
        const pokemonNimi = document.querySelector("#writePokemon").value.toLowerCase();
        const apiUrl = "https://pokeapi.co/api/v2/pokemon/"; /*+ pokemonNimi; */
        

        // Luo uusi XMLHttpRequest-objekti
        /*var pyynto = new XMLHttpRequest();

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
        };

        // Lähetä pyyntö
        //pyynto.send();
    //}

  /*function AddData(data) {
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
} */
//});



// tällä saadaan pokemon extry teksti
// GET https://pokeapi.co/api/v2/pokemon-species/

//halutut tiedot: types, entry, name+ pokedex number , height, abilities, weight

//tee suprise me- nappi jos kerkeät



// https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/87.svg 
// täältä spritet


//täältä loput:
//https://github.com/favware/graphql-pokemon#using-fetch