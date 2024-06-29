import express from 'express';
import { crearPacienteController, deletePacienteController, mostrarFormularioCrearPaciente, mostrarFormularioEditarPaciente, pacientes, updatePacienteController } from '../controller/pacientesController.js';
import { isAdmin, verifyToken } from '../middleware/jwt.js';


const routerPacientes = express.Router();

/*-----------PACIENTES----------------*/
//pacientes
routerPacientes.get('/', verifyToken,isAdmin, pacientes);
//crear paciente
//voy a la ruta de crear paciente
routerPacientes.get('/crearPaciente', verifyToken,isAdmin, mostrarFormularioCrearPaciente); 
routerPacientes.post('/crearPaciente', verifyToken,isAdmin,crearPacienteController);

//borrar paciente
routerPacientes.delete('/deletePaciente/:id', verifyToken,isAdmin, deletePacienteController)

//actualizar paciente
//voy a la ruta de editar
routerPacientes.get('/editarPaciente/:id', verifyToken,isAdmin, mostrarFormularioEditarPaciente);
//envio el paciente editado
routerPacientes.put('/editarPaciente/:id', verifyToken,isAdmin, updatePacienteController);
/*---------------------------*/

export default routerPacientes;