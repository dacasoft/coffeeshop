<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase para heredar los métodos de acceso a datos.
require_once('../../entities/dao/categoria_queries.php');
/*
*	Clase para manejar la transferencia (encapsulamiento) de datos de la entidad CATEGORIA.
*/
class Categoria extends CategoriaQueries
{
    // Declaración de atributos (propiedades).
    protected $id = null;
    protected $nombre = null;
    protected $imagen = null;
    protected $descripcion = null;
    // Propiedad adicional para establecer la ruta de los archivos.
    protected $ruta = '../../images/categorias/';

    /*
    *   Métodos para validar y asignar valores de los atributos.
    */
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setNombre($value)
    {
        if (Validator::validateAlphanumeric($value, 1, 50)) {
            $this->nombre = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setImagen($file)
    {
        if (Validator::validateImageFile($file, 500, 500)) {
            $this->imagen = Validator::getFileName();
            return true;
        } else {
            return false;
        }
    }

    public function setDescripcion($value)
    {
        if ($value) {
            if (Validator::validateString($value, 1, 250)) {
                $this->descripcion = $value;
                return true;
            } else {
                return false;
            }
        } else {
            $this->descripcion = null;
            return true;
        }
    }

    /*
    *   Métodos para obtener valores de los atributos.
    */
    public function getId()
    {
        return $this->id;
    }

    public function getNombre()
    {
        return $this->nombre;
    }

    public function getImagen()
    {
        return $this->imagen;
    }

    public function getDescripcion()
    {
        return $this->descripcion;
    }

    public function getRuta()
    {
        return $this->ruta;
    }
}
