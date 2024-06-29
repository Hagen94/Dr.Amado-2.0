import express from 'express';
import { crearTurnoController, deleteTurnoController, getListaTurnos, mostrarFormularioCrearTurno, mostrarFormularioEditarTurno, updateTurnoController } from '../controller/turnosController.js';

const routerTurnos = express.Router();



/*-----------------TURNOS-----------------*/
//turnos   

//obtener lista de turnos
routerTurnos.get('/', getListaTurnos )

//mostrar formulario para crear turno
routerTurnos.get('/crearTurno', mostrarFormularioCrearTurno);

//crear turno
routerTurnos.post('/crearTurno', crearTurnoController);

//borrar turno
routerTurnos.delete('/deleteTurno/:id', deleteTurnoController);

//actualizar turno
//voy a la ruta de editar
routerTurnos.get('/obtenerTurno/:id', mostrarFormularioEditarTurno);
//envio el turno editado
routerTurnos.put('/editarTurno/:id', updateTurnoController);


export default routerTurnos;