var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table2');



var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});

function start() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var table = new Table({
            head: ['Item_ID', 'Name', 'Department', 'Price', 'Stock']
            , style: {
                head: []    //disable colors in header cells
                , border: []  //disable colors for the border
            }
        });

        for (let i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }

        console.log("\n" + table.toString() + "\n");

        inquirer.prompt({
            input: "input",
            message: "What is the ID of the item you would like to purchase?",
            name: "id"
        })
            .then((userIn) => {
                if ((parseInt(userIn.id)) <= 10 && (parseInt(userIn.id)) >= 1) {
                    console.log(res[parseInt(userIn.id) - 1]);
                    buyItem(res[parseInt(userIn.id) - 1]);
                } else {
                    console.log("\nPlease enter a valid id...");
                    start();
                }
            });
    });
}

function buyItem(item) {
    inquirer.prompt({
        input: "input",
        message: "How many would you like?",
        name: "quantity"
    })
        .then((userIn) => {
            if ((item.stock_quantity - parseInt(userIn.quantity)) >= 0) {
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: item.stock_quantity - parseInt(userIn.quantity)
                        },
                        {
                            item_id: item.item_id
                        }
                    ],
                );
            } else {
                console.log("\nInsufficient Stock, Sorry...");
            }
            start();
        });
}


