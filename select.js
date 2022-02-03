 window.onload = () => {

// }
// <select  name="" class="ingredients" id="">
//     <option value="">Ingredients</option>
//     <option value="lait de coco">Lait de coco</option>
//     <option value="sucre">Sucre</option>
//     <option value="concombre">Concombre</option>
// </select>

// async function mesOptions () {
//     const divSelect = document.querySelector('.select-filter');
//     const recipies = await getRecipies();
//     recipies.forEach(function(recettes) {

// recettes.ingredients.forEach(function (mesIngredients) {
//     var  

async function  getRecipies () {
    const response = await fetch('/assets/recipies.json')
    const json = await response.json();
    console.log(json)
    // obj = JSON.parse(json.recipies);
    // console.log(obj)
   return json.recipies;
}
async function menuSelect () {
    console.log(menuSelect)
    const section = document.querySelector('.select');
    const recipies = await getRecipies();
    recipies.ingredients.forEach(function(mesIngredients) {
        console.log(mesIngredients)
         var monHtml = ` 
         <div class="select-filter">
            <div class="select-filter__item ">
                <select  name="" class="ingredients" id="">
                    <option value="">Ingredients</option>
                    <option value="lait de coco">Lait de coco</option>
                    <option value="sucre">Sucre</option>
                    <option value="concombre">Concombre</option>
                </select>
            </div>
            <div class="select-filter__item ">
                <select  name="" id="" class="appareil">
                    <option value="">Appareil</option>
                    <option value="blender">Blender</option>
                </select>
            </div>
            <div class="select-filter__item" >
                <select name="" id="" class="ustensiles">
                    <option value="">Ustensiles</option>
                    <option value="casseroles">Casseroles</option>>
                </select>
            </div>
         </div>
         `
        }
     )}
    }

    function build (ingredients) {
        return ingredients.map(ingredient => 
        `<p class="recette__ingredients--p"><span class="recette__ingredients--p--span">${ingredient.ingredient}</span>: <span>${ingredient.quantity}</sapn></p>`).join('');
    }

    const selectElt = document.querySelector("select"); //récupération select

    const selectDiv = document.querySelector(".select-filter__item")//selectFilter

    const newSelect = document.querySelector(".select-filter__donnees--label")// <div id="ingredients" class="select-filter__donnees"> ::after, select-items div { border-bottom} select-hide{display:none}

    /*newSelect.classList.add("new-select")*///class="select-filter__donnees"

    //contenu de l'option choisie
    newSelect.innerHTML = selectElt.options[selectElt.selectedIndex].innerHTML;

    //création élément dans le DOM
    /*selectDiv.appendChild(newSelect)*/

    //création menu déroulant
    const newMenu = document.querySelector("ul")//ul
    /*newMenu.classList.add("select-items", "select-hide")*/

    //boucle sur toutes options dans le select et les copier dans la div
    for(let option of selectElt.option) {
        //création div pour cette option
        const newOption = document.querySelector(".select-item");//li

        //on copie le contenu de l'option
        newOption.innerHTML = option.innerHTML;

        //on ajoute un écouteur d'événements "clic" sur l'option
        newOption.addEventListener("click", function() {
            //on boucle sur chacune des options du select original
            for(let option of selectElt.options) {
                if(option.innerHTML === this.innerHTML){//si le contenu de mon option correspond à l'option sur lequel je clique 
                    //on active la bonne option dans le select
                    selectElt.selectedIndex = option.index;

                    //on change le texte de notre newSelect
                    newSelect.innerHTML = this.innerHTML;
                    break;
                }
            }
            //on simule un clic sur newSelect
            newSelect.click();//pour fermer le menu
        })

        //on ajoute l'option dans le newMenu
        /*newMenu.appendChild(newOption);*/
    }


    //afficher menu
    selectDiv.appendChild(newMenu)

    //on ajoute l'écouteur d'événements click sur newSelect
    newSelect.addEventListener("click", function(e) {
        //on empêche la propagation du clic
        e.stopPropagation();

        //on retire le "select-hide" de notre menu
        this.nextSibling.classList.toggle("select-hide")

        //on ajoute la classe active à newSelect(changer la flèche)
        this.classList.toggle("active") //.new-select.active::after{border-color, top}

        //on modifie l'attribut contenteditable pour pouvoir taper une valeur
        if(this.getAttribute("contenteditable") == "true") {
            this.setAttribute("contenteditable", "false");
        }
        else {
            this.setAttribute("contenteditable", "true");
            //on donne le focus à notre champ
            this.focus();
        }


    })

    //on met en place le filtre de contenu sur l'événement  input
    newSelect.addEventListener("input", function() {
        //on récupère la saisie en minuscules
        let saisie = this.textContent.toLowerCase();

        //on parcourt tous les enfants de notre menu(newMenu)
        for(let option of newMenu.children) {
            //on vérifie si la saisie existe dans la chaîne
            if(option.textContent.toLowerCase().search(saisie) > -1) {//-1 pcq search renvoie -1 s'il ne trouve pas
                option.style.display = "block";
            }
            else {
                option.style.display = "none";
            }
        }
    })

    const filtreCards = document.getElementById("filtre-cards"); 
    //filtreCards.addEventListener("input", cardsFiltres)
    filtreCards.addEventListener("input", function() {
        const recipies = await getRecipies();
        let saisie = this.textContent.toLocaleLowerCase();

        recipies.forEach(function(cards) {
            if(cards.textContent.toLowerCase().filter(saisie) !== -1){
                cards.style.display = "block";
            }
            else {
                cards.style.display = "none";
            }
        })
        
    })

    function filtreTexte(arr, requete) {
        return arr.filter(function (el) {
          return el.toLowerCase().indexOf(requete.toLowerCase()) !== -1;
        })
      }

      function filtrerParID(obj) {
        // Si c'est un nombre
        if (obj.id !== undefined && typeof(obj.id) === 'number' && !isNaN(obj.id)) {
          return true;
        } else {
          elementsInvalides++;
          return false;
        }
      }
      
      var arrByID = arr.filter(filtrerParID);

      function filtrerParName(json) {
        return json.filter(function (el) {
            return el.toLowerCase().indexOf(requete.toLowerCase()) !==-1;
        })
      }
      


window.onload = () => {
        //Récupération du select
    const selectElement = document.querySelector("select");
    console.log(selectElement)
    
    //Récupurétion 1ère div "select-filter"
    const selectDiv = document.querySelector(".select-filter__item");
    
    //CREATION DE BLOCS POUR LES ELEMENTS SELECTIONNES
        const selectedItems = document.createElement("div");
        selectedItems.classList.add("selected-items");
    
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
    
    
        selectDiv.appendChild(selectedItems);
    
    //FIN DU TABLEAU
    
    //Création nouveau select
    //const newFilterSelected = document.querySelector(".ingredient-selected");
    //const newFilterSelected = document.createElement("div");
    
    //Ajout de la classe "new-select"
    //newFilterSelected.classList.add("select-filter__donnees");
    //newFilterSelected.classList.add("select-filter-selected", "ingredient-selected");
    //console.log(newFilterSelected)
    console.log(selectFilterIngredient)
    
    //Ajout de l'option actuellement choisie dans le select
    //newFilterSelected.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML;
    //selectFilterIngredient.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML;
    console.log(selectFilterIngredient.innerHTML)
    
    //Création de l'élément dans le DOM
    //selectDiv.appendChild(newFilterSelected);

//CREATION DU BLOC INGREDIENTS DANS LE DOM
const selectIngredients = document.createElement("div");
selectIngredients.classList.add("select-filter__donnees");
selectIngredients.setAttribute("id", "ingredients");

const searchIngredient = document.createElement("div");
searchIngredient.classList.add("select-filter__donnees--label");
searchIngredient.textContent= "Rechercher un ingredient";


selectIngredients.appendChild(searchIngredient);
selectDiv.appendChild(selectIngredients)
console.log(selectIngredients)

//CREATION DU BLOC APPAREIL DANS LE DOM
const selectAppareil = document.createElement("div");
selectAppareil.classList.add("select-filter__donnees");
selectAppareil.setAttribute("id", "appareil");

const searchAppareil = document.createElement("div");
searchAppareil.classList.add("select-filter__donnees--label");
searchAppareil.textContent= "Rechercher un ingredient";

selectAppareil.appendChild(searchAppareil);
selectDiv.appendChild(searchAppareil)
console.log(selectAppareil);

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

selectFilterIngredient.addEventListener("click", function(e) {
    e.stopPropagation();
    console.log(this)
    //retrait du select-hide du menu
    this.nextSibling.classList.toggle("select-hide");
    //this.classList.add("select-hide");
    
    //ajout de la classe active à newFilterSelected pour changer le sens de la flèche
    this.classList.toggle("active");
})


}

function ingredientSelect () {
    //Récupération du select
    const selectElementIngredients = document.getElementById("select-ingredients");
    //Récupération 1ère div "select-filter"
    const selectDiv = document.querySelector(".select-filter__item");
    //CREATION DE BLOCS POUR LES INGREDIENTS SELECTIONNES
    const selectedItems = document.createElement("div");
    selectedItems.classList.add("selected-items");

    const selectedItems = document.createElement("div");
    selectedItems.classList.add("selected-items");

    //Création div et icone ingredient
    const selectFilterIngredient = document.createElement("div");
    selectFilterIngredient.classList.add("select-filter-selected", "ingredient-selected" );
    selectedItems.appendChild(selectFilterIngredient);
    const iconeIngredient = document.createElement("i")
    iconeIngredient.classList.add("far", "fa-times-circle");
    selectFilterIngredient.appendChild(iconeIngredient);

    selectDiv.appendChild(selectedItems);

    //CREATION DU BLOC INGREDIENTS DANS LE DOM
    const selectIngredients = document.createElement("div");
    selectIngredients.classList.add("select-filter__donnees");
    selectIngredients.setAttribute("id", "ingredients");

    const searchIngredient = document.createElement("div");
    searchIngredient.classList.add("select-filter__donnees--label");
    searchIngredient.textContent= "Rechercher un ingredient";

    selectIngredients.appendChild(searchIngredient);
    selectDiv.appendChild(selectIngredients);
    console.log(selectIngredients);

    //Création menu déroulant et ajout de classe et id
    const menuDeroulant = document.createElement("ul");
    menuDeroulant.classList.add("select-items", "select-hide");
    menuDeroulant.setAttribute("id", "ul-ingredients");
        
    //Boucle sur les options dans le select et les copier dans la div
    for(let option of selectElementIngredients.options) {
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

    selectFilterIngredient.addEventListener("click", function(e) {
        e.stopPropagation();
        console.log(this)
        //retrait du select-hide du menu
        this.nextSibling.classList.toggle("select-hide");
        //this.classList.add("select-hide");
        
        //ajout de la classe active à newFilterSelected pour changer le sens de la flèche
        this.classList.toggle("active");
    })
}

function appareilSelect () {
     //Récupération du select
     const selectElementAppareil = document.getElementById("select-appareil");
     //Récupération 1ère div "select-filter"
     const selectDiv = document.querySelector(".select-filter__item");
     //CREATION DE BLOCS POUR LES APPAREILS SELECTIONNES
     const selectedItems = document.createElement("div");
     selectedItems.classList.add("selected-items");
 
     const selectedItems = document.createElement("div");
     selectedItems.classList.add("selected-items");
 
     //Création div et icone Appareil
     const selectFilterAppareil = document.createElement("div");
     selectFilterAppareil.classList.add("select-filter-selected", "appareil-selected" );
     selectedItems.appendChild(selectFilterAppareil);
     const iconeAppareil = document.createElement("i")
     iconeAppareil.classList.add("far", "fa-times-circle");
     selectFilterAppareil.appendChild(iconeAppareil);
 
     selectDiv.appendChild(selectedItems);
 
    //CREATION DU BLOC APPAREIL DANS LE DOM
    const selectAppareil = document.createElement("div");
    selectAppareil.classList.add("select-filter__donnees");
    selectAppareil.setAttribute("id", "appareil");

    const searchAppareil = document.createElement("div");
    searchAppareil.classList.add("select-filter__donnees--label");
    searchAppareil.textContent= "Rechercher un appareil";

    selectAppareil.appendChild(searchAppareil);
    selectDiv.appendChild(searchAppareil)
    console.log(selectAppareil);
 
     //Création menu déroulant et ajout de classe et id
     const menuDeroulant = document.createElement("ul");
     menuDeroulant.classList.add("select-items", "select-hide");
     menuDeroulant.setAttribute("id", "ul-appareil");
         
     //Boucle sur les options dans le select et les copier dans la div
     for(let option of selectElementAppareil.options) {
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
     selectAppareil.appendChild(menuDeroulant);
 
     selectFilterIngredient.addEventListener("click", function(e) {
         e.stopPropagation();
         console.log(this)
         //retrait du select-hide du menu
         this.nextSibling.classList.toggle("select-hide");
         //this.classList.add("select-hide");
         
         //ajout de la classe active à newFilterSelected pour changer le sens de la flèche
         this.classList.toggle("active");
     })
}

function ustensileSelect () {
    //Récupération du select
    const selectElementUstensiles = document.getElementById("select-ustensiles");
    //Récupération 1ère div "select-filter"
    const selectDiv = document.querySelector(".select-filter__item");
    //CREATION DE BLOCS POUR LES APPAREILS SELECTIONNES
    const selectedItems = document.createElement("div");
    selectedItems.classList.add("selected-items");

    const selectedItems = document.createElement("div");
    selectedItems.classList.add("selected-items");

    //Création div et icone Ustensiles
    const selectFilterUstensile = document.createElement("div");
    selectFilterUstensile.classList.add("select-filter-selected", "ustensile-selected" );
    selectedItems.appendChild(selectFilterUstensile);
    const iconeUstensile = document.createElement("i")
    iconeUstensile.classList.add("far", "fa-times-circle");
    selectFilterUstensile.appendChild(iconeUstensile);


    selectDiv.appendChild(selectedItems);

   //CREATION DU BLOC APPAREIL DANS LE DOM
   const selectUstensile = document.createElement("div");
   selectUstensile.classList.add("select-filter__donnees");
   selectUstensile.setAttribute("id", "ustensile");

   const searchUstensile = document.createElement("div");
   searchUstensile.classList.add("select-filter__donnees--label");
   searchUstensile.textContent= "Rechercher un ustensile";

   selectUstensile.appendChild(searchUstensile);
   selectDiv.appendChild(searchUstensile)
   console.log(searchUstensile);

    //Création menu déroulant et ajout de classe et id
    const menuDeroulant = document.createElement("ul");
    menuDeroulant.classList.add("select-items", "select-hide");
    menuDeroulant.setAttribute("id", "ul-ustensiles");
        
    //Boucle sur les options dans le select et les copier dans la div
    for(let option of selectElementUstensiles.options) {
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
    selectUstensile.appendChild(menuDeroulant);

    selectFilterUstensile.addEventListener("click", function(e) {
        e.stopPropagation();
        console.log(this)
        //retrait du select-hide du menu
        this.nextSibling.classList.toggle("select-hide");
        //this.classList.add("select-hide");
        
        //ajout de la classe active à newFilterSelected pour changer le sens de la flèche
        this.classList.toggle("active");
    })
}

selectFilterIngredient//bloc où mettre les ingredients selectionnés
ingredientSelected//tableau d'ingredients
filtreSelectionneIngredient
ingredientSelected.push(filtreSelectionneIngredient);

const ingredientSelected = [];

//const itemSelected = document.getElementById("items-selected");

function refreshSelectedItems () {

    document.getElementById('items-selected').innerHTML = "";
    selectFilterIngredient.innerHTML = filtreSelectionneIngredient;  
}
ingredientSelected.push(filtreSelectionneIngredient);
selectedItems.forEach(function(items) {
})

            
            // selectedItems.forEach(function(items) {
            //     document.getElementById('items-selected').innerHTML = "";
            //     selectFilterIngredient.innerHTML = filtreSelectionneIngredient;
            //     console.log(items);
            // })


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

const newSelectItemsAppareil = document.createElement("div");
newSelectItemsAppareil.classList.add("new-select-items");
selectDiv.appendChild(newSelectItemsAppareil);


//CREATION DU NOUVEAU SELECT INGREDIENT ET DU BLOC INGREDIENTS DANS LE DOM
const newSelectIngredient = document.createElement("div");
newSelectIngredient.classList.add("new-select", "new-select-ingredients");
newSelectIngredient.textContent = "Ingrédients";

//Ajout de l'option actuellement choisie dans le select
//newSelect.innerHTML = selectFilterIngredient.options[selectFilterIngredient.selectedIndex].innerHTML;

const selectIngredients = document.createElement("div");
selectIngredients.classList.add("select-filter__donnees", "select-hide", "select-filter__ingredient");
selectIngredients.setAttribute("id", "ingredients");
console.log(selectIngredients)


const searchIngredient = document.createElement("div");
searchIngredient.classList.add("select-filter__donnees--label");
searchIngredient.textContent= "Rechercher un ingredient";

selectIngredients.appendChild(searchIngredient);
customSelectItems.appendChild(selectIngredients);
// selectDiv.appendChild(customSelectItems);
// console.log(selectIngredients);

newSelectItems.appendChild(newSelectIngredient);
newSelectItems.appendChild(selectIngredients);
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
newSelectItemsAppareil.appendChild(newSelectAppareil);

//CREATION DU NOUVEAU SELECT USTENSILE
const newSelectUstensiles = document.createElement("div");
newSelectUstensiles.classList.add("new-select", "new-select-ustensiles");
newSelectUstensiles.textContent = "Ustensiles";
newSelectItems.appendChild(newSelectUstensiles);

//CREATION DES BLOCS DANS LE DOM
selectDiv.appendChild(customSelectItems);

// //1.CREATION DU BLOC INGREDIENTS DANS LE DOM
// const selectIngredients = document.createElement("div");
// selectIngredients.classList.add("select-filter__donnees", "select-hide", "select-filter__ingredient");
// selectIngredients.setAttribute("id", "ingredients");
// console.log(selectIngredients)


// const searchIngredient = document.createElement("div");
// searchIngredient.classList.add("select-filter__donnees--label");
// searchIngredient.textContent= "Rechercher un ingredient";

// selectIngredients.appendChild(searchIngredient);
// customSelectItems.appendChild(selectIngredients);
// selectDiv.appendChild(customSelectItems);
// console.log(selectIngredients);

// //2.CREATION DU BLOC APPAREIL DANS LE DOM
// const selectAppareil = document.createElement("div");
// selectAppareil.classList.add("select-filter__donnees", "select-hide");
// selectAppareil.setAttribute("id", "appareil");

// const searchAppareil = document.createElement("div");
// searchAppareil.classList.add("select-filter__donnees--label");
// searchAppareil.textContent= "Rechercher un appareil";

// selectAppareil.appendChild(searchAppareil);
// customSelectItems.appendChild(selectAppareil);
// selectDiv.appendChild(customSelectItems);
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
            //newSelectIngredient.style.display = "none";
            //document.getElementById('items-selected').innerHTML = filtreSelectionneIngredient; 
        }
        refreshSelectedItems();
        console.log(refreshSelectedItems);
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
    //menuDeroulantIngredients.classList.toggle("select-hide");

    //ajout de la classe active à newFilterSelected pour changer le sens de la flèche
    this.classList.toggle("active");//.new-select.active::after{border-color, top}

    //on modifie l'attribut contenteditable pour pouvoir taper une valeur
    if(this.getAttribute("contenteditable") == "true") {
        this.setAttribute("contenteditable", "false");
        this.innerHTML = "";
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
newSelectIngredient.addEventListener("input", function() {
    //on récupère la saisie en minuscules
    let saisie = this.textContent.toLowerCase();
    console.log(saisie);

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