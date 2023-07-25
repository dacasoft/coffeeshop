// Constante para completar la ruta de la API.
const CATEGORIA_API = 'business/public/categoria.php';
// Constante para establecer el contenedor de categorías.
const CATEGORIAS = document.getElementById('categorias');
// Constante tipo objeto para establecer las opciones del componente Slider.
const OPTIONS = {
    height: 300
}
// Se inicializa el componente Slider para que funcione el carrusel de imágenes.
M.Slider.init(document.querySelectorAll('.slider'), OPTIONS);

// Método manejador de eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Petición para obtener las categorías disponibles.
    const DATA = await fetchData(CATEGORIA_API, 'readAll');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se inicializa el contenedor de categorías.
        CATEGORIAS.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se establece la página web de destino con los parámetros.
            url = `articles.html?id=${row.id_categoria}&nombre=${row.nombre_categoria}`;
            // Se crean y concatenan las tarjetas con los datos de cada categoría.
            CATEGORIAS.innerHTML += `
                <div class="col s12 m6 l4">
                    <div class="card hoverable">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img src="${SERVER_URL}images/categorias/${row.imagen_categoria}" class="activator">
                        </div>
                        <div class="card-content">
                            <span class="card-title activator grey-text text-darken-4">
                                <b>${row.nombre_categoria}</b>
                                <i class="material-icons right tooltipped" data-tooltip="Descripción">more_vert</i>
                            </span>
                            <p class="center">
                                <a href="${url}" class="tooltipped" data-tooltip="Ver productos">
                                    <i class="material-icons">local_cafe</i>
                                </a>
                            </p>
                        </div>
                        <div class="card-reveal">
                            <span class="card-title grey-text text-darken-4">
                                <b>${row.nombre_categoria}</b>
                                <i class="material-icons right tooltipped" data-tooltip="Cerrar">close</i>
                            </span>
                            <p>${row.descripcion_categoria}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
        M.Tooltip.init(document.querySelectorAll('.tooltipped'));
    } else {
        // Se asigna al título del contenido de la excepción cuando no existen datos para mostrar.
        document.getElementById('title').textContent = DATA.exception;
    }
});