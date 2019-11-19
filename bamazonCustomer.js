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



// ****************************S E T T I N G _ _ U P _ _ F U N C T I O N S*************************************************************

//                                                                                                                                   //

// >>>>>>>>>>>>>> F U N C T I O N _ _ T H A T _ _ D I S P L A Y S _ _ D B _ _ T A B L E _ _ D A T A >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var visual = function () {
  connection.query("SELECT * FROM products", function (err, res) {      // queries database to show all columns and rows in products table
    if (err) throw err;                                            // error handling
                        // The following lines are the store banner and table title
    console.log("");
    console.log("*****************************************************************");
    console.log("B A M A Z O N __  C-L-I __ S T O R E");
    console.log("*****************************************************************");
    console.log("");
    console.log("Bamazon Product List");
    console.log("");


  // Below are the settings for the table, this format is taken from documentation from cli-table2 package
    var table = new Table({
      head: ['ITEM ID', 'PRODUCT NAME', 'PRICE']
      , colWidths: [20, 20, 10],
      colAligns: ["center", "left", "right"],
      style: {
        head: ["aqua"],
        compact: true
      }
    });
  // End of formatting of table
  
  // Loop that populates cli-table with database table information
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].products_name, res[i].price]);
    }
    console.log(table.toString());
    console.log("");

  });
};
// >>>>>>>>>>>>>>>>>>> E N D _ _ O F _ _ T A B L E _ _ V I S U A L _ _ F U N C T I O N >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


//====================== F U N C T I O N _ _ T H A T _ _ A L L O W S _ _ U S E R _ _ T O _ _ S H O P =============================

var purchase = function () {
  inquirer              // inquirer package is initialized
    .prompt({               // .prompt allows for the message and input type to be established in an object
      name: "item",           // beyond this ".item" will be used to refer to the user's input
      type: "input",
      message: "Which Item would you like to purchase? (Enter Item ID)"
    }).then(function (ans) {    // establishes the user's input as "ans"

      var chosenItem = ans.item; // establishes a new variable to hold the user input (which is ans.item)
      connection.query("SELECT * FROM products WHERE item_id=?", chosenItem, function (err, res) {      
                                      // queries db to select the user's selection from the products table
        if (err) throw err;  // error handling
                                        // below if statement handles actions for valid/invalid user selection
        if (res.length === 0) {    // if input is incorrect.....
          console.log("That is not a valid Item Id. Try Again....");
          purchase();
        } else {            // if input is correct, secondary question will then be asked
          console.log("Item Id is valid, Processing.... ");

          inquirer            // User input again established for how much of item they would like to purchase
            .prompt({
              name: "quantity",
              type: "input",
              message: "How many units of this item would you like to purchase?"
            }).then(function (ans) {        // establishes "ans" to refer to user input
              var quantity = ans.quantity;      // variable quantity to be used to store user's input


             // Below if statement checks to see if requested amount is in stock
              if (quantity > res[0].stock_quantity) {             // if out of stock or not enough to fulfill order....
                console.log("We are unable to fulfill your order. Only "
                  + res[0].stock_quantity + " units are available for order at this time\n");
                console.log("\n Please try placing another order...\n");
                purchase();         // Starts user at beginning and asks for item id again 
              } else {        // If item is in stock or store has enough to fill order...
                console.log("");
                console.log("Transaction Successful!")
                console.log("User ordered " + quantity + " units of "
                  + res[0].products_name + " @ $" + res[0].price + " each");
                var total = quantity * res[0].price;
                console.log("User Total: $" + total);  // User is told what item was purchased, how many, price of each unit, and total cost at checkout

              // ^^^^^^^^^^^^^^^^^ H O W _ _ T O _ _ U P D A T E _ _ D A T A B A S E ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


                var updatedQuantity = res[0].stock_quantity - quantity;   // Variable that is used to store new amount  of items left after purchase of item
                connection.query(                   // query is made to database to perform the following line
                  "UPDATE products SET ? WHERE ?",            // syntax of query: update the products table with new stock quantity for current item id
                  [
                    {
                      stock_quantity: updatedQuantity     // key:value pair, set = stock_quantity and value given is updatedQuantity
                    },
                    {
                      item_id: res[0].item_id         // key:value pair, where = item_id and value is the current item
                    }
                  ],

                  function (err, res) {  //error handling
                    if (err) throw err;
                    console.log('');  // Shopping experience successful
                    console.log("THANK YOU FOR SHOPPING. SEE YOU AGAIN SOON...");
                    console.log("");
                    connection.end();   // ends connection
                  }
                )
              }
            })

        }
      })
    })

}


// *******************************M A I N _ _ C O D E ****************************************************************************

visual();   // THIS IS WHERE FUNCTION FOR VIEWING DB IN CLI IS CALLED
purchase();   // THIS IS WHERE FUNCTION FOR USER SHOPPING IS CALLED

// ************************ E N D _ _ O F _ _ C O D E *******************************************************************************



















































// // connect to the mysql server and sql database
// connection.connect(function(err) {
//     if (err) throw new err;
//     console.log("Connected as ID:", connection.threadId)
//     connection.query("SELECT * FROM products", function(err, res){
//       if (err) throw new err;
//       console.log(res);
//        connection.end();
//   });

//     // run the start function after the connection is made to prompt the user
//     // showProducts();
//     buyerPrompt();
//   });



// function showProducts(){
//     connection.query("SELECT * FROM products", function(err, res){
//         // if (err) throw new err;
//         console.log(res);
//         // connection.end();
//     });

// }

// function buyerPrompt(){
//     inquirer
//         .prompt([
//             {
//                 name: "item_id",
//                 type: "rawlist",
//                 message: "What is the ID of the product you would like to purchase?",
//                 choices: function(){
//                   var choiceArray = [];
//                   for (var i=0; i<res.length; i++){
//                     choiceArray.push(res[i].item_id);
//                   }
//                 }
//             },
//             {
//                 name: "quantity",
//                 type: "input",
//                 message: "How many units would you like to purchase?",

//             }

//         ])
// }
