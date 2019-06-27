var mysql = require("mysql");
var inquirer = require("inquirer");

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
        console.log(res);

        inquirer.prompt({
            input: "input",
            message: "What is the ID of the item you would like to purchase?",
            name: "id"
        })
        .then((userIn) => {
            console.log(res[parseInt(userIn.id) - 1]);
        })

        connection.end();
    });
}
