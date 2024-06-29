import express from 'express';
import { home, login } from '../controller/mainController.js';
import { getTurnosController } from '../controller/turnosController.js';

const router = express.Router();

// Home 
router.get('/', home);
//login 
router.get('/login', login); 

//ruta para obtener todos los turnos
router.get('/turnos',  getTurnosController);

export default router;