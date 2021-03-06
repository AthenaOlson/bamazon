// install these packages
var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("easy-table");

var customer = require("./bamazon.js");

// variable customer options
var options = ["View items for sale", "Place an order", "Back to main menu"];

// for nestedinquirer();
var i = 0;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    customer();
  });

  var customer = function() {
      inquirer.prompt([
        {
            type: "list",
            message: "\nWhat would you like to do next?\n",
            choices: options,
            name: "customer"
        }  
      ]).then(function(res) {
          switch (res.customer) {
            case options[0]:
                view();
                break;
            
            case options[1]:
                order();
                break;

            case options[2]:
            var greeting = require("")
                greeting();
                break;
            }
      });
  };
function view() {
    inquirer.prompt([
        {
            type: "list",
            message: "\nSort by: ",
            choices: ["Department", "Price (ascending)", "Price (descending)"],
            name: "options"
        }
    ]).then(function(res) {
        switch (res.options) {
            case "Price (ascending)":
            connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products ORDER BY price", function(err, results) {
                if (err) throw err;
                console.log(
                    "\n" +
                    Table.print(results, {
                        item_id: {name: "Product ID"},
                        product_name: {name: "Product Name"},
                        department_name: {name: "Department"},
                        price: {name: "Price ($)", printer: Table.number(2)},
                        stock_quantity: {name: "Stock Quantity"}
                    })
                );
                customer();
            });
            break;

            case "Price (descending)":
            connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products ORDER BY price DESC", function(err, results) {
                if (err) throw err;
                console.log(
                    "\n" +
                    Table.print(results, {
                        item_id: {name: "Product ID"},
                        product_name: {name: "Product Name"},
                        department_name: {name: "Department"},
                        price: {name: "Price ($)", printer: Table.number(2)},
                        stock_quantity: {name: "Stock Quantity"}
                    })
                );
                customer();
            });
            break;
            
            case "Department":
            connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products ORDER BY department_name", function(err, results) {
                if (err) throw err;
                console.log(
                    "\n" +
                    Table.print(results, {
                        item_id: {name: "Product ID"},
                        product_name: {name: "Product Name"},
                        department_name: {name: "Department"},
                        price: {name: "Price ($)", printer: Table.number(2)},
                        stock_quantity: {name: "Stock Quantity"}
                    })
                );
                customer();
            });
            break;
        }
    });
};

function order() { // show checkboxes for order
	connection.query("SELECT * FROM products", function(err, res1) {
		if (err) throw err;
		var results = res1;
		connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function(err, res2) {
			if (err) throw err;
			var results1 = res2;
			var a = Table.print(results1).substring(Table.print(results1).indexOf("1")).split("\n");
			var itemsopt = a.splice(0, a.indexOf(""));
			inquirer.prompt([
				{
					type: "checkbox",
					message: "\nPlease select the products you would like to purchase.\n(product ID, product name, department, price ($), stock quantity)\n",
					choices: itemsopt,
					name: "order",
					pageSize: 40
				}
			]).then(function(res) {
				nestedinquirer(res.order, results);
			});
		});
	});
};

function nestedinquirer(answer, data) { // allow multiple choices for order
	var data1 = data;
	var index = [];
	for (i = 0; i < answer.length; i++) {
		index.push(answer[i].split(" ")[0]);
	}
	i = 0;
	inquiry(index, data1);
	function inquiry(index, data) {
		if (i < index.length) {
			var ind = index[i] - 1;
			var name = data[ind].product_name;
			var stock = data[ind].stock_quantity;
			var dept = data[ind].department_name;
			var cost = data[ind].cost;
			var price = data[ind].price;
			inquirer.prompt([
				{
					type: "input",
					message: "\nHow many " + name + " do you want to purchase?",
					name: "quantity",
					validate: function(value) {
						if (!isNaN(value) && value <= stock) {
                            return true;
                            
                        }
                    } 
                }
            ]).then(function(res) {
				connection.query("UPDATE products SET stock_quantity = ? WHERE product_name = ?", [stock - res.quantity, name], function(err, results) {
                    if (err) throw err;
                    console.log("\n-------------------------------------------------\n");
			        console.log("Thanks for your order! We will fullfill it as soon as possible!")
                    console.log("\n-------------------------------------------------\n");
                    connection.end();
				});
			});
		} 
	};
};

