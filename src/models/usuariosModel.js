// Importar la conexión a la base de datos
//funciones que interactuan con la base de datos directamente

import pool from '../database/connection.js';

// Función para obtener todos los usuarios
export const getUsers = () => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM usuario', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };

  //funcion para traer el usuario para verficar el login 
export function getUserByNombre(Nombre) {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM usuario WHERE Nombre = ?',
      [Nombre],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      }
    );
  });
}

  // Función para insertar un nuevo usuario
  export const insertUser = (user) => {
    return new Promise((resolve, reject) => {
      pool.query(
        'INSERT INTO usuario SET ?',[user],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  };
  // Función para borrar un usuario
  export const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        'DELETE FROM usuario WHERE Id = ?',
        [id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  }
// Función para obtener un usuario por su ID
  export const getUsersById = (id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT * FROM usuario WHERE Id = ?',
        [id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results[0]);
          }
        }
      );
    });
  }

  // Función para actualizar un usuario
  export const updateUser = (id, user) => {
    return new Promise((resolve, reject) => {
      pool.query(
        'UPDATE usuario SET ? WHERE Id = ?',
        [user, id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  //traigo todos los estados

  export const getEstadosUsuarios = () => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM estadousuario', 
        (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  //traigo todos los estados perfil 

  export const getPerfiles = () => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM perfil',
         (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  //funcion para filtrar los pacientes de la base de datos
export const filtrarUsuariosPorTodos = (columnaFiltro) => {
  return new Promise((resolve, reject) => {
      pool.query(`
          SELECT *
          FROM usuario
          WHERE Nombre LIKE ? OR
                Clave LIKE ? OR
                EstadoId LIKE ? OR
                PerfilId LIKE ? 
      `, [`%${columnaFiltro}%`, `%${columnaFiltro}%`, `%${columnaFiltro}%`, `%${columnaFiltro}%`], (error, results) => {
          if (error) {
              reject(error);
          } else {
              resolve(results);
          }
      });
  });
};