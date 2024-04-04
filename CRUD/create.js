const mysql = require('mysql2');
module.exports = function create(idProducto,nombreProducto,descripcionProducto,precioProducto,stock){


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
                connection.query(`insert db_productos_libreria.productosdelbreria value(${Number(idProducto)},${nombreProducto},${descripcionProducto},${Number(precioProducto)},${stock})`, (error, results, fields) => {
                    if (error) {
                        throw error
                    } else {
                        return console.log(results);
                    }

                })

            }
            connection.end();
        });
    };

