const ingredientSelected = [];
const appareilSelected = [];
const ustensileSelected = [];

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
                    <select  name="" class="ingredients" id="select-ingredients">
                        <!--<option value="">Ingredients</option>-->
                    `;
                    const ingredients = [].concat.apply([], recipies.map((recipie) => recipie.ingredients));
                    console.log(ingredients)
                    const uniqueIngredients = ingredients.filter((value, index, self) => index === self.findIndex((t) => t.ingredient.toLowerCase() === value.ingredient.toLowerCase()))
                    console.log(uniqueIngredients)
                    uniqueIngredients.forEach(i => monHtml +=  `<option value="${i.ingredient}">${i.ingredient}</option>`) 
                     monHtml += ` </select>
                </div>
                <div class="select-filter__item">
                    <select  name="" id="select-appareil" class="appareil">
                       <!-- <option value="">Appareil</option>-->` 
                        const appareil = [...new Set(recipies.map((recipie) => recipie.appliance))];
                        console.log(appareil);
                        appareil.forEach(e => monHtml += `<option value="${e}">${e}</option>`);
                        monHtml += `  
                    </select>
                </div>
                <div class="select-filter__item">
                    <select  name="" id="select-ustensiles" class="ustensiles">
                        <!--<option value="">Ustensiles</option>-->` 
                        const ustensiles = [...new Set(recipies.map((recipie) => recipie.ustensils).flat())];//flat pour demultiplier le tableau 
                        console.log(ustensiles);
                        ustensiles.forEach(e => monHtml += `<option value="${e}">${e}</option>`);
                        monHtml += ` 
                    </select>
                </div>
        </div>`;
    sectionSelect.innerHTML += monHtml; 
}
monSelect();

window.onload = () => {
    //Récupération du select
    const selectElementIngredients = document.getElementById("select-ingredients");
    const selectElementAppareil = document.getElementById("select-appareil");
    const selectElementUstensiles = document.getElementById("select-ustensiles");

    const customSelectItems = document.createElement("div");
    customSelectItems.classList.add("custom-select-items");

    //Récupération 1ère div "select-filter"
    const selectDiv = document.querySelector(".select-filter__item"); 

    //CREATION DE BLOCS POUR LES ELEMENTS SELECTIONNES
    const selectedItems = document.createElement("div");
    selectedItems.classList.add("selected-items");
    selectedItems.setAttribute("id", "items-selected");

    //Création div et icone ingredient
    const selectFilterIngredient = document.createElement("div");
    selectFilterIngredient.classList.add("select-filter-selected", "ingredient-selected" );
    selectedItems.appendChild(selectFilterIngredient);
    const iconeIngredient = document.createElement("i");
    iconeIngredient.classList.add("far", "fa-times-circle");
    selectFilterIngredient.appendChild(iconeIngredient);
    
    selectDiv.appendChild(selectedItems);

    //Création div et icone Appareil
    const selectFilterAppareil = document.createElement("div");
    selectFilterAppareil.classList.add("select-filter-selected", "appareil-selected" );
    selectedItems.appendChild(selectFilterAppareil);
    const iconeAppareil = document.createElement("i");
    iconeAppareil.classList.add("far", "fa-times-circle");
    selectFilterAppareil.appendChild(iconeAppareil);

    selectDiv.appendChild(selectedItems);

    //Création div et icone Ustensiles
    const selectFilterUstensile = document.createElement("div");
    selectFilterUstensile.classList.add("select-filter-selected", "ustensile-selected" );
    selectedItems.appendChild(selectFilterUstensile);
    const iconeUstensile = document.createElement("i")
    iconeUstensile.classList.add("far", "fa-times-circle");
    selectFilterUstensile.appendChild(iconeUstensile);

    selectDiv.appendChild(selectedItems);

    //CREATION DU NOUVEAU SELECT
    const newSelectItems = document.createElement("div");
    newSelectItems.classList.add("new-select-items");
    selectDiv.appendChild(newSelectItems);

    //CREATION DU NOUVEAU SELECT INGREDIENT
    const newSelectIngredient = document.createElement("div");
    newSelectIngredient.classList.add("new-select", "new-select-ingredients");
    newSelectIngredient.textContent = "Ingredients";
    //Ajout de l'option actuellement choisie dans le select
    //newSelect.innerHTML = selectFilterIngredient.options[selectFilterIngredient.selectedIndex].innerHTML;
    newSelectItems.appendChild(newSelectIngredient);
    //console.log(newSelect);

    //CREATION DU NOUVEAU SELECT APPAREIL
    const newSelectAppareil = document.createElement("div");
    newSelectAppareil.classList.add("new-select", "new-select-appareil");
    newSelectAppareil.textContent = "Appareil";
    newSelectItems.appendChild(newSelectAppareil);

    //CREATION DU NOUVEAU SELECT USTENSILE
    const newSelectUstensiles = document.createElement("div");
    newSelectUstensiles.classList.add("new-select", "new-select-ustensiles");
    newSelectUstensiles.textContent = "Ustensiles";
    newSelectItems.appendChild(newSelectUstensiles);

    //CREATION DES BLOCS DANS LE DOM
    selectDiv.appendChild(customSelectItems);

    //1.CREATION DU BLOC INGREDIENTS DANS LE DOM
    const selectIngredients = document.createElement("div");
    selectIngredients.classList.add("select-filter__donnees", "select-hide", "select-filter__ingredient");
    selectIngredients.setAttribute("id", "ingredients");
    console.log(selectIngredients)

    //TEST//A SUPPRIMER
    //var myIngredient = document.getElementById("ingredient");
    var myIngredient = document.querySelector(".select-filter__ingredient");
    console.log(myIngredient)

    const searchIngredient = document.createElement("div");
    searchIngredient.classList.add("select-filter__donnees--label");
    searchIngredient.textContent= "Rechercher un ingredient";

    selectIngredients.appendChild(searchIngredient);
    customSelectItems.appendChild(selectIngredients);
    selectDiv.appendChild(customSelectItems);
    console.log(selectIngredients);

    //2.CREATION DU BLOC APPAREIL DANS LE DOM
   const selectAppareil = document.createElement("div");
   selectAppareil.classList.add("select-filter__donnees", "select-hide");
   selectAppareil.setAttribute("id", "appareil");

   const searchAppareil = document.createElement("div");
   searchAppareil.classList.add("select-filter__donnees--label");
   searchAppareil.textContent= "Rechercher un appareil";

   selectAppareil.appendChild(searchAppareil);
   customSelectItems.appendChild(selectAppareil);
   selectDiv.appendChild(customSelectItems);
   //console.log(searchAppareil);

    //3.CREATION DU BLOC USTENSILES DANS LE DOM
    const selectUstensile = document.createElement("div");
    selectUstensile.classList.add("select-filter__donnees", "select-hide");
    selectUstensile.setAttribute("id", "ustensiles");

    const searchUstensile = document.createElement("div");
    searchUstensile.classList.add("select-filter__donnees--label");
    searchUstensile.textContent= "Rechercher un ustensile";

    selectUstensile.appendChild(searchUstensile);
    customSelectItems.appendChild(selectUstensile);
    selectDiv.appendChild(customSelectItems);

    //Création menu déroulant ingredients et ajout de classe et id
    const menuDeroulantIngredients = document.createElement("ul");
    menuDeroulantIngredients.classList.add("select-items");
    menuDeroulantIngredients.setAttribute("id", "ul-ingredients");
    
    //Boucle sur les options dans le select et les copier dans la div
    for(let option of selectElementIngredients.options) {
        //Création li pour cette option
        const newOption = document.createElement("li");

        //on copie le contenu de l'option
        newOption.innerHTML = option.innerHTML;
        
        newOption.setAttribute("data-filter", option.innerHTML);

        //ajout de l'écouteur d'événement "clic" sur l'option
        newOption.addEventListener("click", (event) => {
            //selectIngredients.classList.remove("select-hide");
            const filtreSelectionneIngredient = event.target.getAttribute("data-filter");
            console.log(filtreSelectionneIngredient);
            console.log(ingredientSelected);
            //console.log(ingredientSelected.push(filtreSelectionneIngredient));
            ingredientSelected.push(filtreSelectionneIngredient);
            //selectFilterIngredient.innerHTML = filtreSelectionneIngredient;

            selectElementIngredients.selectedIndex = option.index;

            function refreshSelectedItems () {
    
                //document.getElementById('items-selected').innerHTML = "";
                selectFilterIngredient.innerHTML = ""; 
                selectFilterIngredient.innerHTML = filtreSelectionneIngredient; 
                //document.getElementById('items-selected').innerHTML = filtreSelectionneIngredient; 
            }
            refreshSelectedItems();
            console.log(refreshSelectedItems);

            // for (let option of selectElementIngredients.options) {
            //     if(option.innerHTML !== this.innerHTML)  {
            //         //on active la bonne option dans le select
            //         selectElementIngredients.selectedIndex = option.index;

            //         //on change le texte de notre newSelect
            //         ingredientSelected.innerHTML = filtreSelectionneIngredient;
            //         console.log(ingredientSelected.innerHTML = filtreSelectionneIngredient)
            //         console.log(ingredientSelected);
            //         break;
            //     }
            // }
            //on simule un clic sur newSelect
            //newSelect.click();//pour fermer le menu
        })

        //Ajout de l'option dans le menu Deroulant
        menuDeroulantIngredients.appendChild(newOption);    
    }
    //selectDiv.appendChild(menuDeroulant);
    selectIngredients.appendChild(menuDeroulantIngredients);

    newSelectIngredient.addEventListener("click", function(e) {
        e.stopPropagation();
        console.log(this)
        selectIngredients.classList.remove("select-hide");
        //retrait du select-hide du menu
        //this.nextSibling.classList.toggle("select-hide");
        //this.classList.add("select-hide");
        
        //ajout de la classe active à newFilterSelected pour changer le sens de la flèche
        this.classList.toggle("active");
    })


    //Création menu déroulant appareil et ajout de classe et id
    const menuDeroulantAppareil = document.createElement("ul");
    menuDeroulantAppareil.classList.add("select-items", "select-hide");
    menuDeroulantAppareil.setAttribute("id", "ul-appareil");
    console.log(menuDeroulantAppareil);
        
    //Boucle sur les options dans le select et les copier dans la div
    for(let option of selectElementAppareil.options) {
        //Création li pour cette option
        const newOption = document.createElement("li");

        //on copie le contenu de l'option
        newOption.innerHTML = option.innerHTML;
        
        newOption.setAttribute("data-filter", option.innerHTML);
        newOption.addEventListener("click", (event) => {

            const filtreSelectionneAppareil = event.target.getAttribute("data-filter");
            console.log(filtreSelectionneAppareil);
            

            for (let option of selectElementAppareil.options) {
                if(option.innerHTML !== this.innerHTML)  {
                    //on active la bonne option dans le select
                    selectElementAppareil.selectedIndex = option.index;

                    //on change le texte de notre newSelect
                    appareilSelected.innerHTML = filtreSelectionneAppareil;
                    break;
                }
            }
            //on simule un clic sur newSelect
            //newSelect.click();//pour fermer le menu
        })

        //Ajout de l'option dans le menu Deroulant
        menuDeroulantAppareil.appendChild(newOption);
        //console.log(newOption);
        
    }
    //selectDiv.appendChild(menuDeroulant);
    selectAppareil.appendChild(menuDeroulantAppareil);
    console.log(selectAppareil);

    newSelectAppareil.addEventListener("click", function(e) {
        e.stopPropagation();
        console.log(this)
        //retrait du select-hide du menu
        selectAppareil.classList.remove("select-hide");
        //this.nextSibling.classList.toggle("select-hide");
        //this.classList.add("select-hide");
        
        //ajout de la classe active à newFilterSelected pour changer le sens de la flèche
        this.classList.toggle("active");
    })

    //Création menu déroulant ustensiles et ajout de classe et id
    const menuDeroulantUstensiles = document.createElement("ul");
    menuDeroulantUstensiles.classList.add("select-items", "select-hide");
    menuDeroulantUstensiles.setAttribute("id", "ul-ustensiles");
        
    //Boucle sur les options dans le select et les copier dans la div
    for(let option of selectElementUstensiles.options) {
        //console.log(option)
        //Création li pour cette option
        const newOption = document.createElement("li");

        //on copie le contenu de l'option
        newOption.innerHTML = option.innerHTML;
        
        newOption.setAttribute("data-filter", option.innerHTML);

        newOption.addEventListener("click", (event) => {

            const filtreSelectionneUstensiles = event.target.getAttribute("data-filter");
            console.log(filtreSelectionneUstensiles);
            
            for (let option of selectElementUstensiles.options) {
                if(option.innerHTML !== this.innerHTML)  {
                    //on active la bonne option dans le select
                    selectElementUstensiles.selectedIndex = option.index;

                    //on change le texte de notre newSelect
                    ustensileSelected.innerHTML = filtreSelectionneUstensiles;
                    break;
                }
            }
            //on simule un clic sur newSelect
            //newSelect.click();//pour fermer le menu
        })
        //Ajout de l'option dans le menu Deroulant
        menuDeroulantUstensiles.appendChild(newOption);

    }
    //selectDiv.appendChild(menuDeroulant);
    selectUstensile.appendChild(menuDeroulantUstensiles);

    newSelectUstensiles.addEventListener("click", function(e) {
        e.stopPropagation();
        console.log(this)
        //retrait du select-hide du menu
        selectUstensile.classList.remove("select-hide");
        //this.nextSibling.classList.toggle("select-hide");
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