 // Cambia esto por tu propia clave secreta
 /*
*instalamos npm install jsonwebtoken
*npm install cookie-parser
*/
import jwt from 'jsonwebtoken';
const secretKey = 'Dr. Amado 2024';



export const verifyToken =  (req, res, next)  =>{
    const token = req.cookies.token
    console.log("req.cookies", req.cookies)
    console.log("token", token)

    if(!token){
    return res.redirect('/')//login
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        //Adjunto el objeto decoded al objeto "request" para obtener luego el custom claim
        req.decoded = decoded;
        next()
    } catch (error) {
        return res.redirect('/')//login
    }

    
}


// Middleware para verificar si el usuario es administrador
export const isAdmin = (req, res, next) => {
    const userRole = req.decoded?.rol; // Obtén el rol del token decodificado

    if (userRole === 1) {
        next(); // Usuario es administrador, permite el acceso
    } else {
        res.status(403).send('Acceso denegado'); // Usuario no es administrador
    }
};