const fs = require('fs');


class ProductManager {
    constructor() {
        this.getProducts = [];
    }
    async addPtoducts(title, description, price, thumbnail, stock = 25) {

      try{
       const producto ={
        id: this.#getMaxId() + 1,
        title,
        description,
        price,
        thumbnail,
        code: [],
        stock,
    };
    if(fs.existsSync('producto.json')){
      const producto = JSON.parse(await fs.promises.readFile('Producto.json','utf8'));
      this.getProducts = producto
      this.getProducts.push(producto);
    } else{
      this.getProducts.push(producto); 
    }
      fs.promises.writeFile('Producto.json',JSON.stringify(this.getProducts))
    }catch (error) {
      console.log(error)
      throw new Error(error)
    }
}
    getProductById(idProducto, idNCode) {
    const producto = this.#getProducts(idProducto);
    if (producto) {
      if (!producto.code.includes(idNCode)) producto.code.push(idNCode);
      console.log(this.getProducts);
    } else {
      console.log("El producto no existe");
    }
    }
  
#getMaxId() {
    let maxId = 0;
    this.getProducts.map((producto) => {
      if (producto.id > maxId) maxId = producto.id;
    });
    return maxId;
  }

  #getProducts(idProducto) {
    return this.getProducts.find((producto) => producto.id === idProducto);
  }  

}

const productManager = new ProductManager();

productManager.addPtoducts("Mesa de comedor", "mesa de madera", 1400, "Sin imagen", 25);
productManager.addPtoducts("Escritorio", "Producto de caoba", 2000, "Sin imagen", 30);