import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    id_producto: {
        type: Number,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },

});

export default mongoose.model("Productos", productoSchema);