// Abrir/fechar sidebar no mobile

const menuDash = document.querySelector(".dash-menu-mobile");
const sidebarDash = document.querySelector(".sidebar");

if(menuDash && sidebarDash){

    menuDash.addEventListener("click", ()=>{

        sidebarDash.classList.toggle("aberta");

    });

}

// Confirmação antes de excluir qualquer item do painel

document.querySelectorAll(".tabela-acoes a.excluir").forEach(link=>{

    link.addEventListener("click", (e)=>{

        const confirmado = confirm("Tem certeza que deseja excluir este item? Essa ação não pode ser desfeita.");

        if(!confirmado){
            e.preventDefault();
        }

    });

});

// Preview de imagem antes do upload (usado nos formulários do dashboard)

document.querySelectorAll("input[type='file'][data-preview]").forEach(input=>{

    input.addEventListener("change", ()=>{

        const alvo = document.querySelector(input.dataset.preview);

        if(!alvo || !input.files[0]) return;

        alvo.src = URL.createObjectURL(input.files[0]);
        alvo.style.display = "block";

    });

});
