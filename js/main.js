const ingredientSelected = [];
const appareilSelected = [];
const ustensileSelected = [];
let tagSelected = [];

async function  getRecipies () {
    const response = await fetch('assets/recipies.json')
    const json = await response.json();
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
                        
                        ustensiles.forEach(e => monHtml += `<option value="${e}">${e}</option>`);
                        monHtml += ` 
                    </select>
                </div>
        </div>`;
    sectionSelect.innerHTML += monHtml; 
}
monSelect();

window.onload = () => {
    mesRecettes();
    //Récupération du select
    const selectElementIngredients = document.getElementById("select-ingredients");
    const selectElementAppareil = document.getElementById("select-appareil");
    const selectElementUstensiles = document.getElementById("select-ustensiles");

    //CREATION DE BLOCS POUR LES ELEMENTS SELECTIONNES
    const selectedItems = document.createElement("div");
    selectedItems.classList.add("selected-items");
    selectedItems.setAttribute("id", "items-selected");

    //Création div et ingredient
    const selectFilterIngredient = document.createElement("div");
    selectFilterIngredient.classList.add("select-filter-selected", "select-hide", "ingredient-selected");
    selectedItems.appendChild(selectFilterIngredient);
    
    //Création div Appareil
    const selectFilterAppareil = document.createElement("div");
    selectFilterAppareil.classList.add("select-filter-selected", "select-hide", "appareil-selected");
    selectedItems.appendChild(selectFilterAppareil);
    
    //Création div Ustensiles
    const selectFilterUstensile = document.createElement("div");
    selectFilterUstensile.classList.add("select-filter-selected", "select-hide","ustensile-selected");
    selectedItems.appendChild(selectFilterUstensile);

    //Récupération 1ère div "select-filter"
    const selectDiv = document.querySelector(".select-filter__item"); 
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

    const selectIngredients = document.createElement("div");
    selectIngredients.classList.add("select-filter__donnees", "select-hide", "select-filter__ingredient");
    selectIngredients.setAttribute("id", "ingredients");

    const searchIngredient = document.createElement("div");
    searchIngredient.classList.add("select-filter__donnees--label");
    searchIngredient.setAttribute("id", "label-ingredient")
    searchIngredient.textContent= "Rechercher un ingrédient";

    selectIngredients.appendChild(searchIngredient);

    newSelectItemsIngredients.appendChild(newSelectIngredient);
    newSelectItemsIngredients.appendChild(selectIngredients);

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
            const filtreSelectionneIngredient = event.target.getAttribute("data-filter");
            //si le tag selectionné n'existe pas dans le tableau, l'ajouter(s'il existe déjà, on ne l'ajoute plus)
            if(!tagSelected.some(element => element.nom === filtreSelectionneIngredient) ) {
                tagSelected.push({couleur:"bleu", nom:filtreSelectionneIngredient})
            }

            selectElementIngredients.selectedIndex = option.index;
            //on simule un clic sur newSelect
            newSelectIngredient.click();//pour fermer le menu
            newSelectIngredient.classList.toggle("select-hide");
            tagsItems();//appel de la fonction de traitement des tags
        })

        //Ajout de l'option dans le menu Deroulant
        menuDeroulantIngredients.appendChild(newOption);    
    }
    selectIngredients.appendChild(menuDeroulantIngredients);

    newSelectIngredient.addEventListener("click", function(e) {
        e.stopPropagation();

        //retrait du select-hide du menu
        this.nextSibling.classList.toggle("select-hide");
        this.classList.add("select-hide");

        //Fermeture d'une dropdown à l'ouverture d'une autre
        selectAppareil.classList.add("select-hide");
        newSelectAppareil.classList.remove("select-hide");

        selectUstensile.classList.add("select-hide");
        newSelectUstensiles.classList.remove("select-hide");
    })

    searchIngredient.addEventListener("click", function () {
        if(this.getAttribute("contenteditable") == "true") {
            this.setAttribute("contenteditable", "false");
        }
        else {
            this.setAttribute("contenteditable", "true");
            this.focus();//on donne le focus à notre champ    
            this.innerHTML = "";
        }
    })

    //mise en place du filtre de contenu sur l'événement  input
    searchIngredient.addEventListener("input", function(e) {
        //on récupère la saisie en minuscules
        let saisie = this.textContent.toLowerCase();
        
        //On déclenche la recherche à partir de 3 caractères
        if(saisie.length > 2) {
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
        }
        
        if(saisie.length === 0) {
            for(let option of menuDeroulantIngredients.children) {
                //on vérifie si la saisie existe dans la chaîne
                if(option.textContent.toLowerCase().search(saisie) > -1) {//-1 pcq search renvoie -1 s'il ne trouve pas
                    option.style.display = "block";
                }
                else {
                    option.style.display = "none";
                    tagsItems();
                }
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

            if(!tagSelected.some(element => element.nom === filtreSelectionneAppareil) ) {
                tagSelected.push({couleur:"vert", nom:filtreSelectionneAppareil});
            }

            selectElementAppareil.selectedIndex = option.index;
    
            //on simule un clic sur newSelect
            newSelectAppareil.click();//pour fermer le menu
            newSelectAppareil.classList.toggle("select-hide");
            
            tagsItems();
        })

        //Ajout de l'option dans le menu Deroulant
        menuDeroulantAppareil.appendChild(newOption);
    }
    selectAppareil.appendChild(menuDeroulantAppareil);

    newSelectAppareil.addEventListener("click", function(e){
        e.stopPropagation();
        //retrait du select-hide du menu
        this.nextSibling.classList.toggle("select-hide");
        this.classList.add("select-hide");

        //Fermeture d'une dropdown à l'ouverture d'une autre
        selectIngredients.classList.add("select-hide");
        newSelectIngredient.classList.remove("select-hide");
        
        selectUstensile.classList.add("select-hide");
        newSelectUstensiles.classList.remove("select-hide");
    })
       
    searchAppareil.addEventListener("click", function () {
        if(this.getAttribute("contenteditable") == "true") {
            this.setAttribute("contenteditable", "false");
        }
        else {
            this.setAttribute("contenteditable", "true");
            this.focus();//on donne le focus à notre champ
            this.innerHTML = "";
        }
    })

    //on met en place le filtre de contenu sur l'événement  input
    searchAppareil.addEventListener("input", function(e) {
        //on récupère la saisie en minuscules
        let saisie = this.textContent.toLowerCase();

        if(saisie.length > 2) {
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
        }
        if(saisie.length === 0) {
            for(let option of menuDeroulantAppareil.children) {
                //on vérifie si la saisie existe dans la chaîne
                if(option.textContent.toLowerCase().search(saisie) > -1) {//-1 pcq search renvoie -1 s'il ne trouve pas
                    option.style.display = "block";
                }
                else {
                    option.style.display = "none";
                    tagsItems();
                }
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

            if(!tagSelected.some(element => element.nom === filtreSelectionneUstensile) ) {
                tagSelected.push({couleur:"orange", nom:filtreSelectionneUstensile});
            }
            selectElementUstensiles.selectedIndex = option.index;
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
        //retrait du select-hide du menu
        this.nextSibling.classList.toggle("select-hide");
        this.classList.add("select-hide");
        
        //Fermeture d'une dropdown à l'ouverture d'une autre
        selectIngredients.classList.add("select-hide");
        newSelectIngredient.classList.remove("select-hide");

        selectAppareil.classList.add("select-hide");
        newSelectAppareil.classList.remove("select-hide");
    })

    searchUstensile.addEventListener("click", function () {
        if(this.getAttribute("contenteditable") == "true") {
            this.setAttribute("contenteditable", "false");
        }
        else {
            this.setAttribute("contenteditable", "true");
            this.focus();//on donne le focus au champ
            this.innerHTML = "";
        }
    })

    //on met en place le filtre de contenu sur l'événement  input
    searchUstensile.addEventListener("input", function(e) {
        //on récupère la saisie en minuscules
        let saisie = this.textContent.toLowerCase();

        if(saisie.length > 2) {
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
        }
        if(saisie.length === 0) {
            for(let option of menuDeroulantUstensiles.children) {
                //on vérifie si la saisie existe dans la chaîne
                if(option.textContent.toLowerCase().search(saisie) > -1) {//-1 pcq search renvoie -1 s'il ne trouve pas
                    option.style.display = "block";
                }
                else {
                    option.style.display = "none";
                    tagsItems();
                }
            }
        }
    })

    //Fonction de gestion de tags(affichage, fermeture et filtre)
    function tagsItems () {
        const tagConteneur = document.getElementById("items-selected");
        tagConteneur.innerHTML = "";   
        tagSelected.forEach((element ) => {
            const tag = document.createElement("div");
            tag.innerHTML = element.nom;
            tag.classList.add("tags", "bleu", "vert", "orange");
            
            const closeButton = document.createElement("i");
            closeButton.classList.add("far", "fa-times-circle");
            closeButton.setAttribute("name", element.nom);
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
            function buttonClose (e) {
                const name = e.target.getAttribute("name");
                tagSelected = tagSelected.filter(tag => tag.nom !== name);
                tagsItems();
            }
            tagConteneur.appendChild(tag);
        })
        globalFilter();
    };
}

async function mesRecettes (recipiesSelected) {
    const section = document.querySelector('.recettes');
    section.innerHTML = "";
    const recipiesToDisplay = recipiesSelected === undefined? await getRecipies() : recipiesSelected;
    
    recipiesToDisplay.forEach(function(recettes) {
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

function buildDescription (ingredients) {
    return ingredients.map( ingredient => {
        
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
const filtreCards = document.getElementById("filtre-cards");//input

async function cardFilter () {
    const recipies = await getRecipies();
    filtreCards.addEventListener("input", function() {
        let saisie = this.value.toLowerCase().trim();//trim pour supprimer les espaces dans la saisie
        
        globalFilter();    
    });
}
cardFilter();

//Fonction globale qui gère le filtre de recettes et de tags
async function globalFilter () {
    const recipies = await getRecipies();
    const input = document.getElementById("filtre-cards");
    let saisie = input.value.toLowerCase();
    const recipiesSelected = [];
    //if(saisie.length > 2) {
        for(let recipie of recipies) {

            if(recipie.name.toLowerCase().indexOf(saisie) > -1){
                recipiesSelected.push(recipie);
            }
            else if(buildDescription(recipie.ingredients).toLowerCase().indexOf(recipie) > -1){
                recipiesSelected.push(recipie);
            }
            else if(recipie.description.toLowerCase().indexOf(saisie) > -1) {
                recipiesSelected.push(recipie);
            }
        }
    
    
        let recipiesToDisplay = [];
        if(tagSelected.length !== 0) {
            tagSelected.forEach(tag => {
                if(tag.couleur === "vert") {
                    recipiesSelected.map(recipie => {
                        if(recipie.appliance.toLowerCase() === tag.nom.toLowerCase()) {
                            recipiesToDisplay.push(recipie);
                        }
                    })
                }
                else if(tag.couleur === "orange") {
                    recipiesSelected.map(recipie => {
                        if(recipie.ustensils.some(ustensil => ustensil.toLowerCase() === tag.nom.toLowerCase()) ) {
                            recipiesToDisplay.push(recipie);
                        }
                    })
                }
                else if(tag.couleur === "bleu") {
                    recipiesSelected.map(recipie => {
                        if(recipie.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === tag.nom.toLowerCase()) ) {
                            recipiesToDisplay.push(recipie);
                        }
                    })
                }
            }) 
        }
        else {
            recipiesToDisplay = recipiesSelected;
        }

        // Si le tableau recipiesToDisplay est vide, afficher le message d'erreur, sinon appeler mes recettes en envoyant ce tableau et supprimer le message d'erreur s'il y en avait un avant
        if(recipiesSelected.length === 0 ) {
            document.getElementById('erreur').innerHTML = "« Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc";
        }
        else {
            console.log(recipiesSelected);
            mesRecettes(recipiesSelected);
            document.getElementById('erreur').innerHTML = "";
        }
        
        mesRecettes(recipiesToDisplay);
    // }
    // else {
    //     mesRecettes(recipies);
    // }
}













