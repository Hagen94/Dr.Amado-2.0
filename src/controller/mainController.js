/*
controla la respuesta de las rutas 
*/

// controller.js
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const login = (req, res) => {
    res.render(path.resolve(__dirname, '../../view/login.ejs'));
};

/*
traigo los usuarios y los muestro en el home
*/ 

export const home = async (req, res) => {
    res.render(path.resolve(__dirname, '../../view/index.ejs'));
}