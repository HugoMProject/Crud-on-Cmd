
const inquirer = require('inquirer');
const Crud_read = require('./CRUD/read');
const Crud_create = require('./CRUD/create');
const Crud_update = require('./CRUD/update');
const Crud_delete = require('./CRUD/delete'); 
// metodo para dar las prenguntas en la consola
inquirer.prompt([{
    type: "list",
    name: "tarea",
    message: "Que tarea desea realizar?",
    choices: ["read", "create", "update", "delete"]
}]).then(answers => {
    console.log('answers: ', answers);
    if (answers.tarea == "read") {
        Crud_read();
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
            Crud_create(Number(answers.idProducto),answers.nombreProducto,answers.descripcionProducto,Number(answers.precioProducto),false)
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
            Crud_update(Number(answers.idProducto),answers.nombreProducto,answers.descripcionProducto,Number(answers.precioProducto),false)
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
               Crud_delete(answers.idProducto);
                console.log("El producto se ha eliminado con exito");
            }

        }).catch((error) => { console.log(error.isTtyError) });
    }
}).catch((error) => {
    if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
        console.log("Message: Prompt couldn't be rendered in the current environment");
    } else {
        console.log("Message: Error 504, couldn't be conected with the server");
        // Something else went wrong
    }
});




