import PropostaComunidade from "../models/PropostaComunidade.js";
import Contato from "../models/Contato.js";

const comunidadeController = {

    async index(req, res){

        try{

            const propostas = await PropostaComunidade.find({ ativo:true })
                .sort({ createdAt:-1 })
                .lean();

            res.render("comunidade/index", { propostas });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    async detalhe(req, res){

        try{

            const proposta = await PropostaComunidade.findOne({ _id:req.params.id, ativo:true }).lean();

            if(!proposta){

                return res.status(404).render("erro/404");

            }

            res.render("comunidade/detalhe", { proposta, enviado:false, erro:null });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    async participar(req, res){

        try{

            const proposta = await PropostaComunidade.findOne({ _id:req.params.id, ativo:true }).lean();

            if(!proposta){

                return res.status(404).render("erro/404");

            }

            const { nome, email, telefone, mensagem } = req.body;

            if(!nome || !email){

                return res.render("comunidade/detalhe",{
                    proposta,
                    enviado:false,
                    erro:"Preencha ao menos nome e e-mail."
                });

            }

            await Contato.create({
                tipo:"comunidade",
                nome,
                email,
                telefone,
                mensagem,
                detalhes:{
                    propostaComunidade: proposta._id,
                    tituloProposta: proposta.titulo
                }
            });

            res.render("comunidade/detalhe", { proposta, enviado:true, erro:null });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    }

};

export default comunidadeController;
