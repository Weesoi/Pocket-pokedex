function haePokemon() {
    // Tyhjennä aiemmat hakut
    document.getElementById("pokemon-container").innerHTML = "";

    var pokemonNimi = document.getElementById("pokemon-input").value;

    if (pokemonNimi) {
        var apiUrl = "https://pokeapi.co/api/v2/pokemon/" + pokemonNimi.toLowerCase();

        // Luo uusi XMLHttpRequest-objekti
        var xhr = new XMLHttpRequest();

        // Määritä pyyntö
        xhr.open("GET", apiUrl, true);

        // Määritä tapahtumankäsittelijät
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                // Muunna JSON-muotoon
                var data = JSON.parse(xhr.responseText);
                haeLisatiedot(data);
                haeJaNaytaKuva(data.id); // Hae ja näytä Pokemonin kuva
            } else {
                console.error('Virhe haettaessa Pokemonin tietoja:', xhr.statusText);
                alert('Virhe haettaessa Pokemonin tietoja. Tarkista nimi ja yritä uudelleen.');
            }
        };

        xhr.onerror = function() {
            console.error('Virhe haettaessa Pokemonin tietoja:', xhr.statusText);
            alert('Virhe haettaessa Pokemonin tietoja. Tarkista nimi ja yritä uudelleen.');
        };

        // Lähetä pyyntö
        xhr.send();
    }
}

function haeJaNaytaKuva(pokemonDexNumero) {
    var imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonDexNumero}.gif`;

    // Luo kuva-elementti ja aseta sen lähde
    var kuvaElementti = document.createElement("img");
    kuvaElementti.src = imageUrl;
    kuvaElementti.alt = "Pokemon Image";

    // Lisää kuva div-elementtiin vasta flavor tekstin jälkeen
    document.getElementById("pokemon-container").appendChild(kuvaElementti);
}


function haeLisatiedot(pokemonData) {
    var pokemonContainer = document.getElementById("pokemon-container");

    // Luo uusi div-elementti näyttämään Pokemonin tiedot
    var pokemonDiv = document.createElement("div");
    var capitalizedPokemonName = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
    pokemonDiv.innerHTML = "<br><h2>" + capitalizedPokemonName + "</h2>" +
        "<p><b>Pokedex-number:</b> " + pokemonData.id + "</p>" +
        "<p><b>Height:</b> " + muunnaKilogrammoiksi(pokemonData.height) + " m</p>" +
        "<p><b>Weight:</b> " + muunnaKilogrammoiksi(pokemonData.weight) + " kg</p>" +
        "<p><b>Abilities:</b> " + haeKyvyt(pokemonData.abilities) + "</p>";

    // Lisää div-elementti sivulle
    pokemonContainer.appendChild(pokemonDiv);

    // Hae flavor-teksti samasta APista kuin aikasemmin mutta käyttäen 
    var speciesUrl = pokemonData.species.url;
    fetch(speciesUrl)
        .then(response => response.json())
        .then(speciesData => {
            var flavorText = getFlavour(speciesData.flavor_text_entries);
            AddFlavourText(pokemonContainer, flavorText);
        })
        .catch(error => {
            console.error('Virhe haettaessa Pokemonin lajin tietoja:', error);
        });
}


function muunnaKilogrammoiksi(grammat) {
    // Muunna grammaa kilogrammoiksi jakamalla 1000:lla
    return (grammat / 10).toFixed(2); // Kaksi desimaalia
}

function haeKyvyt(abilities) {
    // Yhdistä Pokemonin kyvyt
    return abilities.map(ability => ability.ability.name).join(", ");
}

function getFlavour(flavorTextEntries) {
    // Hae ensimmäinen flavour-teksti mikä löytyy kosta kannassa on niitä useampi
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

//Tässä alkuperäisen koodin raakileet. Koodia testatessa sain jatkuvasti ilmoituksen "network error" 
// ja vaikka koitin kauan sen kanssa tapella, en onnistunut selvittämään mistä virhe johtui. APIsta itsessään se ei ollut kiinni koska päätin testata koodia 
// muillakin API-kutsuilla, ja se ei toiminut. Console.logitkaan eivät oikein auttaneet asiaa.

//------------------>


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