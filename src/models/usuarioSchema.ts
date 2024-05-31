import mongoose from "mongoose";

const tarjetaSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    noTarjeta: {
        type: String,
        required: true,
    },
    fechaVencimiento: {
        type: String,
        required: true,
    },
    cvc: {
        type: Number,
        required: true,
    }
})

const usuarioSchema = new mongoose.Schema({
    auth0Id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    tarjetas: [tarjetaSchema],
})

export default mongoose.model("Usuarios", usuarioSchema);