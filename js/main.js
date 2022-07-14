
let elInput = document.querySelector(".js-input")
let elForm = document.querySelector(".js-form")
let elList = document.querySelector(".js-list")

function reder(arr, node) {
  node.innerHTML = null 
  arr.forEach(element => {
    let newItem = document.createElement("li")
    let newStrong = document.createElement("strong")
    let newTitle = document.createElement("h3")
    let newImg = document.createElement("img")
    let newTime = document.createElement("time")
    let newBox = document.createElement("div")

    newItem.style.display = "flex";
    newItem.style.flexDirection = "column";
    newItem.style.textAlign = "center";
    newItem.style.alignItems = "center";  
    newItem.style.marginBottom = "30px";
    newItem.style.borderRadius = "20px";
    newItem.style.color = "white";
    newImg.style.width = "250px";
    newImg.style.borderRadius = "20px"
    newImg.style.height = "300px";
    newTitle.style.marginTop = "25px"
    newTitle.style.width = "250px"

    newItem.setAttribute("class", "movies__item");
    newImg.setAttribute("class", "img");
    newBox.setAttribute("class", "box");

    newImg.src= element.Poster
    newTitle.textContent = element.Title
    newStrong.textContent = element.Type
    newTime.textContent = element.Year

    newItem.appendChild(newImg)
    newItem.appendChild(newTitle)
    newBox.appendChild(newStrong)
    newBox.appendChild(newTime)
    newItem.appendChild(newBox)
    node.appendChild(newItem)
  });
}

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  let elInputVal = elInput.value.trim()

  getPosts(elInputVal)
  elInput.value = null
})

async function getPosts(title) {
  let response = await fetch(`http://www.omdbapi.com/?apikey=2bf42ac4&s=${title}`)
  let data = await response.json()
  console.log(data);
  reder(data.Search, elList)
}


