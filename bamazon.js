var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("easy-table");

var customer = require("./bamazonCustomer.js");

var options = ["I'm a Customer."];

function quit() {
    console.log("\n----------------------------------------------------------------------------------\n");
    console.log("Thanks for visiting my Bamazon Storefront, your best selection of random kitchen stuff!");
    console.log("\n----------------------------------------------------------------------------------\n");
    process.exit();
};

function greeting() {
    console.log("\n----------------------------------------------------------------------------------\n");
    console.log("Welcome to my Bamazon Storefront, your best selection of random kitchen stuff!");
    console.log("\n----------------------------------------------------------------------------------\n");
    inquirer.prompt([
       
	]).then(function(res) {
		switch (res.login) {
			case options[0]:
				customer();
				break;

			case options[0]:
				quit();
				break;
		};
	});
};
module.exports = greeting;
greeting();