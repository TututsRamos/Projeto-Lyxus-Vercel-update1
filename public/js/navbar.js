const navbar=document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

    if(window.scrollY>40){

        navbar.classList.add("scrolled");

    }else{

        navbar.classList.remove("scrolled");

    }

});

const menu=document.querySelector(".menu-mobile");

const nav=document.querySelector(".nav-menu");

menu.addEventListener("click",()=>{

    nav.classList.toggle("active");

});