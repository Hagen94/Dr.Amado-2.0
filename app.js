import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
//importo archivos donde estan las rutas
import mainRoutes from './src/routes/mainRoutes.js';
import routerPacientes from './src/routes/pacientesRoutes.js';
import routerTurnos from './src/routes/turnosRoutes.js';
import routerUuarios from './src/routes/usuariosRoutes.js';
//importo dotenv para usar variables de entorno
import { config } from 'dotenv';
config();
//importo body parser
import bodyParser from 'body-parser';
//importo method override
import methodOverride from 'method-override';
//importo cookie parser
import cookieParser from 'cookie-parser'; //jwt
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * formateo para usar ejs
 */
const PUERTO = process.env.PUERTO || 3000;


const app = express();
app.set('view engine' , 'ejs');
app.set('views', path.join(__dirname ,
'view' ));
// Agregamos ruta de carpeta pública
app.use(express.static(path.join(__dirname, 'public')));
//Agregamos body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//cofiguracion cookie-parser	para almacenar cookies cuando valido el token
app.use(cookieParser());

//agrego method override para metodos no soportados como put o delete
app.use(methodOverride('_method'));
app.use('/', mainRoutes);
app.use('/pacientes', routerPacientes);
app.use('/listaTurnos', routerTurnos);
app.use('/usuarios', routerUuarios);


/*-----Errores 404----- */
/*
app.use((req, res, next) => {
  res.status(404).render('404', { title: '404' });
});
*/
// Servidor
app.listen(PUERTO, () => console.log("Servidor escuchando en http://localhost:3000"));
