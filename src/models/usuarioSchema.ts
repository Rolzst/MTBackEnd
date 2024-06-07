import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    auth0Id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    noTarjeta: {
        type: String,
    },
    fechaVencimiento: {
        type: String,
    },
    cvc: {
        type: Number,
    },
    calle: {
        type: String,
    },
    colonia: {
        type: String,
    },
    estado: {
        type: String,
    },
    pais: {
        type: String,
    },
    cp: {
        type: Number,
    }
})

export default mongoose.model("Usuarios", usuarioSchema);