import { MongoClient } from "mongodb";

export default async function conectarAoBanco(STRING_CONEXAO) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(STRING_CONEXAO);
        console.log("Conectando ao banco...");
        await mongoClient.connect();
        console.log("Conectado!");

        return mongoClient;
    } catch (erro) {
        console.error("Falha na conexão.", erro);
        process.exit();
    }
}
