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



//****************************** F U N C T I O N _ _ F O R _ _ M A I N _ _ M E N U *****************************************

// function which prompts the user for what action they should take
function start() {
    // Next 7 lines of console logs are strictly serving as banner for menu page
    console.log("");
    console.log("*****************************************************************");
    console.log("B A M A Z O N __  M A N A G E R __ V I E W");
    console.log("*****************************************************************");
    console.log("");
    console.log("              B-M-V MAIN PAGE");
    console.log("");

    
    inquirer            // Inquirer package used to enable user interaction and input in CLI
        .prompt({
            name: "managerOptions",     // name to reference from response in .then portion of prompt
            type: "list",           // list type only allows user to chose from preset options set up below in choices portion of prompt
            message: " What action would you like to perform?\n",   // question that user will be asked
            choices: ["View Products for Sale",             // choices allows set list from which user can choose on screen
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "EXIT\n\n"]
        })
        .then(function (answer) {      
            // based on their answer from above, a different function is called to fulfill request
            if (answer.managerOptions === "View Products for Sale") {       // if user chose the view products for sale option...
                productSales();             // function lets user view products for sale
            }
            else if (answer.managerOptions === "View Low Inventory") {
                lowInventory();             // function lets user view items with low inventory
            }
            else if (answer.managerOptions === "Add to Inventory") {
                addInventory();             // function lets user add inventory to item of their choosing
            }
            else if (answer.managerOptions === "Add New Product") {
                addProduct();               // function lets user add products to database
            } else {
                connection.end();           // connection is ended here if user chooses exit option
            }
        });
}

// *********************************E N D _ _ O F _ _ M A I N _ _ M E N U _ _ F U N C T I O N ***********************************************



// ************************** F U N C T I O N _ _ F O R _ _ V I E W I N G _ _ A L L _ _ P R O D U C T S *************************************

var productSales = function () {
    connection.query("SELECT * FROM products", function (err, res) {      // queries database to show all columns and rows in products table
        if (err) throw err;                                            // error handling

        // Below are the settings for the table, this format is taken from documentation from cli-table2 package
        var table = new Table({
            head: ['ITEM ID', 'PRODUCT NAME', 'PRICE', 'QUANTITY']          // Column names established
            , colWidths: [20, 20, 10, 20],                              // Column widths established
            colAligns: ["center", "left", "right", "right"],            // Alignment of items within columns
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
    console.log(" ");
    console.log("\n\n");
    start();                // Allows program to cycle back to main menu in case user wants to perform different action
};


// ***************************************** E N D _ _ O F _ _ F U N C T I O N ***************************************************************




// ************************** F U N C T I O N _ _ F O R _ _ V I E W I N G _ _ L O W _ _ I N V E N T O R Y *************************************


var lowInventory = function () {
    connection.query("SELECT * FROM products WHERE stock_quantity < 10", function (err, res) {      // queries database to show all columns and rows in products table
        if (err) throw err;                                            // error handling

        // Below are the settings for the table, this format is taken from documentation from cli-table2 package
        var table = new Table({
            head: ['ITEM ID', 'PRODUCT NAME', 'PRICE', 'QUANTITY']          // Column Names established
            , colWidths: [20, 20, 10, 20],                              // Column widths established
            colAligns: ["center", "left", "right", "right"],        // Establish alignment of items within columns
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

// ***************************************** E N D _ _ O F _ _ F U N C T I O N ********************************************************



// ******************************** F U N C T I O N _ _ F O R _ _ A D D I N G _ _ I N V E N T O R Y *************************************


function addInventory() {
    
    inquirer        // Inquirer package enables user interaction / input in CLI
        .prompt([
            {
                name: "item",          // name of prompt data container
                type: "input",          // Input type takes in user typed data and saves it as ans.item
                message: "What is the item would you like to replenish? (use item id)" // first question user is asked
            },
            {
                name: "currentQuantity",           // name of prompt data container
                type: "input",              // input type takes user typed data and saves it as ans.currentQuantity
                message: "How many units are currently in stock?" // Second question user is asked
            },
            {
                name: "addedQuantity",          // name of prompt data container
                type: "input",              // input type takes user typde data and saves it as ans.addedQuantity
                message: "How many units are you adding to the stock?",     // Third question user is asked
                validate: function (value) {            // validation to ensure entered information is actually a number
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;               // If input is not a number, then user function is cycled to beginning
                    console.log("Not a valid entry...Try again")
                    addInventory();         // cycles user back to the beginning of function by calling again
                }
            }
        ])
        .then(function (answer) {   // function runs after prompts are completed

                        // Added stock is the number returned from the sum of current stock to amount of stock added by user
            var addedStock = parseInt(answer.currentQuantity) + parseInt(answer.addedQuantity);
            connection.query(                   // query database to target specific information
                "UPDATE products SET ? WHERE ?",                // Update the stock quantity of item id entered by user with added stock
                [
                    {
                        stock_quantity: addedStock,             // Takes place of first "?" above
                    },
                    {
                        item_id: answer.item,               // Takes place of second "?" above

                    }
                ],
                function (err) {            // Error Handling
                    if (err) throw err;             // Throws appropriate error
                    console.log("\nThere are now " + addedStock + " units of product with Item ID: " + answer.item + "\n");
                    console.log("Inventory has been updated successfully! \n");
                    
                    start();            // Allows user to head to main menu for further tasks without stopping connection
                }
            );
        });
}


// ***************************************** E N D _ _ O F _ _ F U N C T I O N ********************************************************




function addProduct() {
    // prompt for info about the item being put up for auction
    inquirer
      .prompt([
        {
          name: "product",
          type: "input",
          message: "What is the name of the product being added to the store?"
        },
        {
          name: "category",
          type: "input",
          message: "What department would this item fall under? (Enter one of the following: Electronics, Sports, Office, Kitchen)..."
        },
        {
          name: "price",
          type: "input",
          message: "What will be the cost (to the customer) of this product?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
            addProduct();
          }
        },
        {
            name: "quantity",
            type: "input",
            message: "How many units of this product will be available for customers?",
            validate: function(value) {
              if (isNaN(value) === false) {
                return true;
              }
              return false;
              addProduct();
            }
          }
      ])
      .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO products SET ?",
          {
            products_name: answer.product,
            department_name: answer.category,
            price: answer.price ,
            stock_quantity: answer.quantity 
          },
          function(err) {
            if (err) throw err;
            console.log("You have added item to store successfully!");
            // re-prompt the user for if they want to bid or post
            start();
          }
        );
      });
  }
  









// ******************************************* M A I N _ _ C O D E **********************************************************************

start();                // Calls main menu function, which is all app needs to function