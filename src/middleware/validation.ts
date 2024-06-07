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

    body("noTarjeta").isInt({min: 16})
        .withMessage("El número de tarjeta es requerido"),
    body("fechaVencimiento").isInt({min: 4})
        .withMessage("La fecha de vencimiento es requerida"),
    body("cvc").isInt({min: 3})
        .withMessage("El cvc debe tener 3 números"),
    body("calle").isString()
        .notEmpty()
        .withMessage("La calle debe ser string"),
    body("colonia").isString()
        .notEmpty()
        .withMessage("La colonia debe ser string"),
    body("estado").isString()
        .notEmpty()
        .withMessage("El estado debe ser string"),
    body("pais").isString()
        .notEmpty()
        .withMessage("El pais debe ser string"),
    body("cp").isInt({min: 8})
        .withMessage("El código postal debe tener 8 números"),
    handleValidationErrors
]; //Fin del validateUserRequest
