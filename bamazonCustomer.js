var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  start();
});

function start() {
  connection.query("SELECT * FROM productsDB", function (err, results) {
        if (err) throw err;
        inquirer
          .prompt([{
              name: "choice",
              type: "list",
              choices: function () {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                  choiceArray.push(results[i].item_ID);
                }
                return choiceArray;
              },
              message: "What is the item ID of the products you want to purchase?"
            },
            {
              name: "qtyChosen",
              type: "input",
              message: "How many do you want to buy?"
            }
          ])
          .then(function (answer) {
              // get the information of the chosen item
              var chosenItem;
              for (var i = 0; i < results.length; i++) {
                if (results[i].item_ID === answer.choice) {
                  chosenItem = results[i];
                }
              }

              //determine if chosen Item is in stock
            if (chosenItem.stock_quantity > parseInt(answer.qtyChosen)) {
              //subtract from stock_quantity 
              connection.query(
                "UPDATE productsDB SET ? WHERE ?", [{
                  stock_quantity: stock_quantity - answer.qtyChosen
                },
                {
                  item_ID: chosenItem.item_ID
                }
                ],
                function (error) {
                  if (error) throw err;
                  console.log("TRANSACTION COMPLETE!")
                  start();
                }
              );
            } else {
              console.log("sorry we don't have enough in stock.");
              start();
         }
         });
         });
         }