import { Request, Response } from 'express';
import Usuario from "../models/usuarioSchema";


const getUsuario = async (req: Request, res: Response) =>
{
    try
    {
        const id = req.params.id;
        const usuario = await Usuario.findById(id);
        console.log(usuario);
        res.status(200).json(usuario);
    }catch(err)
    {
        res.status(500).json({ message: "Error al traer el usuario" });
    }
}

const createUsuario = async (req: Request, res: Response) =>
{
    try{
        const {auth0Id} = req.body;
        const existingUsuario = await Usuario.findOne({auth0Id} )
        if (existingUsuario) {
            return res.status(200)
                .send();
        }
        const newUsuario = new Usuario(req.body);
        await newUsuario.save();

        res.status(201).json(newUsuario.toObject());

    } catch (error){
        console.error(error);
        res.status(500)
            .json({error: "Error al crear usuario"});
    }
}

const updateUsuario = async (req: Request, res: Response) =>
{
    try {
        const { noTarjeta, fechaVencimiento, cvc, calle, colonia, estado, pais, cp } = req.body;
        const user = await Usuario.findById(req.userId);

        if (!user){
            return res.status(404)
                .json({ message: 'Usuario no encontrado' })
        }
        user.noTarjeta = noTarjeta;
        user.fechaVencimiento = fechaVencimiento;
        user.cvc = cvc;
        user.calle = calle;
        user.colonia = colonia;
        user.estado = estado;
        user.pais = pais;
        user.cp = cp;

        await user.save();
        res.send(user);

    } catch (error) {
        console.error(error);
        res.status(500)
            .json({ message: 'Error al actualizar el usuario' })
    }
}

const deleteUsuario = async (req: Request, res: Response) =>
{
    try
    {
        const id = req.params.id;
        await Usuario.findByIdAndDelete(id);
        res.status(200).json({ message: "Se eliminó correctamente el usuario" });

    } catch (error)
    {
        res.status(500).json({ message: "Error al eliminar el usuario" });
    }
}

export default
{
    getUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario
}