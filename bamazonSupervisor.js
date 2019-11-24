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
    console.log("B A M A Z O N __  S U P E R V I S O R __ P O R T A L");
    console.log("*****************************************************************");
    console.log("");
    console.log("              B-S-P DASHBOARD");
    console.log("");




    inquirer            // Inquirer package used to enable user interaction and input in CLI
        .prompt({
            name: "supervisorOptions",     // name to reference from response in .then portion of prompt
            type: "list",           // list type only allows user to chose from preset options set up below in choices portion of prompt
            message: " What action would you like to perform?\n",   // question that user will be asked
            choices: ["View Products Sales By Department",             // choices allows set list from which user can choose on screen
                "Create New Department",
                "EXIT\n\n"]
        })
        .then(function (answer) {      
            // based on their answer from above, a different function is called to fulfill request
            if (answer.managerOptions === "View Products Sales By Department") {       // if user chose the view products for sale option...
                viewDeptSales();             // function lets user view products for sale
            }
            else if (answer.managerOptions === "Create New Department") {
                createNewDept();             // function lets user view items with low inventory
            } else {
                connection.end();           // connection is ended here if user chooses exit option
            }
        });
}

// *********************************E N D _ _ O F _ _ M A I N _ _ M E N U _ _ F U N C T I O N ***********************************************
