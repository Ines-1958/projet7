const ingredientSelected = [];
const appareilSelected = [];
const ustensileSelected = [];
const tagSelected = [];
console.log(tagSelected);

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
                    const uniqueIngredients = ingredients.filter((value, index, self) => index === self.findIndex((t) => t.ingredient.toLowerCase() === value.ingredient.toLowerCase()))
                    console.log(uniqueIngredients)
                    uniqueIngredients.forEach(i => monHtml +=  `<option value="${i.ingredient}">${i.ingredient}</option>`) 
                     monHtml += ` </select>
                </div>
                <div class="select-filter__item">
                    <select  name="" id="select-appareil" class="appareil">
                       <!-- <option value="">Appareil</option>-->` 
                        const appareil = [...new Set(recipies.map((recipie) => recipie.appliance))];
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

    //Récupération 1ère div "select-filter"
    const selectDiv = document.querySelector(".select-filter__item"); 

    //CREATION DE BLOCS POUR LES ELEMENTS SELECTIONNES
    const selectedItems = document.createElement("div");
    selectedItems.classList.add("selected-items");
    selectedItems.setAttribute("id", "items-selected");

    //Création div et icone ingredient
    const selectFilterIngredient = document.createElement("div");
    selectFilterIngredient.classList.add("select-filter-selected", "select-hide", "ingredient-selected");
    selectedItems.appendChild(selectFilterIngredient);
    const iconeIngredient = document.createElement("i");
    iconeIngredient.classList.add("far", "fa-times-circle");
    selectFilterIngredient.appendChild(iconeIngredient);
    //selectDiv.appendChild(selectedItems);

    //Création div et icone Appareil
    const selectFilterAppareil = document.createElement("div");
    selectFilterAppareil.classList.add("select-filter-selected", "select-hide", "appareil-selected");
    selectedItems.appendChild(selectFilterAppareil);
    const iconeAppareil = document.createElement("i");
    iconeAppareil.classList.add("far", "fa-times-circle");
    selectFilterAppareil.appendChild(iconeAppareil);
    //selectDiv.appendChild(selectedItems);

    //Création div et icone Ustensiles
    const selectFilterUstensile = document.createElement("div");
    selectFilterUstensile.classList.add("select-filter-selected", "select-hide","ustensile-selected");
    selectedItems.appendChild(selectFilterUstensile);
    const iconeUstensile = document.createElement("i")
    iconeUstensile.classList.add("far", "fa-times-circle");
    selectFilterUstensile.appendChild(iconeUstensile);
    
    selectDiv.appendChild(selectedItems);

    //CREATION DU NOUVEAU SELECT
    const customSelectItems = document.createElement("div");
    customSelectItems.classList.add("custom-select-items");
    selectDiv.appendChild(customSelectItems);

    const newSelectItemsIngredients = document.createElement("div");
    newSelectItemsIngredients.classList.add("new-select-items");
    customSelectItems.appendChild(newSelectItemsIngredients);

    const newSelectItemsAppareil = document.createElement("div");
    newSelectItemsAppareil.classList.add("new-select-items");
    customSelectItems.appendChild(newSelectItemsAppareil);

    const newSelectItemsUstensiles = document.createElement("div");
    newSelectItemsUstensiles.classList.add("new-select-items");
    customSelectItems.appendChild(newSelectItemsUstensiles);

    //CREATION DU NOUVEAU SELECT INGREDIENT ET DU BLOC INGREDIENTS DANS LE DOM
    const newSelectIngredient = document.createElement("div");
    newSelectIngredient.classList.add("new-select", "new-select-ingredients");
    newSelectIngredient.textContent = "Ingrédients";
    newSelectIngredient.setAttribute("id", "new-ingredient")

    //Ajout de l'option actuellement choisie dans le select
    //newSelect.innerHTML = selectFilterIngredient.options[selectFilterIngredient.selectedIndex].innerHTML;

    const selectIngredients = document.createElement("div");
    selectIngredients.classList.add("select-filter__donnees", "select-hide", "select-filter__ingredient");
    selectIngredients.setAttribute("id", "ingredients");
    //console.log(selectIngredients)

    const searchIngredient = document.createElement("div");
    searchIngredient.classList.add("select-filter__donnees--label");
    searchIngredient.textContent= "Rechercher un ingredient";

    selectIngredients.appendChild(searchIngredient);
    //customSelectItems.appendChild(selectIngredients);
    // selectDiv.appendChild(customSelectItems);
    // console.log(selectIngredients);

    newSelectItemsIngredients.appendChild(newSelectIngredient);
    newSelectItemsIngredients.appendChild(selectIngredients);
    //console.log(newSelect);

    //CREATION DU NOUVEAU SELECT APPAREIL ET CREATION DU BLOC APPAREIL DANS LE DOM
    const newSelectAppareil = document.createElement("div");
    newSelectAppareil.classList.add("new-select", "new-select-appareil");
    newSelectAppareil.textContent = "Appareil";

    const selectAppareil = document.createElement("div");
    selectAppareil.classList.add("select-filter__donnees", "select-hide");
    selectAppareil.setAttribute("id", "appareil");

    const searchAppareil = document.createElement("div");
    searchAppareil.classList.add("select-filter__donnees--label");
    searchAppareil.textContent= "Rechercher un appareil";

    selectAppareil.appendChild(searchAppareil);

    newSelectItemsAppareil.appendChild(newSelectAppareil);
    newSelectItemsAppareil.appendChild(selectAppareil);

    //CREATION DU NOUVEAU SELECT USTENSILE ET CREATION DU BLOC USTENSILES DANS LE DOM
    const newSelectUstensiles = document.createElement("div");
    newSelectUstensiles.classList.add("new-select", "new-select-ustensiles");
    newSelectUstensiles.textContent = "Ustensiles";
    //newSelectItems.appendChild(newSelectUstensiles);

    const selectUstensile = document.createElement("div");
    selectUstensile.classList.add("select-filter__donnees", "select-hide");
    selectUstensile.setAttribute("id", "ustensiles");

    const searchUstensile = document.createElement("div");
    searchUstensile.classList.add("select-filter__donnees--label");
    searchUstensile.textContent= "Rechercher un ustensile";

    selectUstensile.appendChild(searchUstensile);

    newSelectItemsUstensiles.appendChild(newSelectUstensiles);
    newSelectItemsUstensiles.appendChild(selectUstensile);

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
            tagSelected.push({couleur:"bleu", nom:filtreSelectionneIngredient})
            //console.log(filtreSelectionneIngredient);
            //console.log(ingredientSelected);
            console.log(tagSelected);
            //console.log(ingredientSelected.push(filtreSelectionneIngredient));
            //ingredientSelected.push(filtreSelectionneIngredient);
            //selectFilterIngredient.innerHTML = filtreSelectionneIngredient;

            selectElementIngredients.selectedIndex = option.index;

            function refreshIngredientSelectedItems () {
                //document.getElementById('items-selected').innerHTML = "";
                selectFilterIngredient.innerHTML = ""; 
                selectFilterIngredient.innerHTML = filtreSelectionneIngredient; 

                selectFilterIngredient.classList.remove("select-hide");
                //newSelectIngredient.style.display = "none";
                //document.getElementById('items-selected').innerHTML = filtreSelectionneIngredient; 
            }
            newSelectIngredient.click();//pour fermer le menu
            newSelectIngredient.classList.toggle("select-hide");
            refreshIngredientSelectedItems();
            tagsItems();
            //console.log(tagsItems);
        })

        //Ajout de l'option dans le menu Deroulant
        menuDeroulantIngredients.appendChild(newOption);    
    }
    //selectDiv.appendChild(menuDeroulant);
    selectIngredients.appendChild(menuDeroulantIngredients);

    newSelectIngredient.addEventListener("click", function(e) {
        e.stopPropagation();
        //console.log(this)
        //selectIngredients.classList.remove("select-hide");
        //retrait du select-hide du menu
        this.nextSibling.classList.toggle("select-hide");
        this.classList.add("select-hide");
        //menuDeroulantIngredients.classList.toggle("select-hide");

        //ajout de la classe active à newFilterSelected pour changer le sens de la flèche
        //this.classList.toggle("active");//.new-select.active::after{border-color, top}
        //this.classList.toggle("select-hide");

        //Fermeture d'une dropdown à l'ouverture d'une autre
        selectAppareil.classList.add("select-hide");
        newSelectAppareil.classList.remove("select-hide");

        selectUstensile.classList.add("select-hide");
        newSelectUstensiles.classList.remove("select-hide");
    })

    

    searchIngredient.addEventListener("click", function () {
        this.innerHTML = "";
        if(this.getAttribute("contenteditable") == "true") {
            this.setAttribute("contenteditable", "false");
        }
        else {
            this.setAttribute("contenteditable", "true");
            //this.innerHTML = "Ingrédients";
            //on donne le focus à notre champ
            this.focus();
        }
    })

    //on met en place le filtre de contenu sur l'événement  input
    searchIngredient.addEventListener("input", function(e) {
        //on récupère la saisie en minuscules
        let saisie = this.textContent.toLowerCase();
        console.log(saisie);
        console.log(e);

        //on parcourt tous les enfants de notre menu(newMenu)
        for(let option of menuDeroulantIngredients.children) {
            //on vérifie si la saisie existe dans la chaîne
            if(option.textContent.toLowerCase().search(saisie) > -1) {//-1 pcq search renvoie -1 s'il ne trouve pas
                option.style.display = "block";
            }
            else {
                option.style.display = "none";
            }
        }
    })

    //Création menu déroulant appareil et ajout de classe et id
    const menuDeroulantAppareil = document.createElement("ul");
    menuDeroulantAppareil.classList.add("select-items", "select-hide");
    menuDeroulantAppareil.setAttribute("id", "ul-appareil");
        
    //Boucle sur les options dans le select et les copier dans la div
    for(let option of selectElementAppareil.options) {
        //Création li pour cette option
        const newOption = document.createElement("li");

        //on copie le contenu de l'option
        newOption.innerHTML = option.innerHTML;
        
        newOption.setAttribute("data-filter", option.innerHTML);
        newOption.addEventListener("click", (event) => {

            const filtreSelectionneAppareil = event.target.getAttribute("data-filter");
            tagSelected.push({couleur:"vert", nom:filtreSelectionneAppareil});
            //console.log(ingredientSelected.push(filtreSelectionneIngredient));
            //appareilSelected.push(filtreSelectionneAppareil);
            //selectFilterIngredient.innerHTML = filtreSelectionneIngredient;

            selectElementAppareil.selectedIndex = option.index;
    
            function refreshAppareilSelectedItems () {
                //document.getElementById('items-selected').innerHTML = "";
                selectFilterAppareil.innerHTML = ""; 
                selectFilterAppareil.innerHTML = filtreSelectionneAppareil; 

                selectFilterAppareil.classList.remove("select-hide");
                //newSelectIngredient.style.display = "none";
                //document.getElementById('items-selected').innerHTML = filtreSelectionneIngredient; 
            }
            //on simule un clic sur newSelect
            newSelectAppareil.click();//pour fermer le menu
            newSelectAppareil.classList.toggle("select-hide");
            //newSelectIngredient.classList.toggle("select-hide");
            //newSelectIngredient.classList.toggle("active")
            refreshAppareilSelectedItems();
            tagsItems();
        })

        //Ajout de l'option dans le menu Deroulant
        menuDeroulantAppareil.appendChild(newOption);
        //console.log(newOption); 
    }
    //selectDiv.appendChild(menuDeroulant);
    selectAppareil.appendChild(menuDeroulantAppareil);
    //console.log(selectAppareil);

    newSelectAppareil.addEventListener("click", function(e){
        e.stopPropagation();
        //retrait du select-hide du menu
        this.nextSibling.classList.toggle("select-hide");
        //selectAppareil.classList.remove("select-hide");
        this.classList.add("select-hide");
        
        //ajout de la classe active à newFilterSelected pour changer le sens de la flèche
        //this.classList.toggle("active");

        //Fermeture d'une dropdown à l'ouverture d'une autre
        selectIngredients.classList.add("select-hide");
        newSelectIngredient.classList.remove("select-hide");
        
        selectUstensile.classList.add("select-hide");
        newSelectUstensiles.classList.remove("select-hide");
    })
       
    
    searchAppareil.addEventListener("click", function () {

        this.innerHTML = "";
        if(this.getAttribute("contenteditable") == "true") {
        this.setAttribute("contenteditable", "false");
        //this.innerHTML = filtreSelectionneIngredient;
        }
        else {
            this.setAttribute("contenteditable", "true");
            //this.innerHTML = "Ingrédients";
            //on donne le focus à notre champ
            this.focus();
        }
    })

    //on met en place le filtre de contenu sur l'événement  input
    searchAppareil.addEventListener("input", function(e) {
        //on récupère la saisie en minuscules
        let saisie = this.textContent.toLowerCase();
        console.log(saisie);

        //on parcourt tous les enfants de notre menu(newMenu)
        for(let option of menuDeroulantAppareil.children) {
            //on vérifie si la saisie existe dans la chaîne
            if(option.textContent.toLowerCase().search(saisie) > -1) {//-1 pcq search renvoie -1 s'il ne trouve pas
                option.style.display = "block";
            }
            else {
                option.style.display = "none";
            }
        }
    })

    //Création menu déroulant ustensiles et ajout de classe et id
    const menuDeroulantUstensiles = document.createElement("ul");
    menuDeroulantUstensiles.classList.add("select-items", "select-hide");
    menuDeroulantUstensiles.setAttribute("id", "ul-ustensiles");
        
    //Boucle sur les options dans le select et les copier dans la div
    for(let option of selectElementUstensiles.options) {
        //Création li pour cette option
        const newOption = document.createElement("li");

        //on copie le contenu de l'option
        newOption.innerHTML = option.innerHTML;
        
        newOption.setAttribute("data-filter", option.innerHTML);

        newOption.addEventListener("click", (event) => {

            const filtreSelectionneUstensile = event.target.getAttribute("data-filter");
            tagSelected.push({couleur:"orange", nom:filtreSelectionneUstensile});
            
            //ustensileSelected.push(filtreSelectionneUstensile);

            selectElementUstensiles.selectedIndex = option.index;
            
            function refreshUstensileSelectedItems () {
                //document.getElementById('items-selected').innerHTML = "";
                selectFilterUstensile.innerHTML = ""; 
                selectFilterUstensile.innerHTML = filtreSelectionneUstensile; 

                selectFilterUstensile.classList.remove("select-hide"); 
            }
            refreshUstensileSelectedItems();
            tagsItems();

            //on simule un clic sur newSelect
            newSelectUstensiles.click();//pour fermer le menu
            newSelectUstensiles.classList.toggle("select-hide");
        })
        //Ajout de l'option dans le menu Deroulant
        menuDeroulantUstensiles.appendChild(newOption);

    }
    //selectDiv.appendChild(menuDeroulant);
    selectUstensile.appendChild(menuDeroulantUstensiles);

    newSelectUstensiles.addEventListener("click", function(e) {
        e.stopPropagation();
        //console.log(this)
        //retrait du select-hide du menu
        this.nextSibling.classList.toggle("select-hide");
        //selectUstensile.classList.remove("select-hide");
        this.classList.add("select-hide");
        
        //ajout de la classe active à newFilterSelected pour changer le sens de la flèche
        //this.classList.toggle("active");

        //Fermeture d'une dropdown à l'ouverture d'une autre
        selectIngredients.classList.add("select-hide");
        newSelectIngredient.classList.remove("select-hide");

        selectAppareil.classList.add("select-hide");
        newSelectAppareil.classList.remove("select-hide");
    })

    searchUstensile.addEventListener("click", function () {

        this.innerHTML = "";
        if(this.getAttribute("contenteditable") == "true") {
        this.setAttribute("contenteditable", "false");
        //this.innerHTML = filtreSelectionneIngredient;
        }
        else {
            this.setAttribute("contenteditable", "true");
            //this.innerHTML = "Ingrédients";
            //on donne le focus à notre champ
            this.focus();
        }
    })

    //on met en place le filtre de contenu sur l'événement  input
    searchUstensile.addEventListener("input", function(e) {
        //on récupère la saisie en minuscules
        let saisie = this.textContent.toLowerCase();
        console.log(saisie);
        console.log(e);

        //on parcourt tous les enfants de notre menu(newMenu)
        for(let option of menuDeroulantUstensiles.children) {
            //on vérifie si la saisie existe dans la chaîne
            if(option.textContent.toLowerCase().search(saisie) > -1) {//-1 pcq search renvoie -1 s'il ne trouve pas
                option.style.display = "block";
            }
            else {
                option.style.display = "none";
            }
        }
    })

    
    function tagsItems () {
        const tagConteneur = document.getElementById("items-selected");
        tagConteneur.innerHTML = "";
        
        tagSelected.forEach((element ) => {
            const tag = document.createElement("div");
            tag.innerHTML = element.nom;
            tag.classList.add("tags", "bleu", "vert", "orange");

            const closeButton = document.createElement("i");
            closeButton.classList.add("far", "fa-times-circle");
            tag.appendChild(closeButton);

            if(element.couleur === 'bleu') {
                tag.style.backgroundColor = "#3282F7";   
            }
            else if (element.couleur === 'vert') {
                tag.style.backgroundColor = "#68D9A4";
            }
            else if (element.couleur === 'orange') {
                tag.style.backgroundColor = "#ED6454";
            }

            closeButton.addEventListener("click", buttonClose);
            function buttonClose () {
                //tag.innerHTML = "";
                //tagSelected.splice("tag");
                tagSelected.pop();
                tagsItems();
                //tagConteneur.innerHTML = "";   
            }
            tagConteneur.appendChild(tag);
        })
    };
   //tagsItems();
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
    const recipies = await getRecipies();
    filtreCards.addEventListener("input", function() {
        let saisie = this.value.toLowerCase().trim();//trim pour supprimer les espaces dans la saisie
    
        recipies.forEach((card) => {
            //console.log(`recette-${card.id}`);
            var carteFiltre = document.getElementById(`recette-${card.id}`);
            carteFiltre.style.display = (card.name.toLowerCase().trim().includes(saisie)) ? "block" : "none";//fonction ternaire:if, display block, else, display none
        });
    });
}
cardFilter();

// async function ingredientsListFilter () {
//     const recipies = await getRecipies();
//     filtreCards.addEventListener("input", function () {
//         let saisie = this.value.toLowerCase().trim();
//         recipies.forEach((list) => {
//             //console.log(`${buildDescription(list.ingredients)}`);
//             var listeIngredientFiltre = document.getElementById(`recette-${list.id}`);
//             listeIngredientFiltre.style.display = (`${buildDescription(list.ingredients)}`.toLowerCase().trim().includes(saisie)) ? "block" : "none";
//         })
//     })
// }
// ingredientsListFilter();

// async function descriptionFilter () {
//     const recipies = await getRecipies();
//     filtreCards.addEventListener("input", function() {
//         let saisie = this.value.toLowerCase().trim();
//         recipies.forEach((describe) => {
//             //console.log(describe.description);
//             var descriptionFiltre = document.getElementById(`recette-${describe.id}`);
//             descriptionFiltre.style.display = (describe.description.toLowerCase().trim().includes(saisie)) ? "block" : "none";//fonction ternaire:if, display block, else, display none
//         });
//     });
// }
// descriptionFilter();

// function test () {
//     if 
// }

