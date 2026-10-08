const fetch = require('node-fetch');
const db = require('./database/setup');
// Do not edit/remove code above this line

// Insert your code here
fetch('https://fruityvice.com/api/fruit/all')
  .then(response => response.json())
  .then(fruits => {
    fruits.forEach(fruit => {
      db.findOne({ name: fruit.name })
        .then(existingFruit => {
          if (!existingFruit) {
            db.create({
              name: fruit.name,
              family: fruit.family,
              carbohydrates: fruit.nutritions.carbohydrates,
              protein: fruit.nutritions.protein,
              fat: fruit.nutritions.fat,
              calories: fruit.nutritions.calories,
              sugar: fruit.nutritions.sugar
            });
          }
        });
    });
  });  

