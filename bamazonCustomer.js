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
        type: "list",
        name: "selectID",
        message: "What is the item ID of the product you want to buy?",
        choices: [
          "1,'cheetah_on_stick','fishing rod toys',10.99,23",
          "2,'feather on stick','fishing_rod_toys',0.99,2",
          "3,'froggie','plush toys',45.99,14",
          "4,'cat_fortune_cookie','plush toys',12.50,76",
          "5,'disney_princess_ mouse','plush toys',0.01,11",
          "6,'wobbling_lobstah','plush toys',5.69,33",
          "7,'KONG for cat','training toys',6.99,4",
          "8,'cat_harness','training toys',56.76,7",
          "9,'cat gogurt','treats',3.49,56",
          "10,'cat_twizzler','treats',3.12,1",
          "11,'kitten_health_nibs','treats',5.43,24",
          "12,'alisons_shoes','treats',100.01,1"
        ]
      }, {
        type: "rawlist",
        name: "qtyChosen",
        message: "how many do you want to buy?"
      }])
      .then(function (answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (answer.choices === results[i]) {
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