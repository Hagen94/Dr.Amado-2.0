import express from 'express';
import { createUser, deleteUsuarioController, getUsuariosController, mostrarFormularioCrearUsuario, mostrarFormularioEditarUsuario, updateUsuarioController } from '../controller/usersController.js';
import { isAdmin, verifyToken } from '../middleware/jwt.js';

const routerUuarios = express.Router();

/*------------USUARIOS-------------*/
routerUuarios.get('/',verifyToken,isAdmin,  getUsuariosController);

//voy a la ruta de crear usuario
routerUuarios.get('/crearUsuario',verifyToken,isAdmin,   mostrarFormularioCrearUsuario);
//crear usuario
routerUuarios.post('/crearUsuario', verifyToken,isAdmin,  createUser);

//borrar usuario
routerUuarios.delete('/deleteUsuario/:id',verifyToken,isAdmin, deleteUsuarioController);


//voy a la ruta de editar
routerUuarios.get('/obtenerUsuario/:id',verifyToken ,isAdmin, mostrarFormularioEditarUsuario );

//editar usuario
routerUuarios.put('/editarUsuario/:id', verifyToken ,isAdmin, updateUsuarioController);





export default routerUuarios;