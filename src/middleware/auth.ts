import { Request, Response, NextFunction } from "express";
import {auth} from "express-oauth2-jwt-bearer";
import usuario from "../models/usuarioSchema";
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            userId: string,
            auth0Id: string
        }
    }
}

export const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
});

export const jwtParse = async (
    req: Request,
    res: Response,
    next: NextFunction) => {

    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer')) {
        return res.sendStatus(401)
            .json({ message: 'Autorización denegada' })
    }

    const token = authorization.split(' ')[1];
    try{
        const decoded = jwt.decode(token) as jwt.JwtPayload;
        const auth0Id = decoded.sub;
        const user = await usuario.findOne({ auth0Id });

        if (!user){
            return res.sendStatus(401)
                .json({ message: 'Autorización denegada' })
        }

        req.auth0Id = auth0Id as string;
        req.userId = user._id.toString();
        next();

    }catch (error){
        return res.sendStatus(401)
            .json({ message: 'Aautorización denegada' })
    }
}
