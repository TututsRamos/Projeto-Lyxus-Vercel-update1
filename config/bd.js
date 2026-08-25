import mongoose from "mongoose";

export async function conectarBanco() {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MongoDB conectado.");

    } catch (err) {

        console.error("ERRO MONGOOSE");
        console.error(err);

        process.exit(1);

    }

}