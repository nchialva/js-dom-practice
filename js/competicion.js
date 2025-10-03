
/******************* JSON COMPETICION ************************/

let dataCompeticiones = null; // Variable para almacenar los datos del JSON

// Esperar a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', async () => {
    // Obtener referencias a los elementos HTML
    const linkEspana = document.getElementById('linkEspana');
    const linkPortugal = document.getElementById('linkPortugal');
    const linkItalia = document.getElementById('linkItalia');
    // Puedes añadir más enlaces aquí para otros países si los tienes en tu HTML
    const cajaResultados = document.getElementById('caja');
    const paisesContainer = document.getElementById('paises'); // Contenedor de los enlaces de países

    // Log para verificar si los elementos se obtuvieron correctamente
    console.log("[competicion.script.js] linkEspana element:", linkEspana);
    console.log("[competicion.script.js] cajaResultados element:", cajaResultados);
    console.log("[competicion.script.js] paisesContainer element:", paisesContainer);


    // Cargar el JSON externamente
    try {
        const response = await fetch('competicion.json'); 
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        dataCompeticiones = await response.json();
        console.log("[competicion.script.js] Datos del JSON cargados con éxito:", dataCompeticiones);
    } catch (error) {
        console.error("[competicion.script.js] Error al cargar el archivo JSON:", error);
        cajaResultados.innerHTML = '<p style="color: red;">Error al cargar los datos de las competiciones. Por favor, asegúrate de que "competicion.json" existe y la ruta es correcta.</p>';
        return; // Detener la ejecución si el JSON no se carga
    }

    /**
     * Muestra la información de las competiciones para un país específico.
     * @param {string} countryKey - La clave del país en el objeto dataCompeticiones (ej. "competicionE").
     * @param {HTMLElement} clickedLink - El enlace del país que fue clicado.
     */
    function mostrarCompeticiones(countryKey, clickedLink) {
        // Limpiar el contenido anterior de la caja
        cajaResultados.innerHTML = '';
        console.log("[competicion.script.js] Caja de resultados limpiada.");

        // Eliminar la clase 'selected-country' de todos los enlaces de país
        if (paisesContainer) {
            const allCountryLinks = paisesContainer.querySelectorAll('a');
            allCountryLinks.forEach(link => {
                link.classList.remove('selected-country');
            });
        }

        // Añadir la clase 'selected-country' al enlace que fue clicado
        if (clickedLink) {
            clickedLink.classList.add('selected-country');
        }

        // Obtener los datos del país específico
        const competiciones = dataCompeticiones[countryKey];
        console.log(`[competicion.script.js] Datos de competiciones para ${countryKey}:`, competiciones);

        if (competiciones && competiciones.length > 0) {
            console.log("[competicion.script.js] Hay competiciones para mostrar. Iterando...");
            competiciones.forEach(competicion => {
                const divCompeticion = document.createElement('div');
                divCompeticion.classList.add('competicion-item', 'mb-4', 'p-3', 'border', 'border-gray-200', 'rounded-lg', 'bg-white', 'shadow-sm'); // Clases de Tailwind

                const htmlContent = `
                    <p><strong>Nombre:</strong> ${competicion.nombre}</p>
                    <p><strong>Tipo:</strong> ${competicion["Tipo de competición"]}</p>
                    <p><strong>Fecha:</strong> ${competicion["Fecha (aprox.)"]}</p>
                    <p><strong>Ciudad:</strong> ${competicion["Ciudad/Ubicación"]}</p>
                    <p><a href="${competicion["Link oficial"]}" target="_blank" rel="noopener noreferrer">Link Oficial</a></p>
                `;
                divCompeticion.innerHTML = htmlContent;
                console.log("[competicion.script.js] HTML generado para una competición:", htmlContent);
                cajaResultados.appendChild(divCompeticion);
                console.log("[competicion.script.js] Div de competición añadido a la caja de resultados.");
            });
        } else {
            console.log(`[competicion.script.js] No hay competiciones disponibles para ${countryKey} o el array está vacío.`);
            cajaResultados.innerHTML = `<p>No hay competiciones disponibles para ${countryKey} en este momento.</p>`;
        }
    }

    // Añadir event listeners a los enlaces de los países
    // Asegurarse de que los elementos existen antes de añadir los listeners
    if (linkEspana) {
        linkEspana.addEventListener('click', (event) => {
            event.preventDefault();
            mostrarCompeticiones("competicionE", event.target); // Pasa el elemento clicado
        });
        console.log("[competicion.script.js] Event listener añadido al enlace de España.");
    } else {
        console.error("[competicion.script.js] Error: El enlace con ID 'linkEspana' no se encontró en el DOM.");
    }

    if (linkPortugal) {
        linkPortugal.addEventListener('click', (event) => {
            event.preventDefault();
            mostrarCompeticiones("competicionP", event.target); // Pasa el elemento clicado
        });
        console.log("[competicion.script.js] Event listener añadido al enlace de Portugal.");
    } else {
        console.warn("[competicion.script.js] Advertencia: El enlace con ID 'linkPortugal' no se encontró en el DOM.");
    }

    if (linkItalia) {
        linkItalia.addEventListener('click', (event) => {
            event.preventDefault();
            mostrarCompeticiones("competicionI", event.target); // Pasa el elemento clicado
        });
        console.log("[competicion.script.js] Event listener añadido al enlace de Italia.");
    } else {
        console.warn("[competicion.script.js] Advertencia: El enlace con ID 'linkItalia' no se encontró en el DOM.");
    }
     if (linkFrancia) {
        linkFrancia.addEventListener('click', (event) => {
            event.preventDefault();
            mostrarCompeticiones("competicionF", event.target); // Pasa el elemento clicado
        });
        console.log("[competicion.script.js] Event listener añadido al enlace de Italia.");
    } else {
        console.warn("[competicion.script.js] Advertencia: El enlace con ID 'linkItalia' no se encontró en el DOM.");
    }
     if (linkAmerica) {
        linkAmerica.addEventListener('click', (event) => {
            event.preventDefault();
            mostrarCompeticiones("competicionA", event.target); // Pasa el elemento clicado
        });
        console.log("[competicion.script.js] Event listener añadido al enlace de Italia.");
    } else {
        console.warn("[competicion.script.js] Advertencia: El enlace con ID 'linkItalia' no se encontró en el DOM.");
    }

    // Mostrar un mensaje inicial al cargar
    cajaResultados.innerHTML = '<p>Haz clic en un país para ver las competiciones.</p>';
});