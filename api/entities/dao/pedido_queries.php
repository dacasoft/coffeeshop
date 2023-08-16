<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el acceso a datos de las entidades PEDIDO y DETALLE_PEDIDO.
*/
class PedidoQueries
{
    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, delete).
    */
    // Método para verificar si existe un pedido en proceso para seguir comprando, de lo contrario se crea uno.
    public function startOrder()
    {
        $sql = "SELECT id_pedido
                FROM pedido
                WHERE estado_pedido = 'Pendiente' AND id_cliente = ?";
        $params = array($_SESSION['id_cliente']);
        if ($data = Database::getRow($sql, $params)) {
<<<<<<< HEAD
            $_SESSION['id_pedido'] = $data['id_pedido'];
=======
            $this->id_pedido = $data['id_pedido'];
>>>>>>> d707afb539a5d53c3e72db2b6c06a6ad128cf50f
            return true;
        } else {
            $sql = 'INSERT INTO pedido(direccion_pedido, id_cliente)
                    VALUES((SELECT direccion_cliente FROM cliente WHERE id_cliente = ?), ?)';
            $params = array($_SESSION['id_cliente'], $_SESSION['id_cliente']);
            // Se obtiene el ultimo valor insertado en la llave primaria de la tabla pedidos.
<<<<<<< HEAD
            if ($_SESSION['id_pedido'] = Database::getLastRow($sql, $params)) {
=======
            if ($this->id_pedido = Database::getLastRow($sql, $params)) {
>>>>>>> d707afb539a5d53c3e72db2b6c06a6ad128cf50f
                return true;
            } else {
                return false;
            }
        }
    }

    // Método para agregar un producto al carrito de compras.
    public function createDetail()
    {
        // Se realiza una subconsulta para obtener el precio del producto.
        $sql = 'INSERT INTO detalle_pedido(id_producto, precio_producto, cantidad_producto, id_pedido)
                VALUES(?, (SELECT precio_producto FROM producto WHERE id_producto = ?), ?, ?)';
<<<<<<< HEAD
        $params = array($this->producto, $this->producto, $this->cantidad, $_SESSION['id_pedido']);
=======
        $params = array($this->producto, $this->producto, $this->cantidad, $this->id_pedido);
>>>>>>> d707afb539a5d53c3e72db2b6c06a6ad128cf50f
        return Database::executeRow($sql, $params);
    }

    // Método para obtener los productos que se encuentran en el carrito de compras.
    public function readOrderDetail()
    {
        $sql = 'SELECT id_detalle, nombre_producto, detalle_pedido.precio_producto, detalle_pedido.cantidad_producto
                FROM pedido
                INNER JOIN detalle_pedido USING(id_pedido)
                INNER JOIN producto USING(id_producto)
                WHERE id_pedido = ?';
<<<<<<< HEAD
        $params = array($_SESSION['id_pedido']);
=======
        $params = array($this->id_pedido);
>>>>>>> d707afb539a5d53c3e72db2b6c06a6ad128cf50f
        return Database::getRows($sql, $params);
    }

    // Método para finalizar un pedido por parte del cliente.
    public function finishOrder()
    {
        // Se establece la zona horaria local para obtener la fecha del servidor.
        date_default_timezone_set('America/El_Salvador');
        $date = date('Y-m-d');
        $this->estado = 'Finalizado';
        $sql = 'UPDATE pedido
                SET estado_pedido = ?, fecha_pedido = ?
                WHERE id_pedido = ?';
        $params = array($this->estado, $date, $_SESSION['id_pedido']);
        return Database::executeRow($sql, $params);
    }

    // Método para actualizar la cantidad de un producto agregado al carrito de compras.
    public function updateDetail()
    {
        $sql = 'UPDATE detalle_pedido
                SET cantidad_producto = ?
                WHERE id_detalle = ? AND id_pedido = ?';
        $params = array($this->cantidad, $this->id_detalle, $_SESSION['id_pedido']);
        return Database::executeRow($sql, $params);
    }

    // Método para eliminar un producto que se encuentra en el carrito de compras.
    public function deleteDetail()
    {
        $sql = 'DELETE FROM detalle_pedido
                WHERE id_detalle = ? AND id_pedido = ?';
        $params = array($this->id_detalle, $_SESSION['id_pedido']);
        return Database::executeRow($sql, $params);
    }
}
