import express from 'express';
import usuarioController from "../controllers/usuarioController";
import {jwtCheck, jwtParse} from "../middleware/auth";
import {validateUserRequest} from "../middleware/validation";


const route = express.Router();

route.get('/seeuser/:id', usuarioController.getUsuario)
route.post('/adduser', jwtCheck, usuarioController.createUsuario);
route.put('/updateuser', jwtCheck, jwtParse, validateUserRequest, usuarioController.updateUsuario);
route.delete('/deleteuser/:id', usuarioController.deleteUsuario);

export default route;

