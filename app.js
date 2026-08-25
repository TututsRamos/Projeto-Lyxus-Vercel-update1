import dotenv from "dotenv";
dotenv.config();

import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import dns from "dns";

import { conectarBanco } from "./config/bd.js";
import { criarUsuarioMestre } from "./utils/seedMestre.js";
import { criarContasPadraoEquipe } from "./utils/seedEquipePadrao.js";

// Middlewares
import locals from "./middleware/locals.js";

// Rotas
import publicRoutes from "./routes/public.js";
import institucionalRoutes from "./routes/institucional.js";
import adminRoutes from "./routes/admin.js";
import blogRoutes from "./routes/blog.js";
import categoriaRoutes from "./routes/categoria.js";
import configRoutes from "./routes/config.js";
import postRoutes from "./routes/post.js";
import usuarioRoutes from "./routes/usuario.js";
import pacoteRoutes from "./routes/pacote.js";
import pagamentoRoutes from "./routes/pagamento.js";
import staffRoutes from "./routes/staff.js";
import painelRoutes from "./routes/painel.js";
import adminConsoleRoutes from "./routes/adminConsole.js";
import apiRoutes from "./routes/api.js";
import suporteRoutes from "./routes/suporte.js";
import destaqueRoutes from "./routes/destaque.js";
import avaliacaoRoutes from "./routes/avaliacao.js";
import contratoRoutes from "./routes/contrato.js";
import contratoModeloRoutes from "./routes/contratoModelo.js";
import contratoClienteRoutes from "./routes/contratoCliente.js";
import comunidadeRoutes from "./routes/comunidade.js";

dns.setServers([
    "8.8.8.8",
    "1.1.1.1"
]);

dns.setDefaultResultOrder("ipv4first");

await conectarBanco();
await criarUsuarioMestre();
await criarContasPadraoEquipe();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ======================================
// CONFIGURAÇÕES
// ======================================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// ======================================
// SESSÃO
// ======================================

if(!process.env.SESSION_SECRET){

    console.warn("⚠️ SESSION_SECRET não definido no .env — usando valor padrão inseguro. Defina SESSION_SECRET em produção.");

}

app.set("trust proxy", 1);

app.use(session({

    secret: process.env.SESSION_SECRET || "lixus",

    resave: false,

    saveUninitialized: false,

    store: MongoStore.create({

        client: mongoose.connection.getClient()

    }),

    cookie: {

        maxAge: 1000 * 60 * 60 * 24,

        httpOnly: true,

        sameSite: "lax",

        secure: process.env.NODE_ENV === "production"

    }

}));

// ======================================
// VARIÁVEIS GLOBAIS
// ======================================

app.use(locals);

// ======================================
// ROTAS PÚBLICAS
// ======================================

app.use("/", publicRoutes);

app.use("/", institucionalRoutes);

app.use("/blog", blogRoutes);

app.use("/avaliacao", avaliacaoRoutes);

app.use("/comunidade", comunidadeRoutes);

app.use("/contrato", contratoClienteRoutes);

// ======================================
// DASHBOARD
// ======================================

app.use("/dashboard", adminRoutes);

app.use("/dashboard/categorias", categoriaRoutes);

app.use("/dashboard/posts", postRoutes);

app.use("/dashboard/configuracoes", configRoutes);

app.use("/dashboard/usuarios", usuarioRoutes);

app.use("/dashboard/pacotes", pacoteRoutes);

app.use("/dashboard/pagamentos", pagamentoRoutes);

app.use("/dashboard/suporte", suporteRoutes);

app.use("/dashboard/destaque", destaqueRoutes);

app.use("/dashboard/contratos", contratoRoutes);

app.use("/dashboard/contrato-sumario", contratoModeloRoutes);

// ======================================
// STAFF e PAINEL DO CLIENTE
// ======================================

app.use("/staff", staffRoutes);

app.use("/painel", painelRoutes);

app.use("/dashboard/console", adminConsoleRoutes);

// ======================================
// API
// ======================================

app.use("/api", apiRoutes);

// ======================================
// ERRO 404
// ======================================

app.use((req, res) => {

    res.status(404).render("erro/404", {

        titulo: "Página não encontrada"

    });

});

// ======================================
// ERRO 500
// ======================================

app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).render("erro/500", {

        titulo: "Erro interno"

    });

});

// ======================================
// SERVIDOR
// ======================================

const PORT = process.env.PORT || 3000;

// Na Vercel o app roda como função serverless (o próprio Vercel
// chama o app exportado abaixo) — só sobe com app.listen quando
// rodando localmente ou em outro host tradicional.
if (!process.env.VERCEL) {

    app.listen(PORT, () => {

        console.log(`
========================================

        LYXUS HOLDING

Servidor iniciado com sucesso!

http://localhost:${PORT}

========================================
`);

    });

}

export default app;