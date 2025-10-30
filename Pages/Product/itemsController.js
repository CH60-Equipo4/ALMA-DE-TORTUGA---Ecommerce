//clase para el controlador de items
class ItemsController {
    constructor(currentId = 0) {
        this.items = [];
        this.currentId = currentId;
    }

    //metodo para agregar nombre, descripcion, precio, la URL de la imagen , y cuando se creo el item
    addItem(name, description, price, imageURL, createdAt) {
        const item = {
            //Añadimos ID genericos empezando en 0
            id: this.currentId++,
            name: name,
            description: description,
            price: price,
            imageURL: imageURL,
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
itemsController.addItem("Perro", "Es un perro", 500, "../../Pictures/About-pics/man-avatar_5556468.png");
itemsController.addItem("Gato", "Es un gato", "", "../../Pictures/About-pics/woman_5556554.png");

console.log(itemsController.items);