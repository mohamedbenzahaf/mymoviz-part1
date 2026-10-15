const { Pokemon } = require("../database/setup"); // Do not edit/remove this line !

//! Display pokemons from database
function displayPokemons() {
  Pokemon.find().then(data => {
    console.log("ALL POKEMONS =>", data);
  });
}
displayPokemons();

//! Create a new pokemon in database
function createPokemon(pokemonName, typeName, typeColor) {
  Pokemon.create({
    name: pokemonName,
    types: [{ name: typeName, color: typeColor }]
  }).then(() => {
    console.log(`${pokemonName} created`);
  });
}

//! Add a sub-document/sub-object to an array
function addType(pokemonName, typeName, typeColor) {
  Pokemon.updateOne(
    { name: pokemonName },
    { $push: { types: { name: typeName, color: typeColor } } }
  ).then(() => {
    console.log(`Type ${typeName} added to ${pokemonName}`);
  });
}

//! Update type in "pokemon" collection
function updateType(typeName, typeColor) {
  Pokemon.updateOne(
    { types: { $elemMatch: { name: typeName } } },
    { $set: { "types.$.color": typeColor } }
  ).then(() => {
    console.log(`Type ${typeName} updated`);
  });
}

//! Delete type from "pokemon" collection
function deleteType(typeName) {
  Pokemon.updateMany(
    {},
    { $pull: { types: { name: typeName } } }
  ).then(() => {
    console.log(`Type ${typeName} deleted`);
  });
}

// deleteType('rock')

// Do not edit/remove the code below this line !
module.exports = {
  displayPokemons,
  createPokemon,
  addType,
  updateType,
  deleteType,
};
