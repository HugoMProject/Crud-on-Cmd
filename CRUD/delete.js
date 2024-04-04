const mysql = require('mysql2');
module.exports = function deleteOne(idProducto){
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
            connection.query(`DELETE FROM db_productos_libreria.productosdelbreria WHERE id = ${idProducto} ;`, (error, results, fields) => {
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