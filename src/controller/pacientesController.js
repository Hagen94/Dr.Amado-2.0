/*
controla la respuesta de las rutas 
*/
// controller.js
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { crearPacienteService, deletePacienteService, filtrarPacientesPorTodosServices, getAllPacientes, getObraSocialService, getPacienteByIdService, updatePacienteService } from '../services/servicePacientes.js';

import { getTurnoByPacienteIdService } from '../services/serviceTurnos.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

/*
traigo los usuarios y los muestro en el home
*/ 
export const pacientes = async (req, res) => {
    const filter = req.query.filtro
    if(filter){
        const pacientes = await filtrarPacientesPorTodosServices(filter);
        const obraSociales = await getObraSocialService();
        res.render(path.resolve(__dirname, '../../view/pacientes/pacientes.ejs'), {"pacientes":pacientes, "obraSociales":obraSociales});
    }else{//traigo todos los pacientes
    const pacientes = await getAllPacientes();
    const obraSociales = await getObraSocialService();
    res.render(path.resolve(__dirname, '../../view/pacientes/pacientes.ejs'), {"pacientes":pacientes, "obraSociales":obraSociales});

    }
    
   
}
//crear paciente
export const mostrarFormularioCrearPaciente = (req, res) => {
    res.render(path.resolve(__dirname, '../../view/pacientes/crearPaciente.ejs'));
}

export const crearPacienteController = async (req, res) => {
    //envio el nuevo paciente al servicio.
    const pacienteNuevo = await crearPacienteService(req.body);
    res.redirect('/pacientes')
   
}
//borrar paciente
export const deletePacienteController = async (req, res) => {
    try {
    const pacienteId = req.params.id;
    // Consulta si hay turnos asociados al pacienteId
    const turnosAsociados = await getTurnoByPacienteIdService(pacienteId);
    if (turnosAsociados.length > 0) {
        // Hay turnos asociados, muestra un mensaje o redirige con un error
        res.status(400).send('No se puede eliminar el paciente debido a turnos asociados.');
    } else {
        // No hay turnos asociados, procede con la eliminación
        await deletePacienteService(pacienteId);
        res.redirect('/pacientes');
    }
} catch (error) {
    // Maneja el error (muestra un mensaje o lógica adicional)
    console.error('Error al eliminar paciente:', error.message);
    res.status(500).send('Error al eliminar paciente.');
}

}

//voy a la ruta de editar 
export const mostrarFormularioEditarPaciente = async (req, res) => {
    //envio el id del paciente para buscar el item en la base y mostrarlo en el 
    //me quedo con el id
    const paciente = await getPacienteByIdService(req.params.id);
    console.log("este es el paciente: ", paciente)
    res.render(path.resolve(__dirname, '../../view/pacientes/editarPacientes.ejs'), {"paciente":paciente});
}


//actualizar paciente
export const updatePacienteController = async (req, res) => {
    console.log("Este el es paciente que no se actualiza: ",req.body)
    const pacienteActualizado = await updatePacienteService(req.params.id, req.body);
    res.redirect('/pacientes')
}



