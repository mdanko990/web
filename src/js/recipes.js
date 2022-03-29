let recipesList = document.getElementById('list');
let recipePage = document.getElementById('recipePage');
let listPage = document.getElementById('listPage');


window.addEventListener('load', () => {
  for(let i=0; i<recipes.length;i++){
    createCard(i);
  }
});

//Форма добавления поста
//коментарі

let url = 'http://localhost:3000/recipes';
let xhr = new XMLHttpRequest();
xhr.open('GET', url, false);
xhr.send();
let recipes = JSON.parse(xhr.responseText);

function createCard(id){
  let card = document.createElement('div');
  card.className = 'card col-lg-3 col-md-4 col-6 border-0';
  let cardImg = document.createElement('img');
  cardImg.src = recipes[id].image;
  cardImg.className = 'card-img-top card-img';
  let cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  let cardTitle = document.createElement('h5');
  cardTitle.className = 'card-title';
  let cardLink = document.createElement('a');
  cardLink.addEventListener('click', openRecipePage);
  cardLink.innerHTML = recipes[id].name;
  cardTitle.appendChild(cardLink);
  cardBody.appendChild(cardTitle);
  card.appendChild(cardImg);
  card.appendChild(cardBody);
  recipesList.appendChild(card);
}

function openRecipePage(event){
  let img = event.target.parentNode.parentNode.parentNode.firstChild.src;
  let id = findRecipeByImg(img);
  let recipeURL = url + '/' + id;
  let recipeXHR = new XMLHttpRequest();
  recipeXHR.open('GET', recipeURL, false);
  recipeXHR.send();
  let recipeInfo = JSON.parse(recipeXHR.responseText);
  listPage.style.display = 'none';
  recipePage.style.display = 'block';
  let backBlock = document.createElement('div');
  let backBtn = document.createElement('button');
  backBtn.innerHTML = '&#8592;';
  backBtn.className = 'btn my-1';
  backBtn.style.fontSize = '30px';
  backBtn.addEventListener('click', () => {
    listPage.style.display = 'block';
    recipePage.style.display = 'none';
    while(recipePage.firstChild){
      recipePage.removeChild(recipePage.firstChild);
    }
  });
  backBlock.appendChild(backBtn);
  let block = document.createElement('div');
  block.className = 'd-flex flex-row row';
  let blockImg = document.createElement('div');
  blockImg.className = 'col-lg-5 col-12';
  let image = document.createElement('img');
  image.src = recipeInfo.image;
  image.className = 'img-fluid';
  blockImg.appendChild(image);
  let blockText = document.createElement('div');
  blockText.className = 'col-lg-7 col-12';
  let info = document.createElement('div');
  info.innerHTML =`
  <div class="d-flex flex-column"></div>
  <h4 class="heading-text text-center">${recipeInfo.name}</h4>
  <div class="d-flex row"><h6 class="col-2">Time:</h6><p class="col-2">${recipeInfo.time}</p></div>
  <div class="d-flex row"><h6 class="col-2">Difficulty:</h6><p class="col-2">${recipeInfo.difficulty}</p></div>
  <div class="d-flex row"><h6 class="col-2">Type:</h6><p class="col-2">${recipeInfo.type}</p></div>
  `;
  let ingredientsTitle = document.createElement('h6');
  ingredientsTitle.innerHTML = 'INGREDIENTS';
  let ingredientsBlock = document.createElement('div');
  ingredientsBlock.className = 'bg-light p-4';
  let ingredients = document.createElement('p');
  getIngredients(recipeInfo, ingredients);
  ingredientsBlock.appendChild(ingredients);
  blockText.appendChild(ingredientsTitle);
  blockText.appendChild(ingredientsBlock);
  block.appendChild(blockImg);
  block.appendChild(blockText);
  recipePage.appendChild(backBlock);
  recipePage.appendChild(info);
  recipePage.appendChild(block);
  let recipeBlock = document.createElement('div');
  recipeBlock.className = 'my-2'
  if(recipeInfo.recipe.length > 4){
    getRecipePoints(recipeInfo, recipeBlock, true);
  }else{
    getRecipePoints(recipeInfo, recipeBlock);
  }
  recipePage.appendChild(recipeBlock);
}

function getIngredients(recipeInfo, ingredients){
  for(let i = 0; i<recipeInfo.ingredients.length; i++){
    for(let j = 0; j<recipeInfo.ingredients[i].length; j++){
      let line = document.createElement('p');
      line.innerHTML += recipeInfo.ingredients[i][j];
      console.log((recipeInfo.ingredients[i][j][0]));
      if(j ===0 && isNaN(recipeInfo.ingredients[i][j][0])){
        line.style = 'font-weight: bold; text-transform: capitalize;';
      }
      ingredients.appendChild(line);
    }
  }
}

function getRecipePoints(recipeInfo, block, button = false){
  for(let i = 0; i<recipeInfo.recipe.length; i++){
    let line = document.createElement('p');
    let point = document.createElement('span');
    let text = document.createElement('span');
    point.className = 'recipe-point';
    point.innerHTML = i + 1;
    text.innerHTML = recipeInfo.recipe[i];
    line.appendChild(point);
    line.appendChild(text);
    if(i > 3){
      line.className = 'hidden';
    }
    block.appendChild(line);
  }
  if(button){
    addHideBtn(block);
  }
}

function findRecipeByImg(img){
  return recipes.filter((recipe) => { return recipe.image === img;})[0].id;
}

function addHideBtn(block){
  let hideBtn = document.createElement('p');
  hideBtn.style='text-decoration:underline';
  hideBtn.className = 'btn btn-lg btn-pink center-block text-decoration-none';
  hideBtn.innerHTML = 'Show More';
  block.appendChild(hideBtn);
  hideBtn.addEventListener('click', showAction);
}

function showAction(event){
  let hideBtn = event.target;
  let block = recipePage.lastChild;
  let hidden = block.getElementsByClassName('hidden');
  hideBtn.innerHTML = 'Hide';
  for(let i=0; i<hidden.length;i++){
    hidden[i].style.display = 'block';
  }
  hideBtn.addEventListener('click', () =>{
    hideBtn.innerHTML = 'Show More';
    for(let i=0; i<hidden.length;i++){
      hidden[i].style.display = 'none';
    }
  });
}