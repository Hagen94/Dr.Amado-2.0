// Importar la conexión a la base de datos
//funciones que interactuan con la base de datos directamente

import pool from '../database/connection.js';



// Función para obtener todos los usuarios
export const getPacientes = () => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM paciente', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };

// Función para obtener un solo paciente
export const getPacientebyId = (id) => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM paciente WHERE Id = ?', [id],  
         (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  };



// Función para insertar un nuevo paciente
export const insertPaciente = (paciente) => {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO paciente SET ?', [paciente], 
        (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };

  // Función para borrar un paciente
  export const deletePaciente = (id) => {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM paciente WHERE Id = ?', [id], 
        (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };

  // Función para actualizar un paciente
  export const updatePaciente = (id, paciente) => {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE paciente SET ? WHERE Id = ?', [paciente, id], 
        (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };

//funcion para traer las obras sociales de la base de datos
export const getObraSocial = () => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM obrasocial', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };

  //funcion para filtrar los pacientes de la base de datos
  export const filtrarPacientesPorTodos = (columnaFiltro) => {
    return new Promise((resolve, reject) => {
        pool.query(`
            SELECT *
            FROM Paciente
            WHERE Nombre LIKE ? OR
                  DNI LIKE ? OR
                  ObraSocialId LIKE ? OR
                  NumeroAsociado LIKE ? OR
                  Direccion LIKE ? OR
                  Telefono LIKE ?
        `, [`%${columnaFiltro}%`, `%${columnaFiltro}%`, `%${columnaFiltro}%`, `%${columnaFiltro}%`, `%${columnaFiltro}%`, `%${columnaFiltro}%`], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};


//funcion para filtrar los pacientes de por nombre
  
export const filtrarPacientesPorNombre = (columnaFiltro) => {
  return new Promise((resolve, reject) => {
      pool.query(`
          SELECT *
          FROM Paciente
          WHERE Nombre LIKE ?
      `, [ `%${columnaFiltro}%`], (error, results) => {
          if (error) {
              reject(error);
          } else {
              resolve(results);
          }
      });
  });
};
  