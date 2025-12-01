document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (!form) {
        console.error('No se encontró el formulario');
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = {
            nombre: form.nombre.value,
            email: form.email.value,
            telefono: form.telefono.value,
            mensaje: form.mensaje.value
        };

        console.log('Datos que se van a enviar:', data);

        try {
            const res = await fetch('http://localhost:5000/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await res.json();
            console.log('Respuesta del servidor:', result);
            formStatus.textContent = result.msg;
            form.reset();
        } catch (err) {
            console.error('Error al enviar mensaje:', err);
            formStatus.textContent = 'Error al enviar mensaje';
        }
    });
});