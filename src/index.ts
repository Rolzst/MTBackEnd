import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import mongoose from 'mongoose';
import usuarioRoute from "./routes/usuarioRoute";
import productoRoute from "./routes/productoRoute";

mongoose.connect(process.env.DB_CONNECTION_STRING as string)
    .then(() => {
        console.log("Base de datos conectada")
    })

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/users/', usuarioRoute);
app.use('/api/products/', productoRoute);


app.listen(3000, () =>{
    console.log("App corriendo en el puerto 3000");
})