import express from "express";

import adminConsoleController from "../controllers/adminConsoleController.js";

import auth from "../middleware/auth.js";
import { soMaster } from "../config/auth.js";

const router = express.Router();

// Logs gerais
router.get("/logs", auth, soMaster, adminConsoleController.logs);

// Propostas aprovadas/reprovadas
router.get("/propostas", auth, soMaster, adminConsoleController.propostasConsole);
router.get("/propostas/:id", auth, soMaster, adminConsoleController.propostaDetalhe);

// Usuários (painel categorizado)
router.get("/usuarios", auth, soMaster, adminConsoleController.usuariosConsole);
router.get("/usuarios/:id/json", auth, soMaster, adminConsoleController.usuarioJson);
router.post("/usuarios/:id/ativo", auth, soMaster, adminConsoleController.alternarAtivo);
router.post("/usuarios/:id/excluir", auth, soMaster, adminConsoleController.excluirUsuario);

// Solicitações de usuário (feitas pelo STAFF)
router.get("/solicitacoes", auth, soMaster, adminConsoleController.solicitacoes);
router.post("/solicitacoes/:id/aprovar", auth, soMaster, adminConsoleController.aprovarSolicitacao);
router.post("/solicitacoes/:id/reprovar", auth, soMaster, adminConsoleController.reprovarSolicitacao);

// Códigos de acesso
router.get("/codigos", auth, soMaster, adminConsoleController.codigosAcesso);
router.post("/codigos", auth, soMaster, adminConsoleController.gerarCodigo);
router.post("/codigos/:id/revogar", auth, soMaster, adminConsoleController.revogarCodigo);

// Área de pesquisa e avaliação Lyxus (Pique Michelan)
router.get("/avaliacoes", auth, soMaster, adminConsoleController.avaliacoesConsole);
router.get("/avaliacoes/novo", auth, soMaster, adminConsoleController.avaliacaoNovaTela);
router.post("/avaliacoes", auth, soMaster, adminConsoleController.avaliacaoCriar);
router.get("/avaliacoes/:id/editar", auth, soMaster, adminConsoleController.avaliacaoEditarTela);
router.post("/avaliacoes/:id", auth, soMaster, adminConsoleController.avaliacaoAtualizar);
router.post("/avaliacoes/:id/excluir", auth, soMaster, adminConsoleController.avaliacaoExcluir);

// Aba de propostas à comunidade
router.get("/comunidade", auth, soMaster, adminConsoleController.comunidadeConsole);
router.get("/comunidade/novo", auth, soMaster, adminConsoleController.comunidadeNovaTela);
router.post("/comunidade", auth, soMaster, adminConsoleController.comunidadeCriar);
router.get("/comunidade/:id/editar", auth, soMaster, adminConsoleController.comunidadeEditarTela);
router.post("/comunidade/:id", auth, soMaster, adminConsoleController.comunidadeAtualizar);
router.post("/comunidade/:id/excluir", auth, soMaster, adminConsoleController.comunidadeExcluir);

export default router;
