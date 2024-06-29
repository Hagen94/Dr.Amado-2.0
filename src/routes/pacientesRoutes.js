import express from 'express';
import { crearPacienteController, deletePacienteController, mostrarFormularioCrearPaciente, mostrarFormularioEditarPaciente, pacientes, updatePacienteController } from '../controller/pacientesController.js';


const routerPacientes = express.Router();

/*-----------PACIENTES----------------*/
//pacientes
routerPacientes.get('/', pacientes);
//crear paciente
//voy a la ruta de crear paciente
routerPacientes.get('/crearPaciente', mostrarFormularioCrearPaciente); 
routerPacientes.post('/crearPaciente', crearPacienteController);

//borrar paciente
routerPacientes.delete('/deletePaciente/:id', deletePacienteController)

//actualizar paciente
//voy a la ruta de editar
routerPacientes.get('/editarPaciente/:id', mostrarFormularioEditarPaciente);
//envio el paciente editado
routerPacientes.put('/editarPaciente/:id', updatePacienteController);
/*---------------------------*/

export default routerPacientes;