// script.js

const pages = document.querySelectorAll(".page");

let currentPage = 0;

function updateZIndex(){

  pages.forEach((page,index)=>{

    page.style.zIndex = pages.length - index;

  });

}

updateZIndex();

function nextPage(){

  if(currentPage < pages.length){

    pages[currentPage].classList.add("flipped");

    currentPage++;

  }

}

function prevPage(){

  if(currentPage > 0){

    currentPage--;

    pages[currentPage].classList.remove("flipped");

  }

}