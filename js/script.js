// ==========================
// PRODUCTOS
// ==========================

const productos = [

    {
        nombre: "Luffy Gear 5",
        precio: 149900,
        categoria: "original",
        imagen: "img/luffy.jpg"
    },

    {
        nombre: "Gojo Satoru Resina",
        precio: 179900,
        categoria: "resina",
        imagen: "img/gojo.jpg"
    },

    {
        nombre: "Goku Ultra Instinto",
        precio: 199900,
        categoria: "replica",
        imagen: "img/goku.jpg"
    },

    {
        nombre: "Naruto Modo Sabio",
        precio: 159900,
        categoria: "original",
        imagen: "img/naruto.jpg"
    },

    {
        nombre: "Madara Uchiha",
        precio: 269900,
        categoria: "resina",
        imagen: "img/madara.jpg"
    },

    {
        nombre: "Vegeta Blue",
        precio: 169900,
        categoria: "replica",
        imagen: "img/vegeta.jpg"
    }

];

// ==========================
// GENERAR PRODUCTOS
// ==========================

const container =
document.getElementById(
    "productos-container"
);

if (container) {

    productos.forEach(producto => {

        container.innerHTML += `

        <article
            class="card"
            data-category="${producto.categoria}">

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
                    data-image="${producto.imagen}">

                    Añadir al carrito

                </button>

            </div>

        </article>

        `;

    });

}