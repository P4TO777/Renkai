// ==========================
// RENKAI STORE
// ==========================

console.log("Renkai cargado correctamente");

// ==========================
// ANIMACIONES
// ==========================

const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

});

cards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "0.6s ease";

    observer.observe(card);

});

// ==========================
// CARRITO
// ==========================

let cart =
    JSON.parse(
        localStorage.getItem("renkaiCart")
    ) || [];

const cartContainer =
    document.getElementById("cart-items");

const totalContainer =
    document.getElementById("cart-total");

const cartCount =
    document.getElementById("cart-count");

// ==========================
// GUARDAR CARRITO
// ==========================

function saveCart() {

    localStorage.setItem(
        "renkaiCart",
        JSON.stringify(cart)
    );

}

// ==========================
// ACTUALIZAR CARRITO
// ==========================

function updateCart() {

    if (!cartContainer) {

        if (cartCount) {
            cartCount.textContent = cart.length;
        }

        return;
    }

    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price;

        cartContainer.innerHTML += `

        <div class="cart-item">

            <div class="cart-product">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="cart-image">

                <div>

                    <h4>${item.name}</h4>

                    <p>
                        $${item.price.toLocaleString()} COP
                    </p>

                </div>

            </div>

            <button onclick="removeItem(${index})">
                Eliminar
            </button>

        </div>

        `;

    });

    if (totalContainer) {

        totalContainer.innerHTML =
            `Total: $${total.toLocaleString()} COP`;

    }

    if (cartCount) {

        cartCount.textContent =
            cart.length;

    }

}

// ==========================
// AGREGAR PRODUCTOS
// ==========================

document
.querySelectorAll(".add-to-cart")
.forEach(button => {

    button.addEventListener("click", () => {

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

// ==========================
// ELIMINAR PRODUCTO
// ==========================

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    updateCart();

}

window.removeItem = removeItem;

// ==========================
// VACIAR CARRITO
// ==========================

const clearButton =
    document.getElementById("clear-cart");

if (clearButton) {

    clearButton.addEventListener(
        "click",
        () => {

            cart = [];

            saveCart();

            updateCart();

        }
    );

}

// ==========================
// FILTROS
// ==========================

const buscador =
    document.getElementById("searchInput");

const filtro =
    document.getElementById("categoryFilter");

if (buscador && filtro) {

    function filtrarProductos() {

        const texto =
            buscador.value.toLowerCase();

        const categoria =
            filtro.value;

        document
            .querySelectorAll(".card")
            .forEach(card => {

                const nombre =
                    card
                        .querySelector("h3")
                        .textContent
                        .toLowerCase();

                const tipo =
                    card.dataset.category;

                const coincideTexto =
                    nombre.includes(texto);

                const coincideCategoria =
                    categoria === "todas" ||
                    tipo === categoria;

                card.style.display =
                    coincideTexto &&
                    coincideCategoria
                        ? "block"
                        : "none";

            });

    }

    buscador.addEventListener(
        "keyup",
        filtrarProductos
    );

    filtro.addEventListener(
        "change",
        filtrarProductos
    );

}

// ==========================
// FOOTER AUTOMÁTICO
// ==========================

const footer =
    document.querySelector("footer p");

if (footer) {

    footer.innerHTML =
        `© ${new Date().getFullYear()} Renkai Store. Todos los derechos reservados.`;

}

// ==========================
// INICIALIZAR
// ==========================

updateCart();