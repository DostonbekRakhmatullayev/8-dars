let elInput = document.querySelector(".js-input");
let elForm = document.querySelector(".js-form");
let elList = document.querySelector(".js-list");
let elPrev= document.querySelector(".js-prev");
let elNext = document.querySelector(".js-next");
let elPagination = document.querySelector(".pagination");
let elSelect = document.querySelector(".js-select");

// Templatelarni chaqrib olish
let elPaginationTemplate = document.querySelector(".pagination__template").content;
let elTemplate = document.querySelector(".films__template").content;

// Create document fragment qilish
let filmsFragment = document.createDocumentFragment()

// Inputga kiritilgan malumot fetch zapiros yuborishi
let elInputVal = "";

// Pagination ni active holati 1 dan boshlanadi 
let activePage = 1;

function reder(arr, node) {
  node.innerHTML = null 

  // Fetch dagi data ni aynalib chiqish 
  arr.forEach(element => {
    let  newTemplate = elTemplate.cloneNode(true);
    newTemplate.querySelector(".img").src = element.Poster;
    newTemplate.querySelector(".title").textContent = element.Title;
    newTemplate.querySelector(".films__strong").textContent = element.Type;
    newTemplate.querySelector(".films__time").textContent = element.Year;
    
    filmsFragment.appendChild(newTemplate)
  })
  node.appendChild(filmsFragment)
}

// Input ni submit bulish jarayoni
elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  elInputVal = elInput.value.trim()
  getPosts()
  elInput.value = ""
})

// Fetch ga zapiros kelishi
async function getPosts() {
  let response = await fetch(`https://www.omdbapi.com/?apikey=2bf42ac4&s=${elInputVal}&page=${activePage}`)
  let data = await response.json()
  
  let totalPage = Math.ceil(data.totalResults / 10);
  
  if(activePage == 1) {
    elPrev.setAttribute("disabled", true)
  }else{
    elPrev.removeAttribute("disabled",)
  }
  
  if(activePage == totalPage) {
    elNext.setAttribute("disabled", true)
  }else{
    elNext.removeAttribute("disabled",)
  }
  
  // Select ni value olishi
  if(elSelect.value === "movie"){
    data.Search = data.Search.filter(e => e.Type === "movie");
  }
  if (elSelect.value === "series"){
    data.Search = data.Search.filter(e => e.Type === "series");
  }
  if (elSelect.value === "all"){
    data.Search = data.Search
  }
  
  reder(data.Search, elList)
  elPagination.innerHTML = ""
  
  // Pagination ni chiqishi
  for(let i = 1; i <= totalPage; i++) {
    let newPaginationTemplate = elPaginationTemplate.cloneNode(true)
    newPaginationTemplate.querySelector(".page-link").textContent = i
    newPaginationTemplate.querySelector(".page-link").dataset.PageId = i
    elPagination.appendChild(newPaginationTemplate)
  }
}

elPrev.addEventListener("click", () => {
  activePage--
  getPosts();
})

elNext.addEventListener("click", () => {
  activePage++
  getPosts();
})

// Pagination ni bosilishi
elPagination.addEventListener("click", function(evt) {
  if(evt.target.matches(".page-link")) {
    activePage = evt.target.dataset.PageId
    getPosts() 
  }
})

// Selectni ishlashi
elSelect.addEventListener("click", function(evt) {
  getPosts()
})