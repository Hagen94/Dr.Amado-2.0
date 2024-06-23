/* 
funciones que llamen a las funciones 
de tu modelo y realicen cualquier lógica de negocio adicional
*/
import  {deletePaciente, getPacientebyId, getPacientes, insertPaciente, updatePaciente} from '../models/pacientesModel.js'
export const getAllPacientes = async () => {
    try {
        const pacientes = await getPacientes();
        // Aquí puedes realizar cualquier lógica de aplicación adicional
        // Por ejemplo, filtrar los usuarios, mapear los datos, etc.
        return pacientes;
    } catch (error) {
        throw error;
    }
}
//funcion para buscar un paciente por id
export const getPacienteByIdService = async (id) => {
    try {
        const paciente = await getPacientebyId(id);
        return paciente;
    } catch (error) {
        throw error;
    }
}
// Función para insertar un nuevo paciente
export const crearPacienteService = async (paciente) => {
    try {
        const nuevoPaciente = await insertPaciente(paciente);
        return nuevoPaciente;
    } catch (error) {
        throw error;
    }
}
// Función para borrar un paciente
export const deletePacienteService = async (id) => {
    try {
        const pacienteBorrado = await deletePaciente(id);
        return pacienteBorrado;
    } catch (error) {
        throw error;
    }
}
// Función para actualizar un paciente
export const updatePacienteService = async (id, paciente) => {
    try {
        const pacienteActualizado = await updatePaciente(id, paciente);
        return pacienteActualizado;
    } catch (error) {
        throw error;
    }
}