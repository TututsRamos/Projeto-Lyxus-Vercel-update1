import Configuracao from "../models/Configuracao.js";

const configController = {

    // ===========================
    // TELA DE CONFIGURAÇÕES
    // ===========================

    async mostrar(req,res){

        try{

            let configuracao = await Configuracao.findOne();

            if(!configuracao){

                configuracao = await Configuracao.create({
                    empresa:"principal"
                });

            }

            res.render("dashboard/configuracoes/index",{

                configuracao

            });

        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    },

    // ===========================
    // ATUALIZAR
    // ===========================

    async atualizar(req,res){

        try{

            let configuracao = await Configuracao.findOne();

            if(!configuracao){

                configuracao = new Configuracao();

            }

            configuracao.nomeEmpresa = req.body.nomeEmpresa;

            configuracao.descricao = req.body.descricao;

            configuracao.telefone = req.body.telefone;

            configuracao.whatsapp = req.body.whatsapp;

            configuracao.email = req.body.email;

            configuracao.instagram = req.body.instagram;

            configuracao.facebook = req.body.facebook;

            configuracao.linkedin = req.body.linkedin;

            configuracao.playStore = req.body.playStore;

            configuracao.appStore = req.body.appStore;

            configuracao.versaoApp = req.body.versaoApp;

            configuracao.corPrimaria = req.body.corPrimaria;

            configuracao.corSecundaria = req.body.corSecundaria;

            configuracao.pixChave = req.body.pixChave;

            configuracao.pixNomeRecebedor = req.body.pixNomeRecebedor;

            configuracao.pixCidade = req.body.pixCidade;

            configuracao.tawkDashboardUrl = req.body.tawkDashboardUrl;

            if(req.files?.logo){

                configuracao.logo = req.files.logo[0].filename;

            }

            if(req.files?.banner){

                configuracao.banner = req.files.banner[0].filename;

            }

            await configuracao.save();

            res.redirect("/dashboard/configuracoes");

        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    }

};

export default configController;