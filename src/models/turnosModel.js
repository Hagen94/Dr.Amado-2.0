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
        'SELECT * FROM turnos WHERE Id = ?',[id],
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

  //traer turno segun idpaciente
  export const getTurnoByPacienteId = (id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT * FROM turnos WHERE PacienteId = ?',[id],
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

  // Función para insertar un nuevo turno
  export const insertTurno = (turno) => {
    console.log("Asi es el turno enviado: "+turno);
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

  // Función para verificar si el turno ya existe
export const verificarTurno = (turno) => {

  console.log("Asi es el turno enviado: "+turno);
  return new Promise((resolve, reject) => {
    pool.query( `
        SELECT COUNT(*) AS total
      FROM turnos
      WHERE Fecha = ? AND Hora = ?

      `, [turno.Fecha, turno.Hora],  (error, results) => {
        if (error) {
          reject(error);
        } else {
          //Obtengo el turno que coincide con la fecha y la hora
          const totalTurnos = results[0].total;
          //resuelvo la promesa con un true o false
          const existeTurno = totalTurnos > 0;
          console.log("el turno existe: " + existeTurno);
          resolve(existeTurno);
        }
      }
      
    );
  });
}


  // Función para borrar un turno
  export const deleteTurno = (id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        'DELETE FROM turnos WHERE Id = ?',[id],
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
        'UPDATE turnos SET ? WHERE Id = ?',[turno, id],
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


  
  //funcion para filtrar los pacientes de la base de datos
export const filtrarTurnosPorFecha = (columnaFiltro) => {
  return new Promise((resolve, reject) => {
      pool.query(`
          SELECT *
          FROM turnos
          WHERE Fecha LIKE ? 
      `, [ `%${columnaFiltro}%`], (error, results) => {
          if (error) {
              reject(error);
          } else {
              resolve(results);
          }
      });
  });
};
  //funcion para filtrar los pacientes de la base de datos
  export const filtrarTurnosPorHora = (columnaFiltro) => {
    return new Promise((resolve, reject) => {
        pool.query(`
            SELECT *
            FROM turnos
            WHERE Hora LIKE ? 
        `, [ `%${columnaFiltro}%`], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
  };

//Funcion para filtrar los estados Id en la tabla turnos
export const filtrarEstadoTurnos = (columnaFiltro) => {
  return new Promise((resolve, reject) => {
      pool.query(`
          SELECT *
          FROM turnos
          WHERE EstadoId LIKE ?
      `, [ `%${columnaFiltro}%`], (error, results) => {
          if (error) {
              reject(error);
          } else {
            console.log("El estadoId del modelo es: "+results)
              resolve(results);
          }
      });
  });
};
//Funcion para filtrar los PacienteId en la tabla turnos
export const filtrarPacientesTurnos = (columnaFiltro) => {
  return new Promise((resolve, reject) => {
      pool.query(`
          SELECT *
          FROM turnos
          WHERE PacienteId LIKE ?
      `, [ `%${columnaFiltro}%`], (error, results) => {
          if (error) {
              reject(error);
          } else {
            console.log("El estadoId del modelo es: "+results)
              resolve(results);
          }
      });
  });
}


/*----------------------ESTADO TURNOS--------------------------*/
//Funcion para buscar los estados de la tabla estadoturno
export const filtrarTurnosPorEstado = (columnaFiltro) => {
  return new Promise((resolve, reject) => {
      pool.query(`
          SELECT *
          FROM estadoturno
          WHERE LOWER(estado) LIKE ?
      `, [`%${columnaFiltro}%`], (error, results) => {
          if (error) {
              reject(error);
          } else {
              resolve(results);
          }
      });
  });
};


  //traigo el estado de los turnos

  export const getEstadoTurnos = () => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM estadoturno', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };