var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw new err;
    console.log("Connected as ID:", connection.threadId)
    // run the start function after the connection is made to prompt the user
    showProducts();
    // buyerPrompt();
  });



function showProducts(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw new err;
        console.log(res);
        connection.end();
    });

}

function buyerPrompt(){
    inquirer
        .prompt([
            {
                name: "item_id",
                type: "rawlist",
                message: "What is the ID of the product you would like to purchase?",
                choices: function(){
                  var choiceArray = [];
                  for (var i=0; i<results.length; i++){
                    choiceArray.push(results[i].item_id);
                  }
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "How many units would you like to purchase?",
               
            }

        ])
}
  