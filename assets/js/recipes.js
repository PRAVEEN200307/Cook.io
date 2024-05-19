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

   console.log(queries);

});


// 



