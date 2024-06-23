/* 
funciones que llamen a las funciones 
de tu modelo y realicen cualquier lógica de negocio adicional

*/

import { deleteTurno, getTurnoById, getTurnos, insertTurno, updateTurno } from "../models/turnosModel.js";



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

//Función para insertar un nuevo turno

export const crearTurnoService = async (turno) => {
    try {
        const nuevoTurno = await insertTurno(turno);
        return nuevoTurno;
    } catch (error) {
        throw error;
    }
}


//funcion para borrar un turno
export const deleteTurnoService = async (id) => {
    try {
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