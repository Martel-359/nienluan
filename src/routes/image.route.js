import imageController from "../controllers/image.controller";
import express from "express";
import multer from "multer";
import auth from "../middleware/authJwt.js"
const storage = multer.diskStorage({});
const upload = multer({ storage });

let router = express.Router();

let initImageRoutes = (app) => {
    router.get('/image/get/:id',imageController.getImageByProductId);
    router.post('/image/upload/:id',auth.verifyToken,auth.isAdmin,upload.array('files',10),imageController.uploadImage);
    router.delete('/image/delete/:id',auth.verifyToken,auth.isAdmin,imageController.deleteImage);
    return app.use("/api/v1", router);
}

export default initImageRoutes;
