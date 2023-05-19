const productsData = localStorage.getItem('products');
const productsArray = productsData ? JSON.parse(productsData) : [];

console.log(productsArray);

const viewProductsShop = () => {
    const productsShop = document.querySelector("#productsShop");
    productsShop.innerHTML = "";

    productsArray.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "productCard";
        productCard.innerHTML = `
                                <div class="imgProduct">
                                    <a href="#">
                                        <img src="${product.img}" alt="${product.brand} ${product.type} ${product.name}">
                                    </a>
                                </div>
                                <div class="infoProduct">
                                    <a href="#"><h2>${product.name}</h2></a>
                                    <p>$${product.price}</p>
                                </div>

            
        `;

        productsShop.append(productCard);
    });
};



viewProductsShop();


/*<div class="imgProduct">
                <a href="#"><img src="#" alt="${product.brand} ${product.type} ${product.name}"></a>
            </div>
            <div class="infoProduct">
                <a href="#"><h2>${product.name}</h2></a>
                <p>$${product.price}</p>
            </div>*/