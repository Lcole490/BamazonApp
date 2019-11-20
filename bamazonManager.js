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
    inquirer
      .prompt({
        name: "managerOptions",
        type: "list",
        message: "What action would you like to perform?",
        choices: ["View Products for Sale",
                  "View Low Inventory",
                  "Add to Inventory",
                  "Add New Product",
                  "EXIT"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.managerOptions === "View Products for Sale") {
          postAuction();
        }
        else if(answer.managerOptions === "View Low Inventory") {
          bidAuction();
        } 
        else if (answer.managerOptions === "Add to Inventory"){
            addInventory();
        }
        else if (answer.managerOptions === "Add New Product"){
            addProduct();
        } else{
          connection.end();
        }
      });
  }