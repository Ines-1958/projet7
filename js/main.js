async function  getRecipies () {
    const response = await fetch('/assets/recipies.json')
    const json = await response.json();
    console.log(json)
    // obj = JSON.parse(json.recipies);
    // console.log(obj)
   return json.recipies;
}

//Fonction pour la création du select avec les données json
async function monSelect () {
    const sectionSelect = document.querySelector(".select");
    const recipies = await getRecipies();

    var monHtml = `
        <div class="select-filter">
                <div class="select-filter__item">
                    <select  name="" class="ingredients" id="">
                        <option value="">Ingredients</option>
                    `;
                    const ingredients = [].concat.apply([], recipies.map((recipie) => recipie.ingredients));
                    console.log(ingredients)
                    const uniqueIngredients = ingredients.filter((value, index, self) => index === self.findIndex((t) => t.ingredient.toLowerCase() === value.ingredient.toLowerCase()))
                    console.log(uniqueIngredients)
                    uniqueIngredients.forEach(i => monHtml +=  `<option value="${i.ingredient}">${i.ingredient}</option>`) 
                     monHtml += ` </select>
                    <!--<div class="selected-items">
                        <div class="select-filter-selected ingredient-selected">coco <i class="far fa-times-circle"></i></div>
                        <div class="select-filter-selected appareil-selected">blender <i class="far fa-times-circle"></i></div>
                        <div class="select-filter-selected casserole-selected">casseroles <i class="far fa-times-circle"></i></div>
                    </div>-->
    </div>
    </div>`;
    sectionSelect.innerHTML += monHtml; 
}
monSelect();

window.onload = () => {
    //Récupération du select
const selectElement = document.querySelector("select");
console.log(selectElement)

//Récupurétion 1ère div "select-filter"
const selectDiv = document.querySelector(".select-filter__item");

//CREATION DE TABLEAUX POUR LES ELEMENTS SELECTIONNES
const selectedItems = document.createElement("div");
selectedItems.classList.add("selected-items");
selectDiv.appendChild(selectedItems);

//Création div et icone ingredient
const selectFilterIngredient = document.createElement("div");
selectFilterIngredient.classList.add("select-filter-selected", "ingredient-selected" );
selectedItems.appendChild(selectFilterIngredient);
const iconeIngredient = document.createElement("i")
iconeIngredient.classList.add("far", "fa-times-circle");
selectFilterIngredient.appendChild(iconeIngredient);

//Création div et icone Appareil
const selectFilterAppareil = document.createElement("div");
selectFilterAppareil.classList.add("select-filter-selected", "appareil-selected" );
selectedItems.appendChild(selectFilterAppareil);
const iconeAppareil = document.createElement("i")
iconeAppareil.classList.add("far", "fa-times-circle");
selectFilterAppareil.appendChild(iconeAppareil);

//Création div et icone Ustensiles
const selectFilterUstensile = document.createElement("div");
selectFilterUstensile.classList.add("select-filter-selected", "ustensile-selected" );
selectedItems.appendChild(selectFilterUstensile);
const iconeUstensile = document.createElement("i")
iconeUstensile.classList.add("far", "fa-times-circle");
selectFilterUstensile.appendChild(iconeUstensile);



//FIN DU TABLEAU

//Création nouveau select
//const newFilterSelected = document.querySelector(".ingredient-selected");
const newFilterSelected = document.createElement("div");

//Ajout de la classe "new-select"
//newFilterSelected.classList.add("select-filter__donnees");
newFilterSelected.classList.add("select-filter-selected", "ingredient-selected");
console.log(newFilterSelected)

//Ajout de l'id sur l'élément
//newFilterSelected.setAttribute("id", "ingredients");

//Ajout de l'option actuellement choisie dans le select
newFilterSelected.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML;
//Création de l'élément dans le DOM
selectDiv.appendChild(newFilterSelected);

const selectIngredients = document.createElement("div");
selectIngredients.classList.add("select-filter__donnees");
selectIngredients.setAttribute("id", "ingredients");

const searchIngredient = document.createElement("div");
searchIngredient.classList.add("select-filter__donnees--label")


selectIngredients.appendChild(searchIngredient);
selectDiv.appendChild(selectIngredients)
console.log(selectIngredients)

//Création menu déroulant et ajout de classe et id
const menuDeroulant = document.createElement("ul");
menuDeroulant.classList.add("select-items", "select-hide");
menuDeroulant.setAttribute("id", "ul-ingredients");

//Boucle sur les options dans le select et les copier dans la div
    for(let option of selectElement.options) {
        //console.log(option)
        //Création div pour cette option
        const newOption = document.createElement("li");
    
        //on copie le contenu de l'option
        newOption.innerHTML = option.innerHTML;
        
        newOption.setAttribute("data-filter", option.innerHTML);

        //Ajout de l'option dans le menu Deroulant
        menuDeroulant.appendChild(newOption);

    }
//selectDiv.appendChild(menuDeroulant);
selectIngredients.appendChild(menuDeroulant);

//Ajout de l'écouteur d'événements click sur newFilterSelected
newFilterSelected.addEventListener("click", function(e) {
    e.stopPropagation();
    console.log(this)
    //retrait du select-hide du menu
    this.nextSibling.classList.toggle("select-hide");
    //this.classList.add("select-hide");
    
    //ajout de la classe active à newFilterSelected pour changer le sens de la flèche
    this.classList.toggle("active");
})


}



async function mesRecettes () {
    const section = document.querySelector('.recettes');
    const recipies = await getRecipies();
    recipies.forEach(function(recettes) {
        
         var myHtml = `
         <div class="recettes-bloc" id="recette-${recettes.id}">
            <a href="recettes.html?id=${recettes.id}">
                <div class="recettes-bloc__heading"></div>
                <div class="recette">
                    <div class="recette__ingredients">
                        <h2>${recettes.name}</h2>
                        ${buildDescription(recettes.ingredients)}
                    </div>
                    <div class="recette__description">
                        <h2 class="recette__description--h2"><i class="far fa-clock"></i> ${recettes.time} min</h2>
                        <p class="recette__description--p"> ${recettes.description} </p>
                    </div>
                </div>
            </a>    
            </div>
         `
         section.innerHTML += myHtml;
       
    })
}
mesRecettes();

function buildDescription (ingredients) {
    return ingredients.map( ingredient => {
        //console.log(ingredient.ingredient)
        if (ingredient.unit !== undefined) {
            return `<p class="recette__ingredients--p"><span class="recette__ingredients--p--span">${ingredient.ingredient}</span>: <span>${ingredient.quantity} ${ingredient.unit}</span></p>`;   
        }
        else if (ingredient.quantity !== undefined){
            return `<p class="recette__ingredients--p"><span class="recette__ingredients--p--span">${ingredient.ingredient}</span>: <span> ${ingredient.quantity}</span></p>`;
        }
        else {
            return `<p class="recette__ingredients--p"><span class="recette__ingredients--p--span">${ingredient.ingredient}</span></p>`;  
        }
    }
).join('')}



//Fonction pour filtre des cards
const filtreCards = document.getElementById("filtre-cards");
console.log("mamamamam")
async function cardFilter () {
    console.log("toto")
    const recipies = await getRecipies();
    filtreCards.addEventListener("input", function() {
        let saisie = this.value.toLowerCase().trim();//trim pour supprimer les espaces dans la saisie
    
        recipies.forEach((card) => {
            console.log(`recette-${card.id}`);
            var carteFiltre = document.getElementById(`recette-${card.id}`);
            carteFiltre.style.display = (card.name.toLowerCase().trim().includes(saisie)) ? "block" : "none";//fonction ternaire:if, display block, else, display none
        });
    });
}
cardFilter();