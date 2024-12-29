import { getTodosOsPosts, createPost, updatePost } from "../models/postsModel.js";
import fs from "fs";
import gerarDescComGemini from "../services/geminiService.js"

export async function listarPosts(req, res) {
    const result = await getTodosOsPosts();
    res.status(200).json(result);
};

export async function newPost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await createPost(novoPost);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição."});
    }
}

export async function uploadImg(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    }

    try {
        const postCriado = await createPost(novoPost);
        const  imgAtualizada = `uploads/${postCriado.insertedId}.jpg`;
        fs.renameSync(req.file.path, imgAtualizada);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição."});
    }
}

export async function updateNewPost(req, res) {
    const id = req.params.id;
    const urlImg = `http://localhost:3000/${id}.jpg`;

    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.jpg`);
        const descricao = await gerarDescComGemini(imageBuffer);

        const post = {
            imgUrl: urlImg,
            descricao: descricao,
            alt: req.body.alt
        }

        const postAtualizado = await updatePost(id, post);
        res.status(200).json(postAtualizado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição."});
    }
}