//clase para el controlador de items
class ItemsController {
    constructor(currentId = 0) {
        this.items = [];
        this.currentId = currentId;
    }

    //metodo para agregar nombre, descripcion, precio, la URL de la imagen , y cuando se creo el item
    addItem(name, description, price, imageURL, category,  createdAt) {
        const item = {
            //Añadimos ID genericos empezando en 0
            id: this.currentId++,
            name: name,
            description: description,
            price: price,
            imageURL: imageURL,
            category: category,
            createdAt: createdAt || new Date().toLocaleDateString()
        }
        this.items.push(item);
    }
    //SI QUEREMOS LOCAL STORAGE
    // loadItemsFromLocalStorage() {
    //     const storageItems = localStorage.getItem("items");
    //     if (storageItems) {
    //         const items = JSON.parse(storageItems);

    //         for (const item of items) {
    //             this.addItem(item.name, item.description, item.imageURL, item.createdAt);
    //         }
    //     }
    // }
}

const itemsController = new ItemsController();

itemsController.addItem(
    "Squirtle Xmas",
    "Diseño completo de Squirtle version navideña\n Bordado a mano",
    949.99,
    "../../../Pictures/Products/Coleccion_Navidad/Squirtle_Xmas.png");

itemsController.addItem(
    "Arbol Navideño - Outline",
    "Diseño outline de arbol de navidad sencillo\n Estrella con bordado completo",
    449.99,
    "../../../Pictures/Products/Coleccion_Navidad/Xmas_outline.png");

itemsController.addItem(
    "Paloma de la Paz",
    "Paloma con diseño outline\n Corona navideña completa, bordado a mano",
    599.99,
    "../../../Pictures/Products/Coleccion_Navidad/Dove_Xmas.png");

itemsController.addItem(
    "Reno con Corona",
    "Diseño completo de reno con corona navideña\n Bordado a mano",
    599.99,
    "../../../Pictures/Products/Coleccion_Navidad/Dow_Xmas.png");

itemsController.addItem(
    "Cascanueces Completo",
    "Diseño completo de Cascanueces\n Bordado a mano",
    749.99,
    "../../../Pictures/Products/Coleccion_Navidad/Cascanueces_Nick.png");

itemsController.addItem(
    "Santa Claus",
    "Deseño completo de Santa Claus\n Bordado a mano",
    599.99,
    "../../../Pictures/Products/Coleccion_Navidad/Santa_Isabelle.png");

itemsController.addItem(
    "Merry Christmas",
    "Diseño especial gengibre con corona navideña\n Bordado a mano",
    949.99,
    "../../../Pictures/Products/Coleccion_Navidad/Merry_Xmas.png");

itemsController.addItem(
    "Muerdago - Outline",
    "Diseño de muerdago outline pequeño\n Bordado a mano",
    449.99,
    "../../../Pictures/Products/Coleccion_Navidad/muerdago.png");

itemsController.addItem(
    "Xmas - Town",
    "Diseño de villa navideña con detalles bordados\n Bordado a mano",
    1995.99,
    "../../../Pictures/Products/Coleccion_Navidad/SuperXmas.png");

itemsController.addItem(
    "Xmas - Mexa",
    "Mexico Navideño - diseño completo\n Bordado a mano",
    749.99,
    "../../../Pictures/Products/Coleccion_Navidad/Xmas_MX.png");

itemsController.addItem(
    "Corona - Nombre",
    "Corona completa con nombre\n Bordado a mano",
    749.99,
    "../../../Pictures/Products/PersonName/Muerdago.png");


itemsController.addItem(
    "Xmas - Tree",
    "Arbolito Navideño con nombre\n Bordado a mano",
    749.99,
    "../../../Pictures/Products/PersonName/XmasTree.png");



console.log(itemsController.items);