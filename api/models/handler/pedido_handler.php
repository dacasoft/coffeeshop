<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de las tablas PEDIDO y DETALLE_PEDIDO.
*/
class PedidoHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id_pedido = null;
    protected $id_detalle = null;
    protected $cliente = null;
    protected $producto = null;
    protected $cantidad = null;
    protected $estado = null;

    /*
    *   ESTADOS DEL PEDIDO
    *   Pendiente (valor por defecto). Pedido en proceso y se puede modificar el detalle.
    *   Finalizado. Pedido terminado por el cliente y ya no es posible modificar el detalle.
    *   Entregado. Pedido enviado al cliente.
    *   Anulado. Pedido cancelado por el cliente después de finalizarlo.
    */

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */
    // Método para verificar si existe un pedido en proceso para seguir comprando, de lo contrario se crea uno.
    public function startOrder()
    {
        $sql = "SELECT id_pedido
                FROM pedido
                WHERE estado_pedido = 'Pendiente' AND id_cliente = ?";
        $params = array($_SESSION['idCliente']);
        if ($data = Database::getRow($sql, $params)) {
            $_SESSION['idPedido'] = $data['id_pedido'];
            return true;
        } else {
            $sql = 'INSERT INTO pedido(direccion_pedido, id_cliente)
                    VALUES((SELECT direccion_cliente FROM cliente WHERE id_cliente = ?), ?)';
            $params = array($_SESSION['idCliente'], $_SESSION['idCliente']);
            // Se obtiene el ultimo valor insertado en la llave primaria de la tabla pedidos.
            if ($_SESSION['idPedido'] = Database::getLastRow($sql, $params)) {
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
        $params = array($this->producto, $this->producto, $this->cantidad, $_SESSION['idPedido']);
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
        $params = array($_SESSION['idPedido']);
        return Database::getRows($sql, $params);
    }

    // Método para finalizar un pedido por parte del cliente.
    public function finishOrder()
    {
        $this->estado = 'Finalizado';
        $sql = 'UPDATE pedido
                SET estado_pedido = ?
                WHERE id_pedido = ?';
        $params = array($this->estado, $_SESSION['idPedido']);
        return Database::executeRow($sql, $params);
    }

    // Método para actualizar la cantidad de un producto agregado al carrito de compras.
    public function updateDetail()
    {
        $sql = 'UPDATE detalle_pedido
                SET cantidad_producto = ?
                WHERE id_detalle = ? AND id_pedido = ?';
        $params = array($this->cantidad, $this->id_detalle, $_SESSION['idPedido']);
        return Database::executeRow($sql, $params);
    }

    // Método para eliminar un producto que se encuentra en el carrito de compras.
    public function deleteDetail()
    {
        $sql = 'DELETE FROM detalle_pedido
                WHERE id_detalle = ? AND id_pedido = ?';
        $params = array($this->id_detalle, $_SESSION['idPedido']);
        return Database::executeRow($sql, $params);
    }
}
