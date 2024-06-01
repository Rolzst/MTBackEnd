import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import mongoose from 'mongoose';
import usuarioRoute from "./routes/usuarioRoute";
import productoRoute from "./routes/productoRoute";
import {Request, Response} from "express";

mongoose.connect(process.env.DB_CONNECTION_STRING as string)
    .then(() => {
        console.log("Base de datos conectada")
    })

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))

app.get('/health', async(req: Request, res:Response) => {
    res.send({message: "Servidor OK!!"})
})

app.use('/api/users/', usuarioRoute);
app.use('/api/products/', productoRoute);


app.listen(3000, () =>{
    console.log("App corriendo en el puerto 3000");
})

function morgan(arg0: string): any {
    throw new Error('Function not implemented.');
}
