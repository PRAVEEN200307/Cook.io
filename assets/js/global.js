/**
 * @license MIT
 * @copyright 2023 codewithsadee
 * @author codewithsadee <mohammadsadee24@gmail.com>
 */

"use strict";

import { fetchData } from "./api.js";


/**
 * Add event on multiple elements
 * @param {NodeList} $elements NodeList 
 * @param {String} eventTypes  Event type string
 * @param {Funtion} callback Callback function
 */

window.addEventOnElements =($elements,eventTypes,callback)=>{
    for(const $element of $elements){
        $element.addEventListener(eventTypes,callback);
    }
}
// window.addEventOnElements 

export const cardQueries =[
    ["field","uri"],
    ["field","label"],
    ["field","image"],
    ["field","totalTime"],
]

//  Skwleton card

export const  $skeletoncard  = `
<div class="card skeleton-card">
 <div class="skeleton card-banner"></div>
   <div class="card-body">
     <div class="skeleton card-title"></div>
     <div class="skeleton card-text"></div> 
   </div>
</div>
`;


// 2:34:54
const  ROOT = "https://api.edamam.com/api/recipes/v2";

window.saveRecipe = function(element ,recipeId){
  const isSaved = window.localStorage.getItem(`cookkio-recipe${recipeId}`);
  ACCESS_POINT = `${ROOT}/${recipeId}`;

  if(!isSaved){
    fetchData(cardQueries,function(data){
       window.localStorage.setItem(`cookkio-recipe${recipeId}`,JSON.stringify(data));
       element.classList.toggle("saved");
       element.classList.toggle("removed");
       showNotificaton("Added to  Recipe Book")
    });
    ACCESS_POINT = ROOT;
  }else{
     window.localStorage.removeItem(`cookkio-recipe${recipeId}`);
     element.classList.toggle("saved");
     element.classList.toggle("removed");
     showNotificaton("Removed from Recipe Book")
  }
}


const $snackbarContainer = document.createElement("div");
$snackbarContainer.classList.add("snackbar-container");
document.body.appendChild($snackbarContainer);

function showNotificaton(message){
   const  $snackbar = document.createElement("div");
   $snackbar.classList.add("snackbar");
   $snackbar.innerHTML = `<p class="body-medium">${message}</p>`;
   $snackbarContainer.appendChild($snackbar);
   $snackbar.addEventListener("animationend",(e)=> $snackbarContainer.removeChild($snackbar));
}