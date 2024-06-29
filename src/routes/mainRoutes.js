import express from 'express';
import { home, login, loginPOST } from '../controller/mainController.js';
import { getTurnosController } from '../controller/turnosController.js';
import { verifyToken } from '../middleware/jwt.js';

const router = express.Router();

// Home 
router.get('/calendario', verifyToken , home);
//login 
router.get('/', login); 

//login POST
router.post('/login', loginPOST);

//ruta para obtener todos los turnos
router.get('/turnos', verifyToken, getTurnosController);

export default router;