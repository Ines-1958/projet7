async function  getRecipies () {
    const response = await fetch('/assets/recipies.json')
    const json = await response.json();
    console.log(json)
    // obj = JSON.parse(json.recipies);
    // console.log(obj)
   return json.recipies;
}


async function mesRecettes () {
    const section = document.querySelector('.recettes');
    const recipies = await getRecipies();
    recipies.forEach(function(recettes) {
        console.log(recettes)
         var myHtml = `
         <div class="recettes-bloc">
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

// function buildDescription (ingredients) {
//     return ingredients.map(ingredient => 
//     `<p class="recette__ingredients--p"><span class="recette__ingredients--p--span">${ingredient.ingredient}</span>: <span>${ingredient.quantity}</sapn></p>`).join('');
// }

// function buildDescription (ingredients) {
//     return ingredients.map(ingredient => {
//         if (ingredient.unit == undefined) {
//            `<p>${ingredient.ingredient}: ${ingredient.quantity} </p>`;
//         }

//         else {
//             `<p>${ingredient.ingredient}: ${ingredient.quantity} ${ingredient.unit}</p>`
//         }
//     }
// )}

function buildDescription (ingredients) {
    return ingredients.map( ingredient => {
        if (ingredient.unit !== undefined) {
            return `<p>${ingredient.ingredient}: ${ingredient.quantity} ${ingredient.unit}</p>`;   
        }
        else if (ingredient.quantity !== undefined){
            return `<p>${ingredient.ingredient}: ${ingredient.quantity}</p>`;
        }
        else {
            return `<p>${ingredient.ingredient}</p>`;  
        }
    }
)}
