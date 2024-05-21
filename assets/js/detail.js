/**
 * @license MIT
 * @copyright 2023 codewithsadee
 * @author codewithsadee <mohammadsadee24@gmail.com>
 */

"use strict";

/**
 * Import
 */

 import { fetchData} from "./api.js";
 import {getTime} from "./module.js";

/**
 * Render data
 */


const $detailContainer =document.querySelector('[data-detail-container]');
ACCESS_POINT += `/${window.location.search.slice(window.location.search.indexOf('=') + 1)}`;


fetchData(null,data =>{
    

    const {
       images : { LARGE , REGULAR ,SMALL ,THUMBNAIL},
       label : title,
       source : author,
       ingredients = [],
       totalTime = cookingTime= 0,
       calories=0,
       cuisineType = [],
       dietLabels= [],
       dishType=[],
       yield:serving=0,
       ingredientLines =[],
       uri
    } = data.recipe ;
 


   document.title = `${title}- cook.io`

   const banner = LARGE??REGULAR??SMALL??THUMBNAIL;
   

   const {url,width,height } = banner;
   const  tags = [...cuisineType,...dietLabels,...dishType];

   

   let tagELements = "";
   let  ingredientItems = "";
   
   const recipeId=uri.slice(uri.lastIndexOf("_")+1)
   const isSaved = window.localStorage.getItem(`cookkio-recipe${recipeId}`);
   


   tags.map(tag =>{
      let type ="";

      if(cuisineType.includes(tag)){
         type = "cuisineType";
      }else if (dietLabels.includes(tag)){
        type ="diet";
      }else {
         type="dishType";
      }

      tagELements +=`
      <a href="./recipes.html?${type}=${tag.toLowerCase()}" class="filter-chip label-large has-state">
       ${tag}</a>
      `;
  


   })

   ingredientLines.map(ingredient =>{
      ingredientItems += `
      <li class="ingr-item">
          ${ingredient}
      </li>
      `
   });


   $detailContainer.innerHTML = `
   <figure class="detail-banner img-holder">
            <img src="${url}" alt=${title}
            width="100%" height="${height}">
   </figure>
    <div class="detail-content">
        <div class="title-wrapper">
            <h1 class="display-small">${title ?? "Untitled"}</h1>
            <button class="btn btn-secondary has-state has-icon ${isSaved ? "saved" : "removed"}"
            onclck="saveRecipe(this,'${recipeId}')">
                
                <span class="material-symbols-outlined bookmark_add" 
                aria-hidden="true">bookmark_add</span>

                <span class="material-symbols-outlined bookmark" 
                aria-hidden="true">bookmark</span>

                <span class="label-large save-text">save</span>
                <span class="label-large unsaved-text">Unsaved</span>
            </button>
        </div>

        <div class="detail-author label-large">
            <span class="span">by</span> ${author}
        </div>

        <div class="detail-stats">

            <div class="stats-item">
                <span class="display-medium">${ingredients.length}</span>

                <span class="label-medium">Ingredients</span>
            </div>

            <div class="stats-item">
                <span class="display-medium">
                ${getTime(totalTime).time || "<1"} </span>

                <span class="label-medium">
                  ${getTime(totalTime).timeUnit} 
                </span>
            </div>

            <div class="stats-item">
                <span class="display-medium">
                  ${Math.floor(calories)}
                </span>

                <span class="label-medium">Calories</span>
            </div>
            
        </div>

        ${tagELements ? `<div class="tag-list">${tagELements} </div>`:""}
        

        <h2 class="title-medium ingr-title">
            Ingredients
            <span class="label-medium">for ${serving} Servings</span>
        </h2>

        ${ingredientItems ? `<ul class="body-large ingr-list">
          ${ingredientItems}
        </ul>`:""} 

    </div>

   `;

   
})

