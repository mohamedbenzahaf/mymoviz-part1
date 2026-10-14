const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema({
  name: String,
  color: String,
});

//? TABLEAU DE SOUS-DOCUMENTS (SUB-DOCUMENTS)
// Nest typeSchema inside pokemonSchema
const pokemonSchema = new mongoose.Schema({
  name: String,
  types: [typeSchema],
});

//? TABLEAU DE CLÉS ÉTRANGÈRES (FOREIGN KEYS)
const pokemonSchema_V2 = new mongoose.Schema({
  name: String,
  types: [{ type: mongoose.Schema.Types.ObjectId, ref: "types" }],
});

const Pokemon = mongoose.model("pokemons", pokemonSchema);
const Pokemon_V2 = mongoose.model("pokemons_V2", pokemonSchema_V2);
const Type = mongoose.model("types", typeSchema);

module.exports = { Pokemon, Pokemon_V2, Type }; // Do not edit/remove this line !
