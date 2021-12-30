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








