import multer from "multer";
import path from "path";

const storage = multer.diskStorage({

    destination(req,file,cb){

        cb(null,"public/uploads");

    },

    filename(req,file,cb){

        const nome =

            Date.now() +

            path.extname(file.originalname);

        cb(null,nome);

    }

});

const fileFilter = (req,file,cb)=>{

    const permitidos = [

        "image/jpeg",

        "image/png",

        "image/webp"

    ];

    if(permitidos.includes(file.mimetype)){

        cb(null,true);

    }else{

        cb(new Error("Arquivo inválido"));

    }

};

export default multer({

    storage,

    fileFilter,

    limits:{

        fileSize:5*1024*1024

    }

});