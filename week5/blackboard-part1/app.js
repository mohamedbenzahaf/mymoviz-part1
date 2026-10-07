const db = require('./database/setup'); // Do not edit/remove this line


function displayAllArticles() {
    return db.find();
}


function displayArticleByName(articleName) {
    return db.findOne({ name: articleName });
}


function displayArticleByID(articleId) {
    return db.findById(articleId);
}


function updateArticlePrice(articleId, newPrice) {
    return db.updateOne(
        { _id: articleId },
        { price: newPrice }
    );
}

function updateArticleStock(articleId, newStock) {
    return db.updateOne(
        { _id: articleId },
        { stock: newStock }
    );
}

function resetStocks() {
    return db.updateMany({}, { stock: 0 });
}


// Do not edit/remove code under this line
module.exports = {
	displayAllArticles,
	displayArticleByName,
	displayArticleByID,
	updateArticlePrice,
	updateArticleStock,
	resetStocks,
};