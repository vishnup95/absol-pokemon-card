const absolSection = document.getElementsByClassName("absol-details")[0];
const megaAbsolSection = document.getElementsByClassName(
  "mega-absol-details"
)[0];
const absolBg = document.getElementsByClassName('absol-bg')[0]
const megaAbsolBg = document.getElementsByClassName('mega-absol-bg')[0]

const pokemonDetails = ["absol", "absol-mega"]; // Order matters

const P = new Pokedex.Pokedex();
//API to fetch.
const fetchPokemon = async (poke) => {
  return await P.getPokemonByName(poke).catch((err) => {
    throw new Error(err);
  });
};

async function getPokemon() {
  return await Promise.all(
    pokemonDetails.map(async (pokemon) => {
      return await fetchPokemon(pokemon);
    })
  );
}

generateAbsolDetails = (data) => {
  data.forEach((form) => {
    // Before Doing anything we call one more API to fetch the species info
    const { name, abilities, types, sprites } = form;
    const detailSection = document.createElement("ul");
    const nameElement = document.createElement("li");
    const ablityElement = document.createElement("li");
    const typeElement = document.createElement("li");
    const sprite = document.createElement("img");

    nameElement.classList.add(`${name}`);
    ablityElement.classList.add("ability");
    typeElement.classList.add("type");
    sprite.classList.add("absol-image");


    nameElement.innerText = `${name.toUpperCase()}`;
    ablityElement.innerText = `${abilities[0].ability.name.toUpperCase()}`;
    typeElement.innerText = `${types[0].type.name.toUpperCase()}`;
    sprite.src = sprites.other["official-artwork"]["front_default"]

    detailSection.appendChild(nameElement);
    detailSection.appendChild(typeElement);
    detailSection.appendChild(ablityElement);

    name === pokemonDetails[0]
      ? absolSection.appendChild(detailSection)
      : megaAbsolSection.appendChild(detailSection);

    name === pokemonDetails[0]
      ? absolBg.appendChild(sprite)
      : megaAbsolBg.appendChild(sprite);
  });
};

async function init() {
  // getThePokemonInfo!
  const absolForms = await getPokemon();
  generateAbsolDetails(absolForms);
}

init();
