const fetch = require('node-fetch');
const db = require('./database/setup');
// Do not edit/remove code above this line

// Insert your code here
async function scrapeFruits() {
  try {
    const response = await fetch('https://fruityvice.com/api/fruit/all');
    const data = await response.json();

    const fruits = data.map(fruit => ({
      name: fruit.name,
      family: fruit.family,
      carbohydrates: fruit.nutritions.carbohydrates,
      protein: fruit.nutritions.protein,
      fat: fruit.nutritions.fat,
      calories: fruit.nutritions.calories,
      sugar: fruit.nutritions.sugar
    }));

    await db.deleteMany({});
    await db.insertMany(fruits);

    console.log('Fruits inserted:', fruits.length);
  } catch (error) {
    console.error(error);
  }
}

scrapeFruits();

