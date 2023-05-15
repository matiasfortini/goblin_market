

class Producto {
  constructor(id, categoria, diseño, color, precio, stock) {
    this.id = id;
    this.categoria = categoria;
    this.diseño = diseño;
    this.color = color;
    this.precio = parseFloat(precio);
    this.stock = stock;
  }
}

let idProducto = localStorage.getItem('idProducto') || 1;
let productos = JSON.parse(localStorage.getItem('productos')) || [];

const mostrarProductos = () => {
    const contenedorProductos = document.querySelector("#contenedorProductos");
    contenedorProductos.innerHTML = "";
  
    productos.forEach((producto) => {
      const tarjetaProducto = document.createElement("div");
      tarjetaProducto.className = "tarjeta";
      tarjetaProducto.innerHTML = `
        <div class="datos">
            <p>ID: ${producto.id}</p>
            <p>Categoría: ${producto.categoria}</p>
            <p>Diseño: ${producto.diseño}</p>
            <p>Color: ${producto.color}</p>
            <p>Precio: $${producto.precio}</p>
            <p>Stock: ${producto.stock}</p>
        </div>
        <div class="botones">
            <button class="editar" data-id="${producto.id}">Editar</button>
            <button class="eliminar" data-id="${producto.id}">Eliminar</button>
        </div>
      `;
  
      const btnEliminar = tarjetaProducto.querySelector(".eliminar");
      btnEliminar.addEventListener("click", (e) => {
        const idProductoEliminar = parseInt(e.target.getAttribute("data-id"));
        eliminarProducto(idProductoEliminar);
      });
  
      const btnEditar = tarjetaProducto.querySelector(".editar");
      btnEditar.addEventListener("click", () => {
        abrirModalEditar(producto);
      });
  
      contenedorProductos.append(tarjetaProducto);
    });
};  

const crearProducto = () => {
  const formularioCrear = document.querySelector('#crearProducto');
  formularioCrear.addEventListener('submit', (e) => {
    e.preventDefault();
    const datos = e.target.children;
    const producto = new Producto(
      idProducto,
      datos['categoria'].value,
      datos['diseño'].value,
      datos['color'].value,
      datos['precio'].value,
      datos['stock'].value
    );
    productos.push(producto);
    localStorage.setItem('productos', JSON.stringify(productos));
    formularioCrear.reset();
    idProducto++;
    localStorage.setItem('idProducto', idProducto);
    mostrarProductos()
  });
};

const abrirModalEditar = (producto) => {
    const modal = document.querySelector("#modal");
    modal.style.display = "block";
    
    const form = document.querySelector("#editarProducto");
    const idProductoEditar = document.querySelector("#idProductoEditar");
    const categoriaEditar = document.querySelector("#categoriaEditar");
    const diseñoEditar = document.querySelector("#diseñoEditar");
    const colorEditar = document.querySelector("#colorEditar");
    const precioEditar = document.querySelector("#precioEditar");
    const stockEditar = document.querySelector("#stockEditar");

    idProductoEditar.value = producto.id;
    categoriaEditar.value = producto.categoria;
    diseñoEditar.value = producto.diseño;
    colorEditar.value = producto.color;
    precioEditar.value = producto.precio;
    stockEditar.value = producto.stock;
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const datos = e.target.elements;
        const idProducto = parseInt(datos["idProducto"].value);
        const categoria = datos["categoria"].value;
        const diseño = datos["diseño"].value;
        const color = datos["color"].value;
        const precio = parseFloat(datos["precio"].value);
        const stock = parseInt(datos["stock"].value);
        editarProducto(idProducto, categoria, diseño, color, precio, stock);
        modal.style.display = "none";
    });
  
    const editarProducto = (idProducto, categoria, diseño, color, precio, stock) => {
    productos = productos.map((producto) => {
      if (producto.id === idProducto) {
        return new Producto(idProducto, categoria, diseño, color, precio, stock);
      } else {
        return producto;
      }
    });

    const btnCerrarModal = document.querySelector('#cerrarModal');
    btnCerrarModal.addEventListener('click', () => {
        const modal = document.querySelector("#modal");
        modal.style.display = "none";
    });
    localStorage.setItem("productos", JSON.stringify(productos));
    mostrarProductos();
    };
};     

const eliminarProducto = (idProducto) => {
    productos = productos.filter((producto) => producto.id !== idProducto);
    localStorage.setItem("productos", JSON.stringify(productos));
    mostrarProductos();
};

mostrarProductos()
crearProducto();