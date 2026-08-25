// Abre/fecha o painel lateral de "Minha Conta" (disponível em
// qualquer página pública através do botão no rodapé)

const contaDrawer = document.getElementById("conta-drawer");
const contaDrawerOverlay = document.getElementById("conta-drawer-overlay");
const contaDrawerFechar = document.getElementById("conta-drawer-fechar");
const contaDrawerBotoes = document.querySelectorAll("[data-abrir-conta-drawer]");

function abrirContaDrawer(){

    if(!contaDrawer || !contaDrawerOverlay) return;

    contaDrawer.classList.add("aberto");
    contaDrawerOverlay.classList.add("aberto");
    document.body.style.overflow = "hidden";

}

function fecharContaDrawer(){

    if(!contaDrawer || !contaDrawerOverlay) return;

    contaDrawer.classList.remove("aberto");
    contaDrawerOverlay.classList.remove("aberto");
    document.body.style.overflow = "";

}

contaDrawerBotoes.forEach(botao=>{

    botao.addEventListener("click", (e)=>{

        e.preventDefault();
        abrirContaDrawer();

    });

});

if(contaDrawerFechar){

    contaDrawerFechar.addEventListener("click", fecharContaDrawer);

}

if(contaDrawerOverlay){

    contaDrawerOverlay.addEventListener("click", fecharContaDrawer);

}
