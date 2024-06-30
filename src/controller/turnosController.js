/*
controla la respuesta de las rutas 
*/
// controller.js
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { crearTurnoService, deleteTurnoService, filtrarEstadosService, filtrarTurnosFechaService, filtrarTurnosHoraService, filtrarTurnosPorEstadoIdService, filtrarTurnosPorPacienteIdService,  getAllTurnos, getEstadoTurnoService, getTurnoByIdService, updateTurnoService, verificarTurnoService } from '../services/serviceTurnos.js';
import { filtrarPacientesPorNombreService, getAllPacientes } from '../services/servicePacientes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

//obtener todos los turnos para el calendario
export const getTurnosController = async (req, res) => {
    
    try {
        //traigo todos los turnos
        const turnos = await getAllTurnos();
        //traigo todos los pacientes
        const pacientes = await getAllPacientes();
        // Mapea los turnos a la estructura que FullCalendar espera
        const eventos = turnos.map(turno => {

            //busco el paciente con el id del turno y luego envio el paciente.Nombre como
            const paciente = pacientes.find(paciente => paciente.Id === turno.PacienteId);
            // Convierte Fecha y Hora a un objeto Date en la zona horaria local
            let fecha = turno.Fecha.toISOString().split('T')[0];
            return {
                title: `El paciente es: ${paciente.Nombre}`, // usa PacienteId como title
                start: `${fecha}T${turno.Hora}`, // usa FechaFecha y turno.Hora`
                    // usa FechaHora como start
                // Puedes agregar más propiedades aquí si las necesitas
                descripcion: `Paciente: ${paciente.Nombre}\n Hora: ${turno.Hora}\n Telefono: ${paciente.Telefono} \n Direccion: ${paciente.Direccion}\n Numero Asociado: ${paciente.NumeroAsociado}`,
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
        const filtro = req.query.filtro;
        // Verifica si el valor es una hora (por ejemplo, "14:00" o "15:00")
        const esHora = /^([01]\d|2[0-3])(:[0-5]\d)?$/.test(filtro);
        // Verifica si el valor es una fecha válida (AAAA-MM-DD)
        const esFechaValida = /^\d{4}[-/]\d{2}[-/]\d{2}$/.test(filtro);

        //verifico que el filtro exista y luego verifico que tipo de filtro es
       if(filtro){
             // Filtrar por fecha y hora
        if (esFechaValida) {
            const turnos = await filtrarTurnosFechaService(filtro);
            const pacientes = await getAllPacientes();
            const estados = await getEstadoTurnoService();
            res.render(path.resolve(__dirname, '../../view/turnos/turnos.ejs'), {"turnos": turnos, "pacientes": pacientes, "estados": estados});
        }else if(esHora){
            const turnos = await filtrarTurnosHoraService(filtro);
            const pacientes = await getAllPacientes();
            const estados = await getEstadoTurnoService();
            res.render(path.resolve(__dirname, '../../view/turnos/turnos.ejs'), {"turnos": turnos, "pacientes": pacientes, "estados": estados});
        }
        // Filtrar por estado
        else if (filtro.toLowerCase() === "ocupado" || filtro.toLowerCase() === "libre") {
            const estados = await filtrarEstadosService(filtro.toLowerCase());
            const turnos = await filtrarTurnosPorEstadoIdService(estados[0].id);
            console.log(turnos)
            const pacientes = await getAllPacientes();
            res.render(path.resolve(__dirname, '../../view/turnos/turnos.ejs'), {"turnos": turnos, "pacientes": pacientes, "estados": estados});
        }else{
            //traigo los pacientes filtrados 
            const pacientes = await filtrarPacientesPorNombreService(filtro);
            console.log("Estos son los pacientes filtrados: "+ pacientes)
            //traigo todos los turnos filtrdos por el Id del paciente
            const turnos= [];
            // Itero sobre cada paciente y obtengo sus turnos
            for (const paciente of pacientes) {
                const turnosPaciente = await filtrarTurnosPorPacienteIdService(paciente.Id);
                // Agrego los turnos del paciente al arreglo general
                turnos.push(...turnosPaciente);
            }
            console.log("Estos son los turnos filtrado por pacientes: "+ turnos)
            //traigo los pacientes pero voy a necesitar filtrar estados y turnos
            //traigo todos estados de los turnos 
            const estados = await getEstadoTurnoService();
            
            res.render(path.resolve(__dirname, '../../view/turnos/turnos.ejs'), {"turnos": turnos, "pacientes": pacientes, "estados": estados});
        }
       }else {// Sin filtro específi
            const turnos = await getAllTurnos();
            const pacientes = await getAllPacientes();
            const estados = await getEstadoTurnoService();
            res.render(path.resolve(__dirname, '../../view/turnos/turnos.ejs'), {"turnos": turnos, "pacientes": pacientes, "estados": estados});
        }
    } catch (error) {
        res.status(500).send(error);
    }
};


//ir a la ruta para crear un turno
export const mostrarFormularioCrearTurno = async (req, res) => {
    //traigo los pacientes para que se seleccion uno al crear un turno
    const pacientes = await getAllPacientes();
    let ExitoOFracaso = '';
    res.render(path.resolve(__dirname, '../../view/turnos/crearTurnos.ejs'), { exito: ExitoOFracaso, "pacientes":pacientes });
}
//envio el turnos a la base de datos
export const crearTurnoController = async (req, res) => {
    try {
        //traigo los pacientes para que se seleccion uno al crear un turno
        const pacientes = await getAllPacientes();
        const nuevoTurno = req.body; // Guardo el turno en nuevoTurno
        // Si el turno existe no esta dsponible
        const turnoExiste = await verificarTurnoService(nuevoTurno);
        // Variable para almacenar el mensaje
        let ExitoOFracaso = '';
        // Si el turno no está disponible, crea el turno
        if (!turnoExiste) {
            await crearTurnoService(nuevoTurno);
            ExitoOFracaso = 'Turno creado exitosamente'  
            res.render(path.resolve(__dirname, '../../view/turnos/crearTurnos.ejs'), { exito: ExitoOFracaso, "pacientes":pacientes });
        } else {
            ExitoOFracaso =  'El turno está ocupado. Elige otro horario.' 
            res.render(path.resolve(__dirname, '../../view/turnos/crearTurnos.ejs'), { exito: ExitoOFracaso, "pacientes":pacientes });
        }
      

    } catch (error) {
        console.error('Error al crear el turno:', error);
        res.status(500).json({ mensaje: 'Error al crear el turno. Inténtalo nuevamente más tarde.' });
    }
};

//eliminar turno
export const deleteTurnoController = async (req, res) => {
    //envio el id del turno.
    console.log("El turno a eliminar es: ",req.params.id)
     await deleteTurnoService(req.params.id);
    res.redirect('/listaTurnos')
    
}

 // voy a la ruta de editar 
export const mostrarFormularioEditarTurno = async (req, res) => {
       //traigo los pacientes para que se seleccion uno al crear un turno
       const pacientes = await getAllPacientes();
       //traigo los estados del turno 
       const estados = await getEstadoTurnoService();
    //envio el id del turno para buscar el item en la base y mostrarlo en el 
    //me quedo con el id
    const id = req.params.id;
    
    const turno = await getTurnoByIdService(id);

   res.render(path.resolve(__dirname, '../../view/turnos/editarTurnos.ejs'), {"turno":turno, "pacientes":pacientes, "estados":estados});
}
//actualizar turno
export const updateTurnoController = async (req, res) => {
    //envio el id del turno para buscar el item en la base y lo actualizarlo.
    const turnoActualizado = await updateTurnoService(req.params.id, req.body);
    res.redirect('/listaTurnos')
    
}