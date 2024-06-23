/*
controla la respuesta de las rutas 
*/
// controller.js
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { crearPacienteService, deletePacienteService, getAllPacientes, getPacienteByIdService, updatePacienteService } from '../services/servicePacientes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

/*
traigo los usuarios y los muestro en el home
*/ 
export const pacientes = async (req, res) => {
    //traigo todos los pacientes
    const pacientes = await getAllPacientes();
    console.log(pacientes)
    res.render(path.resolve(__dirname, '../../view/pacientes/pacientes.ejs'), {"pacientes":pacientes});
   
}
//crear paciente
export const mostrarFormularioCrearPaciente = (req, res) => {
    res.render(path.resolve(__dirname, '../../view/pacientes/crearPaciente.ejs'));
}

export const crearPacienteController = async (req, res) => {
    //envio el nuevo paciente al servicio.
    const pacienteNuevo = await crearPacienteService(req.body);
   
}
//borrar paciente
export const deletePacienteController = async (req, res) => {
    const pacienteBorrado = await deletePacienteService(req.params.id);
    res.render(path.resolve(__dirname, '../../view/home.ejs'));
}

//voy a la ruta de editar 
export const mostrarFormularioEditarPaciente = async (req, res) => {
    //envio el id del paciente para buscar el item en la base y mostrarlo en el 
    //me quedo con el id
    const id = req.params.id;
    const paciente = await getPacienteByIdService(id);
    res.render(path.resolve(__dirname, '../../view/pacientes/editarPacientes.ejs'), {"paciente":paciente});
}


//actualizar paciente
export const updatePacienteController = async (req, res) => {
    const pacienteActualizado = await updatePacienteService(req.params.id, req.body);
}