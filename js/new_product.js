class Product {
    constructor(id, productName, productBrand, productType, productPrice, productStock, productImg) {
        this.id = id;
        this.name = productName;
        this.brand = productBrand;
        this.type = productType;
        this.price = parseFloat(productPrice);
        this.stock = productStock;
        this.img = productImg;
    }
}
  
let idProduct = localStorage.getItem('idProduct') || 1;
let products = JSON.parse(localStorage.getItem('products')) || [];



const viewProducts = () => {
    const productList = document.querySelector("#productList");
    productList.innerHTML = "";
  
    products.forEach((product) => {
        const productSlot = document.createElement("div");
        productSlot.className = "prodItem";
            productSlot.innerHTML = `
                                    <div class="idSlot">
                                        <p>${product.id}</p>
                                    </div>
                                    <div class="nameSlot">
                                        <p>${product.name}</p>
                                    </div>
                                    <div class="brandSlot">
                                        <p>${product.brand}</p>
                                    </div>
                                    <div class="typeSlot">
                                        <p>${product.type}</p>
                                    </div>                                    
                                    <div class="priceSlot">
                                        <p>$${product.price}</p>
                                    </div>
                                    <div class="stockSlot">
                                        <p>${product.stock}</p>
                                    </div>  
                                    <div class="imgSlot">
                                        <button class="copyLinkBtn" data-link="${product.img}">Link</button>
                                    </div>
                                    <div class="btnSlot">
                                        <button class="editar" data-id="${product.id}"><i class="fa-solid fa-pen-to-square"></i></button>
                                        <button class="eliminar" data-id="${product.id}"><i class="fa-solid fa-trash-can"></i></button>
                                    </div>           
                                    `

        const copyLinkBtn = productSlot.querySelectorAll('.copyLinkBtn');
            copyLinkBtn.forEach((btn) => {
                btn.addEventListener('click', () => {
                    const link = btn.getAttribute('data-link');
                    navigator.clipboard.writeText(link).then(() => {
                        alert('¡Enlace copiado al portapapeles!');
                    }).catch((error) => {
                        console.error('Error al copiar el enlace:', error);
                    });
                });
            });

        productList.append(productSlot);
    });
};
  
const createProduct = () => {
    const createForm = document.querySelector('#newProduct');
    createForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = e.target.elements;
        const product = new Product(
            idProduct,
            data['productName'].value,
            data['productBrand'].selectedOptions[0].value,
            data['productType'].selectedOptions[0].value,
            data['productPrice'].value,
            data['productStock'].value,
            data['productImg'].value
        );
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        createForm.reset();
        idProduct++;
        localStorage.setItem('idProduct', idProduct);
        viewProducts()
    });
};
  
viewProducts()
createProduct();
  
  