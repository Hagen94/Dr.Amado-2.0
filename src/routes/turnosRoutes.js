import express from 'express';
import { crearTurnoController, deleteTurnoController, getListaTurnos, mostrarFormularioCrearTurno, mostrarFormularioEditarTurno, updateTurnoController } from '../controller/turnosController.js';
import { isAdmin, verifyToken } from '../middleware/jwt.js';

const routerTurnos = express.Router();



/*-----------------TURNOS-----------------*/
//turnos   

//obtener lista de turnos
routerTurnos.get('/', verifyToken, isAdmin,  getListaTurnos )

//mostrar formulario para crear turno
routerTurnos.get('/crearTurno',verifyToken , isAdmin, mostrarFormularioCrearTurno);

//crear turno
routerTurnos.post('/crearTurno',verifyToken, isAdmin,  crearTurnoController);

//borrar turno
routerTurnos.delete('/deleteTurno/:id',verifyToken, isAdmin,  deleteTurnoController);

//actualizar turno
//voy a la ruta de editar
routerTurnos.get('/obtenerTurno/:id',verifyToken, isAdmin,  mostrarFormularioEditarTurno);
//envio el turno editado
routerTurnos.put('/editarTurno/:id', verifyToken, isAdmin, updateTurnoController);


export default routerTurnos;