/* 
funciones que llamen a las funciones 
de tu modelo y realicen cualquier lógica de negocio adicional

*/

// service.js
import {deleteUser, filtrarUsuariosPorTodos, getEstadosUsuarios, getPerfiles, getUserByNombre, getUsers, getUsersById, insertUser, updateUser} from '../models/usuariosModel.js'

export const getAllUsers = async () => {
  try {
    const users = await getUsers();
    // Aquí puedes realizar cualquier lógica de negocio adicional
    // Por ejemplo, filtrar los usuarios, mapear los datos, etc.
    return users;
  } catch (error) {
    throw error;
  }
};

//obtener usuario para validar 
export const getUserByNombreService = async (Nombre) => {
  try {
      const user = await getUserByNombre(Nombre);
      return user;
  } catch (error) {
      throw error;
  }
}

// crear usuario
export const crearUsuarioService = async (user) => {
  try {
      const newUser = await insertUser(user);
      return newUser;
  } catch (error) {
      throw error;
  }
}
//borrar usuario
export const deleteUsuarioService = async (id) => {
  try {
      const userBorrado = await deleteUser(id);
      return userBorrado;
  } catch (error) {
      throw error;
  }
}

//traigo el usuario por id
export const getUsuarioService = async (id) => {
  try {
      const user = await getUsersById(id);
      return user;
  } catch (error) {
      throw error;
  }
}

//actualizar usuario
export const updateUsuarioService = async (id, user) => {
  try {
      const userActualizado = await updateUser(id, user); 
      return userActualizado;
  } catch (error) { 
      throw error;
  } 
}

//obtengo todos los estados de usuarios 

export const getEstadosTurnosService = async () => {
  try {
      const estados = await getEstadosUsuarios();
      return estados;
  } catch (error) {
      throw error;
  }
}

//obtengo todos los perfiles de usuarios 

export const getPerfilesService = async () => {
  try {
      const perfiles = await getPerfiles();
      return perfiles;
  } catch (error) {
      throw error;
  }
}

//obtengo el usuario segun el filtro 

export const filtrarUsuariosService = async (columnaFiltro) => {
  try {
      const filtrado = await filtrarUsuariosPorTodos(columnaFiltro);
      return filtrado;
  } catch (error) {
      throw error;
  }
}