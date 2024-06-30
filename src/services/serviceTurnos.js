/* 
funciones que llamen a las funciones 
de tu modelo y realicen cualquier lógica de negocio adicional

*/

import { deleteTurno, filtrarEstadoTurnos, filtrarPacientesTurnos, filtrarTurnosPorEstado, filtrarTurnosPorFecha, filtrarTurnosPorHora, getEstadoTurnos, getTurnoById, getTurnoByPacienteId, getTurnos, insertTurno, updateTurno, verificarTurno } from "../models/turnosModel.js";



//Función para obtener todos los turnos

export const getAllTurnos = async () => {
    try {
        const turnos = await getTurnos();
        // Aquí puedes realizar cualquier lógica de aplicación adicional
        // Por ejemplo, filtrar los usuarios, mapear los datos, etc.
        return turnos;
    } catch (error) {
        throw error;
    }
}
//funcion para obtener un turno segun el id
export const getTurnoByIdService = async (id) => {
    try {
        const turno = await getTurnoById(id);
        return turno;
    } catch (error) {
        throw error;
    }
}
//funcion para traer turnos segun PacienteId
export const getTurnoByPacienteIdService = async (id) => {
    try {
        const turno = await getTurnoByPacienteId(id);
        return turno;
    } catch (error) {
        throw error;
    }
}

//Función para insertar un nuevo turno

export const crearTurnoService = async (turno) => {
    try {
        const nuevoTurno = await insertTurno(turno);
        return nuevoTurno;
    } catch (error) {
        throw error;
    }
}

//funcion para verificar si el turno ya existe
export const verificarTurnoService = async (turno) => {
    try {
        //envio la turno a la base de datos apra verificar si el horario esta ocupado
        const existeTurno = await verificarTurno(turno); 
        //retornara un true o false, segundo el horario este ocupado o no
        return existeTurno;
    } catch (error) {
        throw error;
    }
};

//funcion para borrar un turno
export const deleteTurnoService = async (id) => {
    try {
        console.log("el id el servicio a borrar es: ",id)
        const resultado = await deleteTurno(id);
        return resultado;
    } catch (error) {
        throw error;
    }
}

//funcion para actualizar un turno
export const updateTurnoService = async (id, turno) => {
    try {
        const resultado = await updateTurno(id, turno);
        return resultado;
    } catch (error) {
        throw error;    
    }
}


//funcion para obtener el estado de la tabla estadoturnos

export const getEstadoTurnoService = async () => {
    try {
        const turnos = await getEstadoTurnos();
        return turnos;
    } catch (error) {
        throw error;
    }
}

//funcion para filtrar turnos Fecha
export const filtrarTurnosFechaService = async (turno) => {
    try {
        const turnos = await filtrarTurnosPorFecha(turno);
        return turnos;
    } catch (error) {
        throw error;
    }
}
//funcion para filtrar turnos Hora
export const filtrarTurnosHoraService = async (turno) => {
    try {
        const turnos = await filtrarTurnosPorHora(turno);
        return turnos;
    } catch (error) {
        throw error;
    }
}

//funcion filtrar los estados del turno 

export const filtrarEstadosService = async (columnaFiltro) => {
    try {
        const estados = await filtrarTurnosPorEstado(columnaFiltro);
        console.log("El estado en el servicio es: "+ estados[0].id);
        return estados;
    } catch (error) {
        throw error;
    }
}

//funcion para filtrar los turnos por estado ID

export const filtrarTurnosPorEstadoIdService = async (columnaFiltro) => {
    try {
        const turnos = await filtrarEstadoTurnos(columnaFiltro);
        return turnos;
    } catch (error) {
        throw error;
    }
}


//funcion para filtrar los turnos por Paciente ID

export const filtrarTurnosPorPacienteIdService = async (columnaFiltro) => {
    try {
        const turnos = await filtrarPacientesTurnos(columnaFiltro);
        return turnos;
    } catch (error) {
        throw error;
    }
}