import mongoose from "mongoose";

// ==========================================================
// "Aba de propostas à comunidade": iniciativas/propostas
// abertas da LYXUS para a comunidade em geral — diferente da
// Proposta (models/Proposta.js), que é individual e vinculada
// a um cliente específico já cadastrado.
//
// Cadastro exclusivo do master, em /dashboard/console/comunidade.
// Visível publicamente em /comunidade.
// ==========================================================

const propostaComunidadeSchema = new mongoose.Schema({

    titulo:{
        type:String,
        required:true
    },

    categoria:{
        type:String,
        default:""
        // ex: "Parceria", "Projeto social", "Condição especial"
    },

    resumo:{
        type:String,
        default:""
        // linha curta pro card da listagem
    },

    descricao:{
        type:String,
        required:true
        // texto completo, exibido na página de detalhe
    },

    prazoParticipacao:{
        type:String,
        default:""
        // texto livre, ex: "Até 30/09/2026" ou "Vagas limitadas"
    },

    textoBotao:{
        type:String,
        default:"Quero participar"
    },

    status:{
        type:String,
        enum:["aberta","encerrada"],
        default:"aberta"
    },

    ativo:{
        type:Boolean,
        default:true
        // permite ocultar da listagem pública sem excluir
    },

    criadoPor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario",
        default:null
    }

},{
    timestamps:true
});

export default mongoose.model("PropostaComunidade", propostaComunidadeSchema);
