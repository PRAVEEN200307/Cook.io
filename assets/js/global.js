/**
 * @license MIT
 * @copyright 2023 codewithsadee
 * @author codewithsadee <mohammadsadee24@gmail.com>
 */

"use strict";


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