var miBoton = document.getElementById("enviar");
var miForm = document.querySelector("#formulario");

miBoton.addEventListener("click", (evento) => {
    evento.preventDefault();
    valido = validar(); 
    if(valido==true){
        miForm.submit(); 
    }
    
}) 

function validar(){
    let nombre = document.getElementById("nombre").value; //con value recogemos lo que escriben.
    let apellido = document.getElementById("apellido").value;
    let telefono = document.getElementById("telefono").value;
    let email = document.getElementById("email").value;
    let privacidad = document.getElementById("privacidad");



    if(nombre== null || nombre == ""){
        alert("Escriba su nombre por favor.");
        return false; 
    }
    let name_re =/^[a-zA-Z]{2,30}$/; 
    if(!name_re.exec(nombre)){
        alert("Escriba su nombre por favor, utilizando solo letras");
        return false; //si no se cumple  nos da false
    } 

    /**********Apellido************* */
   
    if(apellido == null || apellido == ""){
        alert("Escribi su apellido.");
        return false; 
    }
     let apellido_re =/^[a-zA-Z]{2,60}$/; 
     if(!apellido_re.exec(apellido)){
        alert("Escriba su apellido por favor, utilizando solo letras");
        return false; 
    } 

    /**********Telefono************* */

      if(telefono == null || telefono == ""){
        alert("Escriba su numero de telefono.");
        return false; 
    }
     let telefono_re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,7}$/; 
     if(!telefono_re.exec(telefono)){
        alert("El formato utilizado para el telefono no es correcto");
        return false;
    } 

    /**********Email************* */

      if(email == null || email == ""){
        alert("Escriba su correo electronico");
        return false; 
    }
     let email_re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
     if(!email_re.exec(email)){
        alert("El formato utilizado para el correo no es correcto");
        return false; 
    } 


    /**************privacidad */
    if(!privacidad.checked){ //si privacidad no esta marcado
        alert("Acepte la politica de privacidad para continuar. ");
        return false;

    }

    return true; //si se cumple le enviamos el valor true a validar y envia el form.
}







 // Creamos un array para almacenar los productos en el carrito
        let carrito = [];

        // Recuperamos los Elementos del DOM
        const selectorProducto = document.getElementById("seleccion-producto");
        const botonAniadirCarrito = document.getElementById("aniadir-al-carrito"); // Mantenemos la referencia al botón
        const contenedorArticulosCarrito = document.getElementById("articulo-carrito");
        const elementoTotalFinal = document.getElementById("total-final");
        const inputPlazoEntrega = document.getElementById("plazo-entrega"); // Nuevo elemento para el plazo

        // Evento para agregar productos al carrito cuando se selecciona una opción en el <select>
        selectorProducto.addEventListener('change', () => {
            const opcionSeleccionada = selectorProducto.options[selectorProducto.selectedIndex];
            const valorSeleccionado = opcionSeleccionada.value;

            // Validar si se ha seleccionado un producto válido (no la opción por defecto)
            if (!valorSeleccionado) {
                console.log('Por favor selecciona un producto válido para añadir.');
                return; // No añadir nada si es la opción por defecto
            }

            // Separamos el nombre del producto y su precio del valor del option
            const [nombreProducto, precioProducto] = valorSeleccionado.split(":");
            const precio = parseFloat(precioProducto); // Convertimos el precio a número flotante

            // Agregamos el producto al carrito
            carrito.push({ nombre: nombreProducto, precio }); // Con carrito.push introducimos un objeto en el array
            actualizarCarrito(); // Actualizamos la vista del carrito

            // Opcional: Resetear el selector a la opción por defecto después de añadir
            selectorProducto.value = "";
        });

        // Función para actualizar la visualización del carrito
        function actualizarCarrito() {
            // Limpiar contenido previo del carrito
            contenedorArticulosCarrito.innerHTML = '';

            // Mostrar productos en el carrito
            carrito.forEach((producto, index) => {
                const articuloCarrito = document.createElement('div');
                articuloCarrito.classList.add('articulo-carrito'); // Añadimos una clase para estilizar
                articuloCarrito.innerHTML = `
                    <span>${producto.nombre} - ${producto.precio.toFixed(2)}£</span>
                    <button class="eliminar-articulo" data-index="${index}">Eliminar</button>
                `;
                contenedorArticulosCarrito.appendChild(articuloCarrito);
            });

            // Añadir funcionalidad para eliminar productos dinámicamente
            document.querySelectorAll('.eliminar-articulo').forEach((boton) => {
                boton.addEventListener('click', (e) => {
                    const index = e.target.dataset.index; // Obtenemos el índice del producto a eliminar
                    eliminarArticulo(index); // Llamamos a la función para eliminar
                });
            });

            actualizarTotalFinal(); // Actualizamos el total final después de cada cambio en el carrito
        }

        // Función para eliminar un producto del carrito
        function eliminarArticulo(index) {
            // Eliminar Producto del array 'carrito' usando splice
            carrito.splice(index, 1);

            // Actualizar el carrito después de la eliminación
            actualizarCarrito();
        }

        // Función para calcular y mostrar el precio final
        function actualizarTotalFinal() {
            // Calcular el total base del carrito
            let total = carrito.reduce((suma, item) => suma + item.precio, 0);

            // Sumar el precio de los extras seleccionados
            const extrasSeleccionados = document.querySelectorAll(".checkbox-extra:checked");
            extrasSeleccionados.forEach((checkbox) => {
                const [, precioExtra] = checkbox.value.split(':'); // Separamos el valor para obtener solo el precio
                total += parseFloat(precioExtra); // Sumamos el precio del extra
            });

            // Aplicar descuento basado en el plazo de entrega
            const plazo = parseInt(inputPlazoEntrega.value);
            let descuentoPorcentaje = 0;

            if (plazo >= 1 && plazo <= 3) {
                descuentoPorcentaje = 0.05; // 5% de descuento
            } else if (plazo >= 4 && plazo <= 6) {
                descuentoPorcentaje = 0.10; // 10% de descuento
            } else if (plazo >= 7) {
                descuentoPorcentaje = 0.20; // 20% de descuento
            }

            if (descuentoPorcentaje > 0) {
                total = total * (1 - descuentoPorcentaje); // Aplicamos el descuento
            }

            // Actualizar el texto del elemento donde se muestra el total final
            elementoTotalFinal.textContent = `Total final: ${total.toFixed(2)}£`;
        }

        // Evento para actualizar el total cuando se seleccionan/deseleccionan los extras
        const checkboxExtras = document.querySelectorAll(".checkbox-extra");
        checkboxExtras.forEach((checkbox) => {
            checkbox.addEventListener('change', actualizarTotalFinal);
        });

        // Evento para actualizar el total cuando se cambia el plazo de entrega
        inputPlazoEntrega.addEventListener('input', actualizarTotalFinal);

        // Inicializar el carrito y el total al cargar la página
        actualizarCarrito();