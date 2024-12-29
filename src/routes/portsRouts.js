import express from "express";
import multer from "multer";
import { listarPosts, newPost, uploadImg, updateNewPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions ={
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ dest: "./uploads", storage });

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));
    app.get("/posts", listarPosts);
    app.post("/posts", newPost);
    app.post("/upload", upload.single("Imagem"), uploadImg);
    app.put("/upload/:id", updateNewPost);
};

export default routes;
