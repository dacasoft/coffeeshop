/*
*   Controlador es de uso general en las páginas web del sitio público.
*   Sirve para manejar las plantillas del encabezado y pie del documento.
*/

// Constante para completar la ruta de la API.
const USER_API = 'business/public/cliente.php';
// Constantes para establecer las etiquetas de encabezado y pie de la página web.
const HEADER = document.querySelector('header');
const FOOTER = document.querySelector('footer');

// Método manejador de eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Petición para obtener en nombre del usuario que ha iniciado sesión.
    const DATA = await fetchData(USER_API, 'getUser');
    // Se comprueba si el usuario está autenticado para establecer el encabezado respectivo.
    if (DATA.session) {
        HEADER.innerHTML = `
            <div class="navbar-fixed">
                <nav>
                    <div class="nav-wrapper">
                        <a href="index.html" class="brand-logo"><img src="../../resources/img/logo.png" height="60"></a>
                        <a data-target="mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                        <ul class="right hide-on-med-and-down">
                            <li><a href="index.html"><i class="material-icons left">view_module</i>Catálogo</a></li>
                            <li><a href="cart.html"><i class="material-icons left">shopping_cart</i>Carrito</a></li>
                            <li><a onclick="logOut()"><i class="material-icons left">close</i>Cerrar sesión</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
            <ul class="sidenav" id="mobile">
                <li><a href="index.html"><i class="material-icons left">view_module</i>Catálogo</a></li>
                <li><a href="cart.html"><i class="material-icons left">shopping_cart</i>Carrito</a></li>
                <li><a onclick="logOut()"><i class="material-icons left">close</i>Cerrar sesión</a></li>
            </ul>
        `;
    } else {
        HEADER.innerHTML = `
            <div class="navbar-fixed">
                <nav>
                    <div class="nav-wrapper">
                        <a href="index.html" class="brand-logo"><img src="../../resources/img/logo.png" height="60"></a>
                        <a data-target="mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                        <ul class="right hide-on-med-and-down">
                            <li><a href="index.html"><i class="material-icons left">view_module</i>Catálogo</a></li>
                            <li><a href="signup.html"><i class="material-icons left">person</i>Crear cuenta</a></li>
                            <li><a href="login.html"><i class="material-icons left">login</i>Iniciar sesión</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
            <ul class="sidenav" id="mobile">
                <li><a href="index.html"><i class="material-icons left">view_module</i>Catálogo</a></li>
                <li><a href="signup.html"><i class="material-icons left">person</i>Crear cuenta</a></li>
                <li><a href="login.html"><i class="material-icons left">login</i>Iniciar sesión</a></li>
            </ul>
        `;
    }
    // Se define el componente Parallax.
    const PARALLAX = `
            <div class="parallax-container">
                <div class="parallax">
                    <img id="parallax" src='../../resources/img/parallax/'>
                </div>
            </div>
        `;
    // Se agrega el componente Parallax antes de la etiqueta footer.
    FOOTER.insertAdjacentHTML('beforebegin', PARALLAX);
    // Se establece el pie del encabezado.
    FOOTER.innerHTML = `
        <div class="container">
            <div class="row">
                <div class="col s12 m6 l6">
                    <h5 class="white-text">Nosotros</h5>
                    <p>
                        <blockquote>
                            <a href="#" class="white-text"><b>Misión</b></a>
                            <span>|</span>
                            <a href="#" class="white-text"><b>Visión</b></a>
                            <span>|</span>
                            <a href="#" class="white-text"><b>Valores</b></a>
                        </blockquote>
                        <blockquote>
                            <a href="#" class="white-text"><b>Términos y condiciones</b></a>
                        </blockquote>
                    </p>
                </div>
                <div class="col s12 m6 l6">
                    <h5 class="white-text">Contáctanos</h5>
                    <p>
                        <blockquote>
                            <a href="https://www.facebook.com/" class="white-text" target="_blank"><b>facebook</b></a>
                            <span>|</span>
                            <a href="https://www.instagram.com/" class="white-text" target="_blank"><b>instagram</b></a>
                            <span>|</span>
                            <a href="https://www.youtube.com/" class="white-text" target="_blank"><b>youtube</b></a>
                        </blockquote>
                        <blockquote>
                            <a href="mailto:dacasoft@outlook.com" class="white-text"><b>Correo electrónico</b></a>
                            <span>|</span>
                            <a href="https://api.whatsapp.com/" class="white-text" target="_blank"><b>WhatsApp</b></a>
                        </blockquote>
                    </p>
                </div>
            </div>
        </div>
        <div class="footer-copyright">
            <div class="container">
                <span>© 2018-2023 Copyright CoffeeShop. Todos los derechos reservados.</span>
                <span class="right">Diseñado con
                    <a href="http://materializecss.com/" target="_blank">
                        <img src="../../resources/img/materialize.png" height="20" style="vertical-align:middle" alt="Materialize">
                    </a>
                </span>
            </div>
        </div>
    `;
    // Se inicializa el componente Sidenav para que funcione la navegación lateral.
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
    // Se declara e inicializa un arreglo con los nombres de las imagenes que se pueden utilizar en el efecto parallax.
    const IMAGES = ['img01.jpg', 'img02.jpg', 'img03.jpg', 'img04.jpg', 'img05.jpg'];
    // Se declara e inicializa una constante para obtener un elemento del arreglo de forma aleatoria.
    const ELEMENT = Math.floor(Math.random() * IMAGES.length);
    // Se asigna la imagen a la etiqueta img por medio del atributo src.
    document.getElementById('parallax').src += IMAGES[ELEMENT];
    // Se inicializa el efecto Parallax.
    M.Parallax.init(document.querySelectorAll('.parallax'));
});