// Elementos del DOM
const toggleCarritoBtn = document.getElementById("carrito-flotante");
const carritoDesplegable = document.getElementById("carrito-desplegable");
const listaCarrito = document.getElementById("articulo-carrito");
const totalCarrito = document.getElementById("total-carrito");
const contadorCarrito = document.getElementById("contador-carrito");

const selectorProducto = document.getElementById("seleccion-producto");
const checkboxExtras = document.querySelectorAll(".checkbox-extra");
const btnAgregar = document.getElementById("agregar-producto");

let carrito = [];

// Mostrar/ocultar carrito hacia arriba
toggleCarritoBtn.addEventListener("click", () => {
    carritoDesplegable.classList.toggle("show");
});

// Agregar producto al carrito
btnAgregar.addEventListener("click", () => {
    const opcion = selectorProducto.value;
    if (!opcion) { alert("Seleccione un producto"); return; }

    const [nombre, precio] = opcion.split(":");
    let totalExtra = 0;
    let extrasSeleccionados = [];

    checkboxExtras.forEach(cb => {
        if (cb.checked) {
            const [extraNombre, extraPrecio] = cb.value.split(":");
            extrasSeleccionados.push(extraNombre);
            totalExtra += parseFloat(extraPrecio);
        }
    });

    carrito.push({
        nombre,
        precio: parseFloat(precio) + totalExtra,
        extras: extrasSeleccionados
    });

    actualizarCarrito();
    selectorProducto.value = "";
    checkboxExtras.forEach(cb => cb.checked = false);
});

// Actualizar lista y total
function actualizarCarrito() {
    listaCarrito.innerHTML = "";

    carrito.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre}${item.extras.length ? ` (+${item.extras.join(", ")})` : ""} - ${item.precio}€`;

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "X";
        btnEliminar.addEventListener("click", () => {
            carrito.splice(index, 1);
            actualizarCarrito();
        });

        li.appendChild(btnEliminar);
        listaCarrito.appendChild(li);
    });

    const total = carrito.reduce((sum, item) => sum + item.precio, 0);
    totalCarrito.textContent = `Total: ${total}€`;

    // Badge rojo con cantidad de productos
    contadorCarrito.textContent = carrito.length;
}
