/**
 * @license MIT
 * @copyright 2023 codewithsadee
 * @author codewithsadee <mohammadsadee24@gmail.com>
 */

"use strict";


// Import

import { fetchData } from "./api.js";
import  {$skeletoncard ,cardQueries} from './global.js'
import  {getTime} from './module.js'

//  Accordion

/**
 * @param {NodeList} $element Accordion node
 */

const $accordions = document.querySelectorAll("[data-accordion]");
const initAccordion = function ($element){
  const $button = $element.querySelector('[data-accordion-btn]');
  let isExpanded = false;

  $button.addEventListener("click" ,function(){
     isExpanded = isExpanded ? false : true;
     this.setAttribute("aria-expanded",isExpanded);
  });
}

for(const $accordion of $accordions)initAccordion($accordion);

/**
 * Filter bar toggle for mobile screen
 */

const $filterBar = document.querySelector('[data-filter-bar]');
const $filterTogglers = document.querySelectorAll('[data-filter-toggler]');
const  $overlay = document.querySelector('[data-overlay]');

addEventOnElements($filterTogglers, "click" ,function(){
  $filterBar.classList.toggle("active");
  $overlay.classList.toggle("active");
  const bodyOverflow = document.body.style.overflow;
  document.body.style.overflow = bodyOverflow === "hidden" ? "visible" :'hidden';
});

// Filter submit and clear

const $filterSubmit = document.querySelector('[data-filter-submit]');
const $filterClear = document.querySelector("[data-filter-clear]");
const $filterSearch = $filterBar.querySelector('input[type="search"]');

$filterSubmit.addEventListener("click",function(){
   const  $filterCheckBoxes = $filterBar.querySelectorAll(
    "input:checked"
   );

   const queries = [];
   if($filterSearch.value)queries.push(["q",$filterSearch.value]);
  
   if($filterCheckBoxes.length){
      for(const $checkbox of $filterCheckBoxes){
        const key = $checkbox.parentElement.parentElement.dataset.filter;
        queries.push([key,$checkbox.value]);
      }
   }

    window.location.href = queries.length ? `/recipes.html?${queries.join('&').replace(/,/g,'=')}`:'./recipes.html';


});

$filterSearch.addEventListener("keydown",e=>{
  if( e.key === "Enter") $filterSubmit.click();
})

$filterClear.addEventListener('click',function(){
  const $filterCheckBoxes = $filterBar.querySelectorAll("input:checked");

  $filterCheckBoxes?.forEach(elem => elem.checked = false );
  $filterSearch.value &&= '';
});

const queryStr = window.location.search.slice(1);
const queries = queryStr && queryStr.split("&").map( i => i.split("="));
const $filterCount = document.querySelector('[data-filter-count]');

if(queries.length){
   $filterCount.style.display="block";
   $filterCount.innerHTML = queries.length;
}else{
  $filterCount.style.display = "none";
}

queryStr && queryStr.split("&").map(i =>{
  if(i.split('=')[0] === 'q'){
     $filterBar.querySelector("input[type='search']").value = i.split("=")[1].
     replace(/%20/g," ");
  }else{
     $filterBar.querySelector(`[value="${i.split('=')[1].replace(/%20/g," ")}]"`).checked = true; 
  }
});


const $filterBtn = document.querySelector('[data-filter-btn]');

window.addEventListener("scroll",e=>{
  $filterBtn.classList[window.scrollY >= 120 ? "add" : "remove"]("active");
});

/**
 * Request recipes and render
 */

const $gridList = document.querySelector("[data-grid-list]");
const $loadMore = document.querySelector("[data-load-more]");
const defaultQueries = [
  ["mealType" ,"breakfast"],
  ["mealType","dinner"],
  ["mealType","lunch"],
  ["mealType","snack"],
  ["mealType","teatime"],
  ...cardQueries
];

$gridList.innerHTML = $skeletoncard.repeat(20);
let nextPageUrl = "";

const renderRecipe = data =>{
 
  data.hits.map( (item,index)=>{
      const {
         recipe :{
           image,
           label:title,
           totalTime:cookingTime,
           uri:urival
         }
      } = item;

      const recipeId=urival.slice(urival.lastIndexOf("_")+1)
      const isSaved = window.localStorage.getItem(`cookkio-recipe${recipeId}`);

      const  $card = document.createElement("div");
      $card.classList.add("card");
      $card.style.animationDelay = `${100 * index}ms`
      $card.innerHTML = `
            <figure class="card-media img-holder">
              <img
                src="${image}"
                width="195"
                height="195"
                alt="${title}"
                class="img-cover"
                loading="lazy"
              />
            </figure>

            <div class="card-body">
              <h3 class="title-small">
                <a href="./detail.html?recipe=${recipeId}" class="card-link">
                  ${title ?? "Untitle"}
                </a>
              </h3>

              <div class="meta-wrapper">
                <div class="meta-item">
                  <span
                    class="material-symbols-outlined"
                    aria-hidden="true"
                    >schedule</span
                  >

                  <span class="label-medium">${getTime(cookingTime).time || "<1"} ${getTime(cookingTime).timeUnit}
                  </span>
                </div>

                <button
                  class="icon-btn has-state ${isSaved ? "saved" :"removed"}"
                  aria-label="Add to save recipes"
                  onclick="saveRecipe(this,'${recipeId}')"
                >
                  <span
                    class="material-symbols-outlined bookmark-add"
                    aria-hidden="true"
                    >bookmark_add</span
                  >
                  <span
                    class="material-symbols-outlined bookmark"
                    aria-hidden="true"
                    >bookmark</span
                  >
                </button>
              </div>
            </div>
      `;

      $gridList.appendChild($card);

  });
}


let requestedBefore = true;

fetchData(queries || defaultQueries,data =>{
   
  const { _links,_links:{next}  } = data;
  nextPageUrl = next?.href;

  $gridList.innerHTML ="";
  requestedBefore = false;

  if(data.hits.length){
    renderRecipe(data)
  }else{
    $loadMore.innerHTML = `<p class="body-medium info-text">No recipet found </p>`
  }

})

const CONTAINER_MAX_WIDTH = 1200;
const CONTAINER_MAX_CARD =6;

window.addEventListener("scroll", async e =>{
  
  if($loadMore.getBoundingClientRect().top < window.innerHeight && !requestedBefore && nextPageUrl){

    $loadMore.innerHTML = $skeletoncard.repeat(Math.round(($loadMore.
      clientWidth / (CONTAINER_MAX_WIDTH)) * CONTAINER_MAX_CARD ));
      requestedBefore = true;

      const response = await fetch(nextPageUrl);
      const data = await response.json();

      const { _links,_links:{next}  } = data;
      nextPageUrl = next?.href;

      renderRecipe(data);
      $loadMore.innerHTML = "";
      requestedBefore = false;

  }

  if(!nextPageUrl) $loadMore.innerHTML = `<p class="body-medium info-text">
  No More recipes </p>`;

  


})