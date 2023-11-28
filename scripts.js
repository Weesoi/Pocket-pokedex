
var input = document.getElementById("pokemon-input");

input.addEventListener("keypress", function(event) {
    if (event.key === "enter") {
console.log("hello kaka :3")
        event.preventDefault();
        document.getElementById("nappi").click();       
}});

//lappuun liittyvät funktiot 
function avaaLappu() {
    var lappu = document.getElementById("avattavaLappu"); //etsitään lappu ja sen sisältö
    var sisalto = lappu.querySelector(".sisalto");

    lappu.classList.add("avattu"); //lapun sisältö on esitetty blockkina
    sisalto.style.display = "block";
}

function suljeLappu() {
    var lappu = document.getElementById("avattavaLappu");
    var sisalto = lappu.querySelector(".sisalto");

    lappu.classList.remove("avattu");
    sisalto.style.display = "none";
}


//submit-napin painaminen tuo meidät tänne
function haePokemon() {
    // Tyhjennä aiemmat haut 
    document.getElementById("pokemon-container").innerHTML = "";
    //haetaan 
    var pokemonNimi = document.getElementById("pokemon-input").value;

    if (pokemonNimi) {
        var apiUrl = "https://pokeapi.co/api/v2/pokemon/" + pokemonNimi.toLowerCase();

        // Luodaan uusi objekti
        var kutsu = new XMLHttpRequest();

        // Määritä pyyntö
        kutsu.open("GET", apiUrl, true);

        // Määritä tapahtumankäsittelijät
        kutsu.onload = function() {
            if (kutsu.status >= 200 && kutsu.status < 300) {
                // Muunna JSON:ksi
                var data = JSON.parse(kutsu.responseText);
                haeLisatiedot(data);
            } else {
                console.error('Virhe haettaessa Pokemonin tietoja:', kutsu.statusText);
                alert('Virhe haettaessa Pokemonin tietoja. Tarkista nimi ja yritä uudelleen.');
            }
        };

        kutsu.onerror = function() {
            console.error('Virhe haettaessa Pokemonin tietoja:', kutsu.statusText);
            alert('Virhe haettaessa Pokemonin tietoja. Tarkista nimi ja yritä uudelleen.');
        };

        // Lähetä pyyntö
        kutsu.send();
    }
}

function haeJaNaytaKuva(pokemonNimi) {
    var imageUrl = `https://play.pokemonshowdown.com/sprites/gen5/${pokemonNimi.toLowerCase()}.png`;
    

    //vaihtoehtoinen kuvapankki --> mietin vielä kumpaa käytän
    //var imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonDexNumero}.gif`;

    
        // Luo kuva-elementti ja aseta sen lähde
        var kuvaElementti = document.createElement("img");
        kuvaElementti.src = imageUrl;
        kuvaElementti.alt = "Pokemonista ei ole valitettavasti vielä kuvaa";
        kuvaElementti.classList.add("pokemon-image"); // Lisää luokka, jotta kuvaa pystytään muokkaamaan css:ssä
    
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

    // Hae flavor-teksti samasta APista kuin aikasemmin mutta käyttäen hieman eri osoitetta
    var speciesUrl = pokemonData.species.url;
    fetch(speciesUrl)
        .then(response => response.json())
        .then(speciesData => {
            var flavorText = getFlavour(speciesData.flavor_text_entries);
            AddFlavourText(pokemonContainer, flavorText);

            // Hae ja näytä Pokemonin kuva
            haeJaNaytaKuva(pokemonData.name);
        })
        .catch(error => {
            console.error('Virhe haettaessa Pokemonin tietoja:', error);
        });
}

// pokemonien paino ja pituus tulevat tietokannasta hehtogrammoina ja hehtometreinä joten tämä funktio muuttaa ne kg ja cm-muotoon. 
function muunnaKilogrammoiksi(grammat) {
    // Muunna grammaa kilogrammoiksi jakamalla 10:llä
    return (grammat / 10).toFixed(2);
}

function haeKyvyt(abilities) {
    // Yhdistä Pokemonin kyvyt
    return abilities.map(ability => ability.ability.name).join(", ");
}

function getFlavour(flavorTextEntries) {
    // Hae ensimmäinen flavour-teksti mikä löytyy koska kannassa on niitä useampi
    for (var i = 0; i < flavorTextEntries.length; i++) {
        if (flavorTextEntries[i].language.name === "en") {
            return flavorTextEntries[i].flavor_text;
        }
    }
    return "Ei saatavilla :( ";
}

function AddFlavourText(container, flavorText) {

    var FlavourDiv = document.createElement("div");
    FlavourDiv.innerHTML = "<p>" + flavorText + "</p>";
    FlavourDiv.classList.add("flavour-div");
    container.appendChild(FlavourDiv);
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
        

        /*var pyynto = new XMLHttpRequest();

        pyynto.open("GET", apiUrl, true);

        pyynto.onreadystatechange = function () {
            if (pyynto.readyState === XMLHttpRequest.DONE) {
                if (pyynto.status === 200) {
                    // Käsittellään vastaus tässä
                    const data = JSON.parse(pyynto.responseText);
                    AddData(data);
                } else {
                    console.error("Pokemontietoja ei saatukaan haettua. :( Status:", pyynto.status);
                }
            }
        };

        //pyynto.send();
    //}

  /*function AddData(data) {
    var pokeContainer = document.getElementById("pokeContainer");
    pokeContainer.innerHTML = ""; // Tyhjennä aiemmat tiedot
    console.log(data);

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