const { Pokemon_V2, Type } = require("../database/setup.js"); // Do not edit/remove this line !

//! Create new type document/object in 'types' collection
function addType(typeName, typeColor) {
  // Write your code here
}
// addType('rock', 'brown')

//! Create new pokemon document/object in 'pokemons' collection
function createPokemon(pokemonName, ObjectId) {
  // Write your code here
}
// createPokemon('pikachu', 'mongo _id value') you can get an _id from a type document in database

//! Display all pokemons from database
function displayPokemons() {
	// Write your code here
}
// displayPokemons();

//! Update a type document/object in 'types' collection
function updateType(typeName, typeColor) {
  // Write your code here
}
// updateType('rock', 'grey')

//! Delete a type document/object in 'types' collection
function deleteType(typeName) {
  // Write your code here
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
