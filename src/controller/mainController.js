/*
controla la respuesta de las rutas 
*/

// controller.js
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import {  getUserByNombreService } from '../services/serviceUsers.js';
//importo jwt
import jwt from "jsonwebtoken"

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

const secretKey = 'Dr. Amado 2024';

 export const loginPOST = async (req, res) => {
    const { Nombre, Clave } = req.body // username
    console.log(Nombre, Clave)
    const userData = await getUserByNombreService(Nombre)// toma de la base de datos el usuario con el username
    console.log(userData)
    if (userData) { // ¿Ha obtenido algo de la base de datos?
        if (userData.Nombre == Nombre && userData.Clave == Clave) {
          //express session -->  req.session.isAdmin = true;
          //jwt
        const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60)
                // custom claims
                ,rol: userData.PerfilId // Agregamos el rol al token
            }, secretKey )
            res.cookie('token', token) //toma el token y crea una cookie clave valor
            console.log("entro biien")
            console.log(token)
            res.redirect('/calendario')
        } else {
            console.log("entro pero mal")
            res.redirect('/')
        }
    } else {
        console.log("no entro")
        res.redirect('/')
    }
}