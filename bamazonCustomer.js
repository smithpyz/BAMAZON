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

function promptShop() {
  connection.query("SELECT * FROM productsDB", function(err, results) {
    if (err) throw err;
    console.log("------------");
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_id);
            }
            return choiceArray;
          },
          message: "What is the item ID of the product you want to buy?",
        },
        {
          name: "choiceQuantity",
          type: "input",
          message: "how many are you buying?",
        }
      ])
      .then(function (answer) {
      //get database deets on chosen item 
        var ShoppingCart;
        for (var i = 0; i < resizeBy.length; i++) {
          if (results[i].item_ID === answer.choice) {
            ShoppingCart = results[i];
          }
        }
  
          //determine if chosen Item is in stock
          if (ShoppingCart.stock_quantity > parseInt(answer.choiceQuantity)) {
            //subtract from stock_quantity 
            connection.query(
              "UPDATE productsDB SET ? WHERE ?",
              [
                {
                  stock_quantity: stock_quantity - answer.choiceQuantity
                },
                {
                  item_ID: ShoppingCart.item_ID
                },
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