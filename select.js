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
         var myHtml = `
         `
        }
     )}
    }