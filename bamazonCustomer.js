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

visual();





















































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
  