import express from 'express';
import productoController from "../controllers/productoController";


const route = express.Router();

route.get('/seeproduct/:id', productoController.getProducto)
route.post('/addproduct', productoController.createProducto);
route.put('/updateproduct/:id', productoController.updateProducto);
route.delete('/deleteproduct/:id', productoController.deleteProducto);

export default route;

