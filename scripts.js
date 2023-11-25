const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

// Luo uusi XMLHttpRequest-objekti
const xhr = new XMLHttpRequest();

// Määritä pyyntötyyppi ja kohde
xhr.open("GET", apiUrl, true);

// Määritä tapahtumakäsittelijä, kun pyyntö on valmis
xhr.onreadystatechange = function () {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
      // Käsittele vastaus tässä
      const data = JSON.parse(xhr.responseText);
      console.log(data);
    } else {
      // Jos pyyntö epäonnistuu, tulosta virheilmoitus
      console.error("There was an error with the XMLHttpRequest. Status:", xhr.status);
    }
  }
};

// Lähetä pyyntö
xhr.send();







function getPokemonInfo() {

pokeContainer.innerHTML = "";

url = "https://pokeapi.co/api/v2/pokemon/ditto"


var PokeRequest = new XMLHttpRequest();
PokeRequest.open('GET', "https://pokeapi.co/api/v2/pokemon/", true);


// tällä saadaan pokemon extry teksti
// GET https://pokeapi.co/api/v2/pokemon-species/

//halutut tiedot: types, entry, name+ pokedex number , height, abilities, weight

//tee suprise me- nappi jos kerkeät
}



// https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/87.svg 
// täältä spritet


//täältä loput:
//https://github.com/favware/graphql-pokemon#using-fetch