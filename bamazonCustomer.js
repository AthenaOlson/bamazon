// install these packages
var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("easy-table");

// variable customer options
var options = ["View items for sale", "Place an order", "Back to main menu"];

// for nestedinquirer();
var i = 0;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
  });

  var customer = function() {
      inquirer.prompt([
        {
            type: "list",
            message: "nWhat would you like to do next?\n",
            choices: options,
            name: "customer"
        }  
      ]).then(function(res) {
          switch (res.customer) {
            case options[0]:
                view();
                break;
            
            case options[1]:
                view();
                break;

            case options[2]:
                view();
                break;
            }
      });
  }