import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
//importo mainRoutes donde estan las rutas
import mainRoutes from './src/routes/mainRoutes.js';
//importo dotenv para usar variables de entorno
import { config } from 'dotenv';
config();
//importo body parser
import bodyParser from 'body-parser';
//importo method override
import methodOverride from 'method-override';

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

//agrego method override para metodos no soportados como put o delete
app.use(methodOverride('_method'));
app.use('/', mainRoutes);


/*-----Errores 404----- */
/*
app.use((req, res, next) => {
  res.status(404).render('404', { title: '404' });
});
*/
// Servidor
app.listen(PUERTO, () => console.log("Servidor escuchando en http://localhost:3000"));
