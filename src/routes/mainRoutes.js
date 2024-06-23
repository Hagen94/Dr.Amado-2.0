import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { home, login } from '../controller/mainController.js';
import { createUser, deleteUsuarioController, getUsuariosController, mostrarFormularioCrearUsuario, mostrarFormularioEditarUsuario } from '../controller/usersController.js';
import { crearPacienteController, deletePacienteController, mostrarFormularioCrearPaciente, mostrarFormularioEditarPaciente, pacientes, updatePacienteController } from '../controller/pacientesController.js';
import { crearTurnoController, deleteTurnoController, getListaTurnos, getTurnosController, mostrarFormularioCrearTurno, mostrarFormularioEditarTurno, updateTurnoController } from '../controller/turnosController.js';

const router = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

/*--------MAINCONTROLLER-----------*/
// Home 
router.get('/', home);
//login 
router.get('/login', login); 
/*--------------------------------*/
/*------------USUARIOS-------------*/
router.get('/usuarios',getUsuariosController);

//voy a la ruta de crear usuario
router.get('/crearUsuario',  mostrarFormularioCrearUsuario);
//crear usuario
router.post('/crearUsuario', createUser);

//borrar usuario
router.delete('/deleteUser/:id',deleteUsuarioController);


//voy a la ruta de editar
router.get('/obtenerUsuario/:id', mostrarFormularioEditarUsuario );

//editar usuario
router.put('/editarUsuario/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '..','public', 'user.html'));
})
/*-------------------------------------*/
/*-----------PACIENTES----------------*/

//pacientes

router.get('/pacientes', pacientes);

//crear paciente
//voy a la ruta de crear paciente
router.get('/crearPaciente', mostrarFormularioCrearPaciente );
router.post('/crearPaciente', crearPacienteController);

//borrar paciente
router.delete('/deletePaciente/:id', deletePacienteController)

//actualizar paciente
//voy a la ruta de editar
router.get('/editarPaciente/:id', mostrarFormularioEditarPaciente );
//envio el paciente editado
router.put('/editarPaciente/:id', updatePacienteController);
/*---------------------------*/
/*-----------------TURNOS-----------------*/
//turnos   
//obtener todos los turno

//ruta para renderizar el calendario
router.get("/calendario",(req,res)=>{
    res.render("index.ejs");
});
//ruta para obtener todos los turnos
router.get('/turnos',  getTurnosController);

//obtener lista de turnos
router.get('/listaTurnos', getListaTurnos )

//mostrar formulario para crear turno
router.get('/crearTurno', mostrarFormularioCrearTurno);

//crear turno
router.post('/crearTurno', crearTurnoController);

//borrar turno
router.delete('/deleteTurno/:id', deleteTurnoController);

//actualizar turno
//voy a la ruta de editar
router.get('/obtenerTurno/:id', mostrarFormularioEditarTurno );
//envio el turno editado
router.put('/editarTurno/:id', updateTurnoController);


export default router;