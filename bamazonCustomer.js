var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");

var connection = mysql.createConnection({
  // host: "192.168.69.100",
  host: "localhost",
  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect();


var visual = function(){
  connection.query("SELECT * FROM products", function(err, res){
    if (err) throw err;
    console.log("*****************************************************************");
    console.log("B A M A Z O N __  C-L-I __ S T O R E");
    console.log("*****************************************************************");
    console.log("");
    console.log("Bamazon Product List");
    console.log("");
    
 

  var table = new Table({
    head: ['ITEM ID', 'PRODUCT NAME', 'PRICE']
  , colWidths: [20, 20, 10],
  colAligns: ["center", "left", "right"],
  style:{
    head: ["aqua"],
    compact: true
  }
});

for (var i = 0; i< res.length; i++){
  table.push ([res[i].item_id, res[i].products_name, res[i].price]);
}
console.log(table.toString());
console.log("");

});
};

var purchase = function(){
  inquirer
    .prompt({
      name: "item",
      type: "input",
      message: "Which Item would you like to purchase? (Enter Item ID)"
    }).then(function(ans){

      var chosenItem = ans.item;
      connection.query("SELECT * FROM products WHERE item_id=?", chosenItem, function(err,res){
        if (err) throw err;
        if (res.length ===0){
          console.log("That is not a valid Item Id. Try Again....");
          purchase();
        }else {
          console.log("Item Id is valid, Processing.... ");

          inquirer
            .prompt({
              name: "quantity",
              type: "input",
              message: "How many units of this item would you like to purchase?"
            }).then(function(ans){
              var quantity = ans.quantity;
              if (quantity > res[0].stock_quantity){
                console.log ("We are unable to fulfill your order. Only "
                 + res[0].stock_quantity + " units are available for order at this time");
                 purchase();
              }else{
                console.log("");
                console.log("Transaction Successful!")
                console.log("User ordered " + quantity+ " units of " 
                + res[0].products_name + " @ $" + res[0].price + " each");
                var total= quantity * res[0].price;
                console.log("User Total: " + total);
                

                var updatedQuantity = res[0].stock_quantity - quantity;
                connection.query(
                  "UPDATE products SET stock_quantity =" + updatedQuantity + "WHERE item_id =?"
                  + res[0].item_id,
                  function(err, res){
                    if (err) throw err;
                    console.log('');
                    console.log("THANK YOU FOR SHOPPING. SEE YOU AGAIN SOON...");
                    console.log("");
                    connection.end();
                  }
                )
              }
            })

        }
      })
    })

}




visual();
purchase();





















































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
  