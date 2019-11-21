// *************************P A C K A G E _ _ I N I T I A L I Z A T I O N ***********************************************

var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");

// mysql is for database connection
// inquirer allows for user input into CLI
// cli-table2 allows for table data to be shown in CLI

// ***********************************************************************************************************************


// ********************************S E T T I N G _ _ U P _ _ D A T A B A S E _ _ C O N N E C T I O N *********************

var connection = mysql.createConnection({  // This line creates a new mysql connection and allows for initializing of below data
    // host: "192.168.69.100",
    host: "localhost",
    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password (specific for when using MAMP)
    password: "root",

    // Name of database
    database: "bamazon"
});

connection.connect(); // This line established connection to the created connection from line 15

// ***********************************************************************************************************************************





// function which prompts the user for what action they should take
function start() {
    console.log("");
    console.log("*****************************************************************");
    console.log("B A M A Z O N __  M A N A G E R __ V I E W");
    console.log("*****************************************************************");
    console.log("");
    console.log("              B-M-V MAIN PAGE");
    console.log("");

    inquirer
        .prompt({
            name: "managerOptions",
            type: "list",
            message: " What action would you like to perform?\n",
            choices: ["View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "EXIT"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.managerOptions === "View Products for Sale") {
                productSales();
            }
            else if (answer.managerOptions === "View Low Inventory") {
                lowInventory();
            }
            else if (answer.managerOptions === "Add to Inventory") {
                addInventory();
            }
            else if (answer.managerOptions === "Add New Product") {
                addProduct();
            } else {
                connection.end();
            }
        });
}


var productSales = function () {
    connection.query("SELECT * FROM products", function (err, res) {      // queries database to show all columns and rows in products table
        if (err) throw err;                                            // error handling

        // Below are the settings for the table, this format is taken from documentation from cli-table2 package
        var table = new Table({
            head: ['ITEM ID', 'PRODUCT NAME', 'PRICE', 'QUANTITY']
            , colWidths: [20, 20, 10, 20],
            colAligns: ["center", "left", "right", "right"],
            style: {
                head: ["aqua"],
                compact: true
            }
        });
        // End of formatting of table

        // Loop that populates cli-table with database table information
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].products_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString());
        console.log("\n\n");



    });
    console.log("\n\n");
    start();
};




var lowInventory = function () {
    connection.query("SELECT * FROM products WHERE stock_quantity < 10", function (err, res) {      // queries database to show all columns and rows in products table
        if (err) throw err;                                            // error handling

        // Below are the settings for the table, this format is taken from documentation from cli-table2 package
        var table = new Table({
            head: ['ITEM ID', 'PRODUCT NAME', 'PRICE', 'QUANTITY']
            , colWidths: [20, 20, 10, 20],
            colAligns: ["center", "left", "right", "right"],
            style: {
                head: ["aqua"],
                compact: true
            }
        });
        // End of formatting of table

        // Loop that populates cli-table with database table information
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].products_name, res[i].price, res[i].stock_quantity]);
        }
        console.log("\n\n")
        console.log(table.toString());
        console.log("\n\n");



    });
    console.log("\n\n");
    start();
};



// function to handle posting new items up for auction
function addInventory() {
    // prompt for info about the item being put up for auction
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "What is the item would you like to replenish? (use item id)"
            },
            {
                name: "currentyQuantity",
                type: "input",
                message: "How many units are currently in stock?"
            },
            {
                name: "addedQuantity",
                type: "input",
                message: "How many units are you adding to the stock?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                    console.log("Not a valid entry...Try again")
                    addInventory();
                }
            }
        ])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            // connection.query(
            //     "SELECT stock_quantity FROM products WHERE item_id =answer.item", function (err, res) {      // queries database to show all columns and rows in products table
            //         if (err) throw err;                                            // error handling
            //         var currentQuantity = res;
            //     });

            var addedStock = parseInt(answer.currentyQuantity) + parseInt(answer.addedQuantity);
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: addedStock,
                    },
                    {
                        item_id: answer.item,

                    }
                ],
                function (err) {
                    if (err) throw err;
                    console.log("\nThere are now " + addedStock + " units of product with Item ID: " + answer.item + "\n");
                    console.log("Inventory has been updated successfully! \n");
                    // re-prompt the user for if they want to bid or post
                    start();
                }
            );
        });
}









start();