import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    
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