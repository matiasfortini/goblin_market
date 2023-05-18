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
                                            <button class="edit" data-id="${product.id}"><i class="fa-solid fa-pen-to-square"></i></button>
                                            <button class="delete" data-id="${product.id}"><i class="fa-solid fa-trash-can"></i></button>
                                        </div>           
                                        `

            const editButton = productSlot.querySelector(".edit");
            editButton.addEventListener("click", () => {
                editProduct(product.id);
            });
            
            const deleteButton = productSlot.querySelector(".delete");
            deleteButton.addEventListener("click", () => {
                deleteProduct(product.id);
            });

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

    const editProduct = (productId) => {
        const modal = document.querySelector(".containerModal");
        modal.style.display = "block";
    
        const product = products.find((p) => p.id === productId);
    
        const form = document.querySelector(".containerModal form");
        const productNameInput = form.elements["productName"];
        const productBrandSelect = form.elements["productBrand"];
        const productTypeSelect = form.elements["productType"];
        const productPriceInput = form.elements["productPrice"];
        const productStockInput = form.elements["productStock"];
        const productImgInput = form.elements["productImg"];
    
        productNameInput.value = product.name;
        productBrandSelect.value = product.brand;
        productTypeSelect.value = product.type;
        productPriceInput.value = product.price;
        productStockInput.value = product.stock;
        productImgInput.value = product.img;
    
        form.addEventListener("submit", (e) => {
            e.preventDefault();
    
            const newProductName = productNameInput.value;
            const newProductBrand = productBrandSelect.value;
            const newProductType = productTypeSelect.value;
            const newProductPrice = productPriceInput.value;
            const newProductStock = productStockInput.value;
            const newProductImg = productImgInput.value;
    
            product.name = newProductName;
            product.brand = newProductBrand;
            product.type = newProductType;
            product.price = parseFloat(newProductPrice);
            product.stock = newProductStock;
            product.img = newProductImg;
    
            localStorage.setItem("products", JSON.stringify(products));
    
            modal.style.display = "none";
    
            viewProducts();
        });
    
        const closeModalButton = document.querySelector(".closeModalBtn");
        closeModalButton.addEventListener("click", () => {
            modal.style.display = "none";
        });
    };  

    const deleteProduct = (productId) => {
        products = products.filter((product) => product.id !== productId);
        localStorage.setItem('products', JSON.stringify(products));
        viewProducts();
    };
    
    viewProducts()
    createProduct();
  
  