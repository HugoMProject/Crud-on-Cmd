const mysql = require('mysql2');
module.exports = function update(idProducto,nombreProducto,descripcionProducto,precioProducto,stock){
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
            connection.query(`UPDATE db_productos_libreria.productosdelbreria SET producto=${nombreProducto} ,descripcion =${descripcionProducto},precio=${Number(precioProducto)},stock = ${false} WHERE id = ${Number(idProducto)};`, (error, results, fields) => {
                if (error) {
                    throw error
                } else {
                    return console.log(results);
                }
            })
        }
        connection.end();
    });
}