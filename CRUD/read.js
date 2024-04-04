const mysql = require('mysql2');
module.exports = function read(){
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
}