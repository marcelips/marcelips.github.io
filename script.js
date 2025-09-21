document.addEventListener("DOMContentLoaded", function() {
    const acordeonBtns = document.querySelectorAll(".acordeon-btn");
    const leadForm = document.querySelector('form');
    const celularInput = document.getElementById('celular');
    const dniInput = document.getElementById('dni');

    const modalMessage = document.getElementById('modal-message');
    const modalMessageText = document.getElementById('modal-message-text');
    const closeBtnMessage = document.getElementById('modal-message-close');

    // **IMPORTANTE: Pega aquí la URL que copiaste del despliegue de Apps Script.**
    const scriptURL = 'https://script.google.com/macros/s/AKfycbz3rnvqZw0yq2HmRPiW2v1NBFJ1WakLU-RmsKirFFHXwXgc5evNczhgowpvMTUWzwzKVA/exec';

    // Función para manejar el estado de los acordeones
    acordeonBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const contenido = btn.nextElementSibling;
            const flecha = btn.querySelector(".acordeon-flecha");

            if (contenido.classList.contains("activo")) {
                contenido.classList.remove("activo");
                flecha.textContent = "▼";
            } else {
                contenido.classList.add("activo");
                flecha.textContent = "▲";
            }
        });
    });

    // Validaciones para campos numéricos (celular y dni)
    if (celularInput) {
        celularInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    if (dniInput) {
        dniInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    // Lógica para el envío del formulario
    if (leadForm) {
        const submitBtn = leadForm.querySelector('button[type="submit"]');

        leadForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita el envío del formulario por defecto
            
            const formData = new FormData(leadForm);
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }

            let originalText = '';
            if (submitBtn) {
                originalText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';
            }

            fetch(scriptURL, {
                method: 'POST',
                body: new URLSearchParams(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error de red: ' + response.statusText);
                }
                // Si la respuesta es exitosa, muestra el mensaje de confirmación
                showModalMessage('¡Formulario enviado con éxito!', 'success');
                leadForm.reset();
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
                showModalMessage('Hubo un error al enviar el formulario. Por favor, intenta de nuevo.', 'error');
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
            });
        });
    }

    // Función para mostrar mensajes modales
    function showModalMessage(message, type) {
        const modal = document.getElementById('modal-message');
        const messageText = document.getElementById('modal-message-text');
        
        if (modal && messageText) {
            messageText.textContent = message;
            if (type === 'success') {
                modal.style.backgroundColor = '#4CAF50';
            } else if (type === 'error') {
                modal.style.backgroundColor = '#f44336';
            }
            modal.style.display = 'block';
        }
    }

    // Cierra el mensaje de confirmación
    if (closeBtnMessage) {
        closeBtnMessage.addEventListener('click', () => {
            if (modalMessage) {
                modalMessage.style.display = 'none';
            }
        });
    }
    
    // Cierra el mensaje si se hace click fuera
    window.addEventListener('click', (event) => {
        if (modalMessage && event.target == modalMessage) {
            modalMessage.style.display = "none";
        }
    });

    // Lógica para los links del footer y modales (sin cambios)
    const legalesLink = document.getElementById('legales-link');
    const terminosLink = document.getElementById('terminos-link');
    const politicaLink = document.getElementById('politica-link');
    const normasLink = document.getElementById('normas-link');

    const legalesModal = document.getElementById('legales-modal');
    const terminosModal = document.getElementById('terminos-modal');
    const politicaModal = document.getElementById('politica-modal');
    const normasModal = document.getElementById('normas-modal');

    const closeBtns = document.querySelectorAll('.close-btn');

    if (legalesLink) {
        legalesLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (legalesModal) legalesModal.style.display = "block";
        });
    }

    if (terminosLink) {
        terminosLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (terminosModal) terminosModal.style.display = "block";
        });
    }

    if (politicaLink) {
        politicaLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (politicaModal) politicaModal.style.display = "block";
        });
    }

    if (normasLink) {
        normasLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (normasModal) normasModal.style.display = "block";
        });
    }

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) {
                modal.style.display = "none";
            }
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target == legalesModal || event.target == terminosModal || event.target == politicaModal || event.target == normasModal) {
            event.target.style.display = "none";
        }
    });
});