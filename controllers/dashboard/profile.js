// Constante para establecer el formulario de editar perfil.
const PROFILE_FORM = document.getElementById('profile-form');
// Constante para establecer el formulario de cambiar contraseña.
const PASSWORD_FORM = document.getElementById('password-form')
// Constante tipo objeto para establecer las opciones del componente Modal.
const OPTIONS = {
    dismissible: false
}
// Inicialización del componente Modal para que funcionen las cajas de diálogo.
M.Modal.init(document.querySelectorAll('.modal'), OPTIONS);
// Constante para establecer la modal de cambiar contraseña.
const PASSWORD_MODAL = M.Modal.getInstance(document.getElementById('password-modal'));
// Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
M.Tooltip.init(document.querySelectorAll('.tooltipped'));

// Método manejador de eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Petición para obtener los datos del usuario que ha iniciado sesión.
    const DATA = await fetchData(USER_API, 'readProfile');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se inicializan los campos del formulario con los datos del usuario que ha iniciado sesión.
        document.getElementById('nombres').value = DATA.dataset.nombres_usuario;
        document.getElementById('apellidos').value = DATA.dataset.apellidos_usuario;
        document.getElementById('correo').value = DATA.dataset.correo_usuario;
        document.getElementById('alias').value = DATA.dataset.alias_usuario;
        // Se actualizan los campos para que las etiquetas (labels) no queden sobre los datos.
        M.updateTextFields();
    } else {
        sweetAlert(2, DATA.exception, null);
    }
});

// Método manejador de eventos para cuando se envía el formulario de editar perfil.
PROFILE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(PROFILE_FORM);
    // Petición para actualizar los datos personales del usuario.
    const DATA = await fetchData(USER_API, 'editProfile', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true, 'main.html');
    } else {
        sweetAlert(2, DATA.exception, false);
    }
});

// Método manejador de eventos para cuando se envía el formulario de cambiar contraseña.
PASSWORD_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(PASSWORD_FORM);
    // Petición para actualizar la constraseña.
    const DATA = await fetchData(USER_API, 'changePassword', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        PASSWORD_MODAL.close();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
    } else {
        sweetAlert(2, DATA.exception, false);
    }
});

/*
*   Función para preparar el formulario al momento de cambiar la constraseña.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
function openPassword() {
    // Se abre la caja de diálogo que contiene el formulario.
    PASSWORD_MODAL.open();
    // Se restauran los elementos del formulario.
    PASSWORD_FORM.reset();
}