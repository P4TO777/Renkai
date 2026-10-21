// ============================
// RENKAI STORE
// ============================

console.log("Renkai cargado correctamente");

// Animación de tarjetas

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
    card.style.transition = "0.6s";

    observer.observe(card);

});

// Botones Comprar

const botones = document.querySelectorAll(".card button");

botones.forEach(boton => {

    boton.addEventListener("click", () => {

        alert("Carrito de compras próximamente disponible.");

    });

});

// Año automático

const footer = document.querySelector("footer p");

if (footer) {

    footer.innerHTML =
        `© ${new Date().getFullYear()} Renkai Store. Todos los derechos reservados.`;
}

// ============================
// FILTRO CATALOGO
// ============================

const buscador = document.getElementById("searchInput");
const filtro = document.getElementById("categoryFilter");

if (buscador && filtro) {

    function filtrarProductos() {

        const texto = buscador.value.toLowerCase();
        const categoria = filtro.value;

        document.querySelectorAll(".card").forEach(card => {

            const nombre = card
                .querySelector("h3")
                .textContent
                .toLowerCase();

            const tipo = card.dataset.category;

            const coincideTexto =
                nombre.includes(texto);

            const coincideCategoria =
                categoria === "todas" ||
                tipo === categoria;

            if (coincideTexto && coincideCategoria) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    }

    buscador.addEventListener("keyup", filtrarProductos);

    filtro.addEventListener("change", filtrarProductos);

}