import { Request, Response, NextFunction } from "express";
import {body, validationResult} from "express-validator";

const handleValidationErrors = async (
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400)
            .json({ errors: errors.array() });
    }
    next();
} //Fin de handleValidationErrors

export const validateUserRequest = [
    body("tarjetas").isArray()
        .withMessage("Las tarjetas son requeridas"),
    body("tarjetas.*.nombre").notEmpty()
        .withMessage("El nombre del propietario es requerido"),
    body("tarjetas.*.noTarjeta").isInt({min: 16})
        .withMessage("El número de tarjeta es requerido"),
    body("tarjetas.*.fechaVencimiento").isInt({min: 4})
        .withMessage("La fecha de vencimiento es requerida"),
    body("tarjetas.*.cvc").isInt({min: 3, max: 3})
        .withMessage("El cvc debe tener 3 números"),

    handleValidationErrors
]; //Fin del validateUserRequest
