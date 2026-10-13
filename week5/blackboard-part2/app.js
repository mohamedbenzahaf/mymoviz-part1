require("./models/connection");

const Article = require("./models/Articles");
const User = require("./models/Users");
const Order = require("./models/Orders");

/*
** Articles
*/

function displayAllArticles() {
	Article.find().then(data => {
		console.log('ARTICLES =>', data);
	});
}

function displayArticleByName(articleName) {
	Article.findOne({ name: articleName }).then(data => {
		console.log('ARTICLE =>', data);
	});
}

function displayArticleByID(articleId) {
	Article.findById(articleId).then(data => {
		console.log('ARTICLE =>', data);
	});
}

function updateArticlePrice(articleId, newPrice) {
	Article.updateOne({ _id: articleId }, { price: newPrice }).then(() => {
		console.log(`Price updated for ${articleId}`);
	});
}

function updateArticleStock(articleId, newStock) {
	Article.updateOne({ _id: articleId }, { stock: newStock }).then(() => {
		console.log(`Stock updated for ${articleId}`);
	});
}

function resetStocks() {
	Article.updateMany({}, { stock: 0 }).then(() => {
		console.log(`Stocks successfully reset`);
	});
}

// displayAllArticles();
// displayArticleByName("NKD");
// displayArticleByID("625ea9ca38d6a3776994651d");
// updateArticlePrice("625ea9ca38d6a3776994651d", 3000);
// updateArticleStock("625ea9ca38d6a3776994651d", 612);
// resetStocks();


/*
** Users
*/

function displayAllUsers() {
	User.find().then(data => {
        console.log('USERS =>', data);
    });
 }

//  displayAllUsers();

function deleteUser(userId) {
	User.deleteOne({ _id: userId }).then(() => {
        console.log(`User ${userId} successfully deleted`);
    });
 }

//  deleteUser("625ea9ca38d6a3776994651d")

/*
** Orders
*/

function displayAllOrders() {
	Order.find().then(data => {
        console.log('ORDERS =>', data);
    });
 }

//  displayAllOrders();

function updateOrderPaymentStatus(orderId, isPaid) {
    Order.updateOne({ _id: orderId }, { isPaid }).then(() => {
        console.log(`Order ${orderId} payment status successfully updated`);
    });
}

// updateOrderPaymentStatus("625ea9ca38d6a37769946513", true);

function deleteOrder(orderId) {
	Order.deleteOne({ _id: orderId }).then(() => {
        console.log(`Order ${orderId} successfully deleted`);
    });
 }

 deleteOrder("625ea9ca38d6a37769946513");

// Do not edit/remove code under this line
module.exports = {
	displayAllArticles,
	displayArticleByName,
	displayArticleByID,
	updateArticlePrice,
	updateArticleStock,
	resetStocks,
	displayAllUsers,
	deleteUser,
	displayAllOrders,
	updateOrderPayment,
	deleteOrder,
};
