/*
*   Controlador de uso general en las páginas web del sitio privado.
*   Sirve para manejar las plantillas del encabezado y pie del documento.
*/

// Constante para completar la ruta de la API.
const USER_API = 'business/dashboard/usuario.php';
// Constantes para establecer las etiquetas de encabezado y pie de la página web.
const HEADER = document.querySelector('header');
const FOOTER = document.querySelector('footer');

// Método manejador de eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Petición para obtener en nombre del usuario que ha iniciado sesión.
    const DATA = await fetchData(USER_API, 'getUser');
    // Se verifica si el usuario está autenticado, de lo contrario se envía a iniciar sesión.
    if (DATA.session) {
        // Se comprueba si existe un alias definido para el usuario, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            HEADER.innerHTML = `
                <div class="navbar-fixed">
                    <nav>
                        <div class="nav-wrapper">
                            <a href="main.html" class="brand-logo"><img src="../../resources/img/logo.png" height="60"></a>
                            <a href="#" data-target="mobile-menu" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                            <ul class="right hide-on-med-and-down">
                                <li><a href="productos.html"><i class="material-icons left">shop</i>Productos</a></li>
                                <li><a href="categorias.html"><i class="material-icons left">shop_two</i>Categorías</a></li>
                                <li><a href="usuarios.html"><i class="material-icons left">group</i>Usuarios</a></li>
                                <li>
                                    <a href="#" class="dropdown-trigger" data-target="desktop-dropdown">
                                        <i class="material-icons left">verified_user</i>Cuenta: <b>${DATA.username}</b>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <ul id="desktop-dropdown" class="dropdown-content">
                        <li><a href="profile.html"><i class="material-icons">face</i>Editar perfil</a></li>
                        <li><a onclick="logOut()"><i class="material-icons">clear</i>Salir</a></li>
                    </ul>
                </div>
                <ul id="mobile-menu" class="sidenav">
                    <li><a href="productos.html"><i class="material-icons">shop</i>Productos</a></li>
                    <li><a href="categorias.html"><i class="material-icons">shop_two</i>Categorías</a></li>
                    <li><a href="usuarios.html"><i class="material-icons">group</i>Usuarios</a></li>
                    <li>
                        <a class="dropdown-trigger" href="#" data-target="mobile-dropdown">
                            <i class="material-icons">verified_user</i>Cuenta: <b>${DATA.username}</b>
                        </a>
                    </li>
                </ul>
                <ul id="mobile-dropdown" class="dropdown-content">
                    <li><a href="profile.html">Editar perfil</a></li>
                    <li><a onclick="logOut()">Salir</a></li>
                </ul>
            `;
            FOOTER.innerHTML = `
                <div class="container">
                    <div class="row">
                        <div class="col s12 m6">
                            <h6 class="white-text">Dashboard</h6>
                            <a class="white-text" href="mailto:dacasoft@outlook.com">
                                <i class="material-icons left">email</i>Ayuda
                            </a>
                        </div>
                        <div class="col s12 m6">
                            <h6 class="white-text">Enlaces</h6>
                            <a class="white-text" href="../public/" target="_blank">
                                <i class="material-icons left">store</i>Sitio público
                            </a>
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
            // Se inicializa el componente Dropdown para que funcione la lista desplegable en los menús.
            M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'));
            // Se inicializa el componente Sidenav para que funcione la navegación lateral.
            M.Sidenav.init(document.querySelectorAll('.sidenav'));
        } else {
            sweetAlert(3, DATA.exception, false, 'index.html');
        }
    } else {
        // Se comprueba si la página web es la principal, de lo contrario se direcciona a iniciar sesión.
        if (location.pathname == '/coffeeshop/views/dashboard/index.html') {
            HEADER.innerHTML = `
                <div class="navbar-fixed">
                    <nav>
                        <div class="nav-wrapper center-align">
                            <a href="index.html" class="brand-logo"><i class="material-icons">dashboard</i></a>
                        </div>
                    </nav>
                </div>
            `;
            FOOTER.innerHTML = `
                <div class="container">
                    <div class="row">
                        <b>Dashboard de CoffeeShop</b>
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
            // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
            M.Tooltip.init(document.querySelectorAll('.tooltipped'));
        } else {
            location.href = 'index.html';
        }
    }
});