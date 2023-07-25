// Constante para establecer el formulario de iniciar sesión.
const SESSION_FORM = document.getElementById('session-form');
// Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
M.Tooltip.init(document.querySelectorAll('.tooltipped'));

// Método manejador de eventos para cuando se envía el formulario de iniciar sesión.
SESSION_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SESSION_FORM);
    // Petición para determinar si el cliente se encuentra registrado.
    const DATA = await fetchData(USER_API, 'login', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true, 'index.html');
    } else {
        sweetAlert(2, DATA.exception, false);
    }
});