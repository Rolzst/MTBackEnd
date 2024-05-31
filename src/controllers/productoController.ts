import { Request, Response } from 'express';
import Producto from "../models/productoSchema";

const getProducto = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const producto = await Producto.findById(id);
        console.log(producto);
        res.status(200).json(producto);
    }catch(err) {
        res.status(500).json({ message: "Error al traer el producto" });
    }
}

const createProducto = async (req: Request, res: Response) => {
    try{
        const body = req.body;
        const existingProducto = await Producto.findOne({ body });

        if (existingProducto) {
            return res.status(200).json(existingProducto);
        }
        const newProducto = new Producto(req.body);
        await newProducto.save();

        res.status(201).json(newProducto.toObject());

    } catch (error){
        console.error(error);
        res.status(500)
            .json({error: "Error al crear el producto"});
    }
}

const updateProducto = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await Producto.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: "Se actualizó el producto" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el producto" });
    }
}

const deleteProducto = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await Producto.findByIdAndDelete(id);
        res.status(200).json({ message: "Se eliminó correctamente el producto" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el producto" });
    }
}

export default {
    getProducto,
    createProducto,
    updateProducto,
    deleteProducto
}