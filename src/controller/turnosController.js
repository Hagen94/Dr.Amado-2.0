/*
controla la respuesta de las rutas 
*/
// controller.js
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { crearTurnoService, deleteTurnoService, getAllTurnos, getTurnoByIdService, updateTurnoService } from '../services/serviceTurnos.js';
import { getAllPacientes } from '../services/servicePacientes.js';





const __dirname = dirname(fileURLToPath(import.meta.url));
/*
traigo los usuarios y los muestro en el home
*/ 

//obtener todos los turnos para el calendario
export const getTurnosController = async (req, res) => {
    console.log("Entro a getTurnosController")
    try {
        //traigo todos los turnos
        const turnos = await getAllTurnos();
        //traigo todos los pacientes
        const pacientes = await getAllPacientes();
        console.log(turnos)
        // Mapea los turnos a la estructura que FullCalendar espera
        const eventos = turnos.map(turno => {

            //busco el paciente con el id del turno y luego envio el paciente.Nombre como
            const paciente = pacientes.find(paciente => paciente.Id === turno.PacienteId);
            // Convierte Fecha y Hora a un objeto Date en la zona horaria local
            let fecha = turno.Fecha.toISOString().split('T')[0];
                console.log("La fecha es: ",fecha)
            return {
                title: `El paciente es: ${paciente.Nombre}`, // usa PacienteId como title
                start: `${fecha}T${turno.Hora}`, // usa FechaFecha y turno.Hora`
                    // usa FechaHora como start
                // Puedes agregar más propiedades aquí si las necesitas
                descripcion: `Paciente: ${paciente.Nombre} Hora: ${turno.Hora}`,
                color: 'red',
            };
        });
       // console.log(eventos)
     res.json(eventos);
    } catch(error) {
        console.log(error)
        res.status(500).send(error);
    }
}
//obtener todos los turnos para la lista
 export const getListaTurnos = async (req, res) => {

    try {
        //traigo todos los turnos
        const turnos = await getAllTurnos();
        //traigo todos los pacientes
        const pacientes = await getAllPacientes();


        res.render(path.resolve(__dirname, '../../view/turnos/turnos.ejs'), {"turnos":turnos,"pacientes":pacientes});
        
    } catch (error) {
        res.status(500).send(error);
    }
}

//ir a la ruta para crear un turno
export const mostrarFormularioCrearTurno = async (req, res) => {
    res.render(path.resolve(__dirname, '../../view/turnos/crearTurnos.ejs'));
}
//envio el turnos a la base de datos
export const crearTurnoController = async (req, res) => {
    //envio el nuevo turnos al servicio.
    const turnoNuevo = await crearTurnoService(req.body);
}
//eliminar turno
export const deleteTurnoController = async (req, res) => {
    //envio el id del turno.
    const turnoBorrado = await deleteTurnoService(req.params.id);
}

 // voy a la ruta de editar 
export const mostrarFormularioEditarTurno = async (req, res) => {

    //envio el id del turno para buscar el item en la base y mostrarlo en el 
    //me quedo con el id
    const id = req.params.id;
    const turno = await getTurnoByIdService(id);

   res.render(path.resolve(__dirname, '../../view/turnos/editarTurnos.ejs'), {"turno":turno});
}
//actualizar turno
export const updateTurnoController = async (req, res) => {
    //envio el id del turno para buscar el item en la base y lo actualizarlo.
    const turnoActualizado = await updateTurnoService(req.params.id, req.body);
    
}