

"use strict";

/**
 * @param {Array} queries Query array
 * @param {function} successCallback Success callback function
 */


window.ACCESS_POINT ="https://api.edamam.com/api/recipes/v2";
const  APP_ID = "93d44907";
const  API_KEY = "a90d7e01385ce1aed823f31e6d9052a6";
const  TYPE = "public";

export const fetchData =  async function(queries,successCallback){
   const  query = queries?.join("&")
   .replace(/,/g,"=")
   .replace(/ /g,"%20")
   .replace(/\+/g,"%2B");

   const url = `${ACCESS_POINT}?app_id=${APP_ID}&app_key=${API_KEY}&type=${TYPE}${query ? `&${query}`:""}`;

   const response = await fetch(url);

   if(response.ok){
        const data = await response.json();
        successCallback(data);
   }
}




