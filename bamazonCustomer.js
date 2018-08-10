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
  database: "bamazon"
})

function start() {
  connection.query("SELECT * FROM productsDB", function (err, res) {
    if (err) throw err;
    console.log("Welcome to ALison's Bamazon Store!")

    for (var i = 0; i < res.length; i++) {
      console.log(
        "ID: " + res[i].item_id + "|" +
        "Item: " + res[i].product_name + "|" +
        "Department: " + res[i].department_name + "|" +
        "Price: " + res[i].price + "|" +
        "Available Quantity: " + res[i].stock_quantity + "|");
      console.log("________________________________________________________________")
    }
    console.log("");
    inquirer.prompt([{
        type: "input",
        name: "id",
        message: "Please enter the ID of the product you desire!",
        validate: function (value) {
          if (isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0) {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        type: "input",
        name: "qty",
        message: "How many of these babies are you looking to buy?",
        validate: function (value) {
          if (isNaN(value)) {
            return false;
          } else {
            return true;
          }
        }
      }

    ]).then(function (answer) {
      var item2Buy = (answer.id) - 1;
      var qty2Buy = parseInt(answer.qty);
      var totalCart2Buy = parseFloat(((res[item2Buy].price) * qty2Buy).toFixed(2));

      if (res[item2Buy].stock_quantity >= qty2Buy) {
        connection.query("UPDATE productsDB SET ? WHERE ?", [{
              stock_quantity: (res[item2Buy].stock_quantity - qty2Buy)
            },
            {
              item_id: answer.id
            }
          ],
          function (err, result) {
            if (err) throw err;
            console.log("Thank you for your Order! You will be charged $" + totalCart2Buy.toExponential(2) + " and should receive your precious items next week!");
          });
        connection.query("SELECT * FROM productsDB", function (err, resDept) {
          if (err) throw err;
          for (var i = 0; i < resDept.length; i++) {
            if (resDept[i].department_name === res[item2Buy].department_name) {
              index = i;
            }
          }

          connection.query("UPDATE productsDB SET ? WHER ?", [{
              netSales: resDept[index].netSales + totalCart2Buy
            },
            {
              department_name: res[item2Buy].department_name
            }
          ], function (err, resDept) {
            if (err) throw err;
          });
        });
      } else {
        console.log("BAD NEWS --- Your items are out of stock :(");
      }
      prompt2();
    })
  })
}

function prompt2() {
  inquirer.prompt([{
    type: "confirm",
    name: "reply",
    message: "Do you want to browse the store again? We have the best stuff in town, let me tell you!"
  }]).then(function (answer) {
    if (answer.reply) {
      start();
    } else {
      console.log("You're missing out! Come again soon.");
    }
  });
}