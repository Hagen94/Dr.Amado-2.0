/*
controla la respuesta de las rutas 
*/

// controller.js
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { crearUsuarioService, deleteUsuarioService, getAllUsers, getUsuarioService, updateUsuarioService } from '../services/serviceUsers.js';


const __dirname = dirname(fileURLToPath(import.meta.url));


//obtengo todos los usuarios
export const getUsuariosController = async (req, res) => {
  //traigo todos los usuarios
  const usuarios = await getAllUsers();
 res.render(path.resolve(__dirname, '../../view/usuarios/usuarios.ejs'), {usuarios});
}

// voy a la ruta de crear usuario
export const mostrarFormularioCrearUsuario = (req, res) => {
    res.render(path.resolve(__dirname, '../../view/usuarios/crearUsuarios.ejs'));
}

//Envio el formulario para crear un usuario
export const createUser =async (req, res) => {
    try {
        const user = await crearUsuarioService(req.body); //envio la respuesta al servicio
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

//borrar usuario
export const deleteUsuarioController = async (req, res) => {
    //envio el id del usuario.
    const userBorrado = await deleteUsuarioService(req.params.id);
}

//voy a la ruta de editar
export const mostrarFormularioEditarUsuario =async (req, res) => {
    //envio el id del usuario.
    const usuario = await getUsuarioService(req.params.id);
    res.render(path.resolve(__dirname, '../../view/usuarios/editarUsuarios.ejs'), {usuario});
}

//actualizar usuario
export const updateUsuarioController = async (req, res) => {
    //envio el id del usuario.
    const userActualizado = await updateUsuarioService(req.params.id, req.body);
    
}