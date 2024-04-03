
const inquirer = require('inquirer');
const mysql = require('mysql2');
// metodo para dar las prenguntas en la consola
inquirer.prompt([{
    type: "list",
    name: "tarea",
    message: "Que tarea desea realizar?",
    choices: ["read", "create", "update", "delete"]
}]).then(answers => {
    console.log('answers: ', answers);
    if (answers.tarea == "read") {
        const connection = mysql.createConnection({
            host: 'localhost',
            database: 'db_productos_libreria',
            user: 'root',
            password: 'root'
        });
        //-------------------READ*****************devolver todos los registros de la tabla productosdelibreria*******************
        connection.connect((error) => {
            if (error) {
                throw error;
            } else {
                console.log("Conexion exitosa!!!!!");
                connection.query('select * from db_productos_libreria.productosdelbreria', (error, results, fields) => {
                    if (error) {
                        throw error
                    } else {
                        return console.log(results);
                    }

                })

            }
            connection.end();
        });
    } else if (answers.tarea == "create") {
        /******** *******metodo para crear un nuevo registro en la base de datos ***************************************************/
        inquirer.prompt([{
            name: "idProducto",
            message: "Que producto desea crear, Escriba el id del producto?",
        }, {
            name: "nombreProducto",
            message: `Nombre del producto?, Escribirlo entre comillas " "`,
        }, {
            name: "descripcionProducto",
            message: `Descripcion del producto?, Escribirlo entre comillas " " `,
            default: `none`,
        }, {
            name: "precioProducto",
            message: "Precio del producto?",
        }, {
            name: "stockProducto",
            message: "Stock del producto( True o false )?",
        }]).then(answers => {
            console.log("producto: ", answers,);
            const connection = mysql.createConnection({
                host: 'localhost',
                database: 'db_productos_libreria',
                user: 'root',
                password: 'root'
            });

            connection.connect((error) => {
                if (error) {
                    throw error;
                } else {
                    console.log("Conexion exitosa!!!!!");
                    connection.query(`insert db_productos_libreria.productosdelbreria value(${Number(answers.idProducto)},${answers.nombreProducto},${answers.descripcionProducto},${Number(answers.precioProducto)},${false})`, (error, results, fields) => {
                        if (error) {
                            throw error
                        } else {
                            return console.log(results);
                        }

                    })

                }
                connection.end();
            });
        });
    } else if (answers.tarea == "update") {
        /********************Metodo para editar un registro de la base de datos******************************************* */
        inquirer.prompt([{
            name: "idProducto",
            message: "Que producto desea editar, Escriba el id del producto?",
        }, {
            name: "nombreProducto",
            message: "Nombre del producto?",
        }, {
            name: "descripcionProducto",
            message: "Descripcion del producto?",
        }, {
            name: "precioProducto",
            message: "Precio del producto?",
        }, {
            name: "stockProducto",
            message: "Stock del producto( True o false )?",
        }]).then(answers => {
            console.log("producto: ", answers,);
            const connection = mysql.createConnection({
                host: 'localhost',
                database: 'db_productos_libreria',
                user: 'root',
                password: 'root'
            });

            connection.connect((error) => {
                if (error) {
                    throw error;
                } else {
                    console.log("Conexion exitosa!!!!!");
                    connection.query(`UPDATE db_productos_libreria.productosdelbreria SET producto=${answers.nombreProducto} ,descripcion =${answers.descripcionProducto},precio=${Number(answers.precioProducto)},stock = ${false} WHERE id = ${Number(answers.idProducto)};`, (error, results, fields) => {
                        if (error) {
                            throw error
                        } else {
                            return console.log(results);
                        }
                    })
                }
                connection.end();
            });
        });
    } else if (answers.tarea == "delete") {
        /****************************Metodo para eliminar un Registro de la base de datos *****************************************/
        inquirer.prompt([{
            name: "idProducto",
            message: "Que producto desea eliminar, Escriba el id del producto?",
        }, {
            name: "confirmar",
            message: "Esta de acuerdo que desea eliminar ese producto ( si/No  )",
            default: "no"
        }]).then(answers => {
            console.log("producto: ", answers,);
            if (answers.confirmar.toLowerCase() == "si".toLowerCase()) {
                const connection = mysql.createConnection({
                    host: 'localhost',
                    database: 'db_productos_libreria',
                    user: 'root',
                    password: 'root'
                });

                connection.connect((error) => {
                    if (error) {
                        throw error;
                    } else {
                        console.log("Conexion exitosa!!!!!");
                        connection.query(`DELETE FROM db_productos_libreria.productosdelbreria WHERE id = ${answers.idProducto} ;`, (error, results, fields) => {
                            if (error) {
                                throw error
                            } else {
                                return console.log(results);
                            }

                        })

                    }
                    connection.end();
                });

                console.log("El producto se ha eliminado con exito");
            }

        }).catch((error) => { console.log(error.isTtyError) });
    }
}).catch((error) => {
    if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
    } else {
        // Something else went wrong
    }
});




