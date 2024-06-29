import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { createUser, deleteUsuarioController, getUsuariosController, mostrarFormularioCrearUsuario, mostrarFormularioEditarUsuario, updateUsuarioController } from '../controller/usersController.js';

const routerUuarios = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

/*------------USUARIOS-------------*/
routerUuarios.get('/',getUsuariosController);

//voy a la ruta de crear usuario
routerUuarios.get('/crearUsuario',  mostrarFormularioCrearUsuario);
//crear usuario
routerUuarios.post('/crearUsuario', createUser);

//borrar usuario
routerUuarios.delete('/deleteUsuario/:id',deleteUsuarioController);


//voy a la ruta de editar
routerUuarios.get('/obtenerUsuario/:id', mostrarFormularioEditarUsuario );

//editar usuario
routerUuarios.put('/editarUsuario/:id', updateUsuarioController);





export default routerUuarios;