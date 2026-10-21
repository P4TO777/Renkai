// ===================================
// RENKAI
// ===================================

const container =
document.getElementById(
    "productos-container"
);

const productosPorPagina = 12;

let paginaActual = 1;

let cart =
JSON.parse(
localStorage.getItem(
"renkaiCart"
)) || [];

let productosFiltrados =
[...productos];

// ===================================
// RENDER PRODUCTOS
// ===================================

function renderizarProductos() {

    if (!container) return;

    container.innerHTML = "";

    const inicio =
        (paginaActual - 1)
        * productosPorPagina;

    const fin =
        inicio +
        productosPorPagina;

    const pagina =
        productosFiltrados.slice(
            inicio,
            fin
        );

    pagina.forEach(producto => {

        container.innerHTML += `

        <div
            class="card"
            onclick="window.location.href='producto.html?id=${producto.id}'">

            <img
                src="${producto.imagen}"
                alt="${producto.nombre}">

            <div class="card-content">

                <h3>

                    ${producto.nombre}

                </h3>

                <p>

                    ${producto.categoria}

                </p>

                <span class="price">

                    $${producto.precio.toLocaleString()} COP

                </span>

                <button
                    class="add-to-cart"

                    data-name="${producto.nombre}"

                    data-price="${producto.precio}"

                    data-image="${producto.imagen}"

                    onclick="event.stopPropagation()">

                    Añadir al carrito

                </button>

            </div>

        </div>

        `;

    });

    activarBotonesCarrito();

    actualizarPaginacion();

}

// ===================================
// PAGINACION
// ===================================

function actualizarPaginacion() {

    const totalPaginas =
    Math.ceil(
        productosFiltrados.length /
        productosPorPagina
    );

    const info =
    document.getElementById(
        "page-info"
    );

    if(info){

        info.textContent =
        `Página ${paginaActual} de ${totalPaginas}`;

    }

}

const previous =
document.getElementById(
"prev-page"
);

const next =
document.getElementById(
"next-page"
);

if(previous){

    previous.addEventListener(
    "click",
    ()=>{

        if(paginaActual > 1){

            paginaActual--;

            renderizarProductos();

        }

    });

}

if(next){

    next.addEventListener(
    "click",
    ()=>{

        const totalPaginas =
        Math.ceil(
        productosFiltrados.length /
        productosPorPagina
        );

        if(
            paginaActual <
            totalPaginas
        ){

            paginaActual++;

            renderizarProductos();

        }

    });

}

// ===================================
// FILTROS
// ===================================

const buscador =
document.getElementById(
"searchInput"
);

const filtro =
document.getElementById(
"categoryFilter"
);

function filtrarProductos(){

    const texto =
    buscador
    ? buscador.value
    .toLowerCase()
    : "";

    const categoria =
    filtro
    ? filtro.value
    : "todas";

    productosFiltrados =
    productos.filter(producto=>{

        const coincideTexto =
        producto.nombre
        .toLowerCase()
        .includes(texto);

        const coincideCategoria =

        categoria === "todas"

        ||

        producto.categoria
        === categoria;

        return (
            coincideTexto &&
            coincideCategoria
        );

    });

    paginaActual = 1;

    renderizarProductos();

}

if(buscador){

    buscador.addEventListener(
    "keyup",
    filtrarProductos
    );

}

if(filtro){

    filtro.addEventListener(
    "change",
    filtrarProductos
    );

}

// ===================================
// CARRITO
// ===================================

function saveCart(){

    localStorage.setItem(
        "renkaiCart",
        JSON.stringify(cart)
    );

}

function activarBotonesCarrito(){

    document
    .querySelectorAll(".add-to-cart")
    .forEach(button => {

        button.addEventListener(
        "click",
        ()=>{

            const item = {

                name:
                button.dataset.name,

                price:
                Number(
                button.dataset.price
                ),

                image:
                button.dataset.image

            };

            cart.push(item);

            saveCart();

            updateCart();

            alert(
            item.name +
            " añadido al carrito."
            );

        });

    });

}

function updateCart(){

    const cartItems =
    document.getElementById(
    "cart-items"
    );

    const total =
    document.getElementById(
    "cart-total"
    );

    const count =
    document.getElementById(
    "cart-count"
    );

    if(count){

        count.textContent =
        cart.length;

    }

    if(!cartItems) return;

    cartItems.innerHTML = "";

    let totalCompra = 0;

    cart.forEach(
    (item,index)=>{

        totalCompra += item.price;

        cartItems.innerHTML += `

        <div class="cart-item">

        <div class="cart-product">

            <img
            src="${item.image}"
            class="cart-image">

            <div>

                <h4>${item.name}</h4>

                <p>
                $${item.price.toLocaleString()} COP
                </p>

            </div>

        </div>

        <button
        onclick="removeItem(${index})">

        Eliminar

        </button>

        </div>

        `;

    });

    if(total){

        total.textContent =
        `Total: $${totalCompra.toLocaleString()} COP`;

    }

}

function removeItem(index){

    cart.splice(index,1);

    saveCart();

    updateCart();

}

window.removeItem =
removeItem;

const clearCart =
document.getElementById(
"clear-cart"
);

if(clearCart){

    clearCart.addEventListener(
    "click",
    ()=>{

        cart = [];

        saveCart();

        updateCart();

    });

}

// ===================================
// PAGINA PRODUCTO
// ===================================

const detalle =
document.getElementById(
"producto-detalle"
);

if(detalle){

    const parametros =
    new URLSearchParams(
    window.location.search
    );

    const id =
    parametros.get("id");

    const producto =
    productos.find(
    p => p.id === id
    );

    if(producto){

        detalle.innerHTML = `

        <div class="product-page">

            <img
            src="${producto.imagen}"
            alt="${producto.nombre}"
            class="product-big-image">

            <div>

                <h1>
                    ${producto.nombre}
                </h1>

                <p>
                    <strong>Anime:</strong>
                    ${producto.anime}
                </p>

                <p>
                    <strong>Categoría:</strong>
                    ${producto.categoria}
                </p>

                <p>
                    <strong>Altura:</strong>
                    ${producto.altura}
                </p>

                <p>
                    <strong>Material:</strong>
                    ${producto.material}
                </p>

                <p>
                    <strong>Fabricante:</strong>
                    ${producto.fabricante}
                </p>

                <p>
                    ${producto.descripcion}
                </p>

                <h2>
                    $${producto.precio.toLocaleString()} COP
                </h2>

                <button
                    class="btn add-to-cart"

                    data-name="${producto.nombre}"

                    data-price="${producto.precio}"

                    data-image="${producto.imagen}">

                    Añadir al carrito

                </button>

            </div>

        </div>

        `;

        activarBotonesCarrito();

    }

}

// ===================================

renderizarProductos();

updateCart();