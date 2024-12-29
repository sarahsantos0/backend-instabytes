import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosOsPosts(){
    const db = conexao.db("Imersao-istabytes");
    const colecao = db.collection("posts");
    
    return colecao.find().toArray();
};

export async function createPost(novoPost) {
    const db = conexao.db("Imersao-istabytes");
    const colecao = db.collection("posts");
    
    return colecao.insertOne(novoPost);
}

export async function updatePost(id, post) {
    const db = conexao.db("Imersao-istabytes");
    const colecao = db.collection("posts");
    const objectId = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objectId)}, {$set: post});
}
