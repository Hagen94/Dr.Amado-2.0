// Importar la conexión a la base de datos
//funciones que interactuan con la base de datos directamente

import pool from '../database/connection.js';



// Función para obtener todos los turnos
export const getTurnos = () => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM turnos', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };
  //Función para obtener un turno segun el id
  export const getTurnoById = (id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT * FROM turnos WHERE id = ?',[id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results[0]);
          }
        }
      );
    });
  };

  // Función para insertar un nuevo turno
  export const insertTurno = (turno) => {
    return new Promise((resolve, reject) => {
      pool.query(
        'INSERT INTO turnos SET ?',[turno],
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

  // Función para borrar un turno
  export const deleteTurno = (id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        'DELETE FROM turnos WHERE id = ?',[id],
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

  // Función para actualizar un turno
  export const updateTurno = (id, turno) => {
    return new Promise((resolve, reject) => {
      pool.query(
        'UPDATE turnos SET ? WHERE id = ?',[turno, id],
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