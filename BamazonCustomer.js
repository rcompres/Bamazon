var mysql = require 'mysql';
var pompt = require('prompt');


prompt.start();

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'Bamazon',
});

connection.connect(function(err){
	if (err) throw err;
});

function listProduct(){
	connection.query('SELECT * FROM product', function(err, result){
		if(err) throw err;
			for (var i=0 i< result.length; i++) {
				console.log("-------------------------------------------")

			}

	});

};

function buyProduct(){
	prompt.get(
	{
		properties:{
			userIDInput: {
				message: '\nPlease enter the ID for the product you wish to purchase'
			},
			userNumberInput:{
				message: '\nHow many would you like?'
			}
		}

	}, function (err, userChoice){
			checkStock(userChoice.userIDInput, userChoice.userNumberInput);
	});
};

function checkStock(userIDInput, userNumberInput) {
	var currentItemStock = "";
	var currentItemChoice = "";
	var newStock;
	connection.query('SELECT * FROM product WHERE ?', { id:userIDInput}, function(err, result) {
		if(err) throw err;
		currentItemStock= result[0].stock;
		currentItemChoice=result[0].id;
		if(userNumberInput<=currentItemStock) {
			console.log('\nWe can do that for you')
			console.log('\nYour total is $' + (result[0].price * userNumberInput)".");
				newStock=result[0].stock - userNumberInput;
				connection.query('UPDATE product SET stock =' + newStock + ' WHERE id=' + userIDInput);
		}
		else{
			console.log('\nNot enough in stock');
		}
		showProducts();
	};
};

showProducts();