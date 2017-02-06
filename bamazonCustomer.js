'use strict';
// Dependencies
var inquirer = require("inquirer");
var mysql = require("mysql");
// MySQL connection objection.
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "*******",
	database: "Bamazon"
});
// Connection to server.
connection.connect(function(err) {
	if (err) throw err;
});

// Global variable for customer purchase total.
var totalCost = 0;

// Initializes the app start function.
runApp();

// Run-app function with a slight delay for prompts.
function runApp() {
	displayProducts();
	setTimeout(customerQuery, 1000);
}

// Show the products function.
function displayProducts() {
	console.log("----------------------------------------------------------------------------------");
	console.log("                                   Welcome to Bamazon.")
	connection.query("SELECT * FROM products", function(err, res) {
		// Loop through response length of products table.
		for (var i = 0; i < res.length; i++) {
			// Console out the products and details.
			console.log("----------------------------------------------------------------------------------");
			console.log("Item_ID: " + res[i].item_id + "| " + "Product: " + res[i].product_name + "| " + "Dept: " + res[i].department_name + "| " + "Price $" + res[i].price);
		}
	});
} // End of displayProducts().

// User prompts and input for purchase items function().

function customerQuery() {
	// Inquirer objects.
	console.log("----------------------------------------------------------------------------------");
	inquirer.prompt([
	{	// Enter ID prompt.
		type: "input",
		name: "query",
		message: "Please enter the item ID that you are interested in purchasing.",
		// Check to make sure only numerical values are accepted.  If not, prompt user to enter valid ID value.
		validate: function(res) {
          var done = this.async();
            if (isNaN(res) === true) {
              done('You need to provide a number');
                return;
            }
            done(null, true);
        }
	},
	{	// Quantity of items to purchase.
		type: "input",
		name: "quantity",
		message: "How many of this item would you like to purchase today?",
		// Check to make sure only numerical values are accepted.  If not, prompt user to enter valid ID value.
		validate: function(res) {
          var done = this.async();
            if (isNaN(res) === true) {
              done('You need to provide a number');
                return;
            }
            done(null, true);
        }
	}	// SQL functions, grab data from database.
	]).then(function(info) {
	var item = info.query;
	var quantity = info.quantity;
	// Connection to SQL query database.
	// SELECT from tables in database.
	connection.query("SELECT * FROM products WHERE item_id = ? ", item, function(err, res) {
			if (err) throw err;
			var department = res[0].department_name;
			var stock = res[0].stock_quantity;
			if (stock >= quantity) {
				var totalStock = stock - quantity;
				var price = res[0].price;
				var cost = quantity * price;
			// Total cost of customer purchases.
			totalCost = totalCost + cost;
			// Console total cost of purchases.  Round the value down.
			console.log("Total: $" + totalCost.toFixed(2));
			// UPDATE stock quantity of database after checkout.
			connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: totalStock}, {item_id: item}], function(err, res) {});
			// Prompts here.
			inquirer.prompt([
					{	// Confirm with customer on whether they would like to purchase more.
						type: "confirm",
						name: "complete",
						message: "Will that be all for today?"
					}
				]).then(function(info){
					var complete = info.complete;
					// End SQL connection if done shopping.
					if (complete) {
						console.log("Thank you for shopping at Bamazon.");
						connection.end();
					} else {
						customerQuery();
					}
				});
			} else {
				console.log("Not enough quantity in stock to fulfill your purchase.");
				customerQuery();
			}
		});
	});
} // End of customerQuery().
