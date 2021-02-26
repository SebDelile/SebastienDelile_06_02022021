//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------

import { tagFilter } from "./modules/tag_sort.js";
import { tagTabAcces, tagTabForbid } from "./modules/tag_keyboard_nav.js";
import { createCard } from "./modules/card_generator.js";

//--------------------------------------------------------------------------------------------
//----------------------------------- DOM elements -------------------------------------------
//--------------------------------------------------------------------------------------------

const url = "#" + window.location.search.slice(5); //remove "?tag=" and add the "#" to format the url keyword suitable with the tags
export const taglist = document.querySelectorAll(".header__nav__tag");

//DOM elements depending on the JSON  data need to be declare inside the fetch

//--------------------------------------------------------------------------------------------
//--------------------------------- On page loading ------------------------------------------
//--------------------------------------------------------------------------------------------

//main feature of the page, to load the data from the JSON
//all the features that need the data to be loaded must be included into ".then" brackets
fetch("./public/FishEyeDataFR.json")
  //imports  the json file
  .then(function (response) {
    if (!response.ok) {
      throw new Error("HTTP error " + response.status + " " + response.statusText);
    }
    return response.json();
  })
  .catch(function (error) {
    alert(error.message);
  })
  //Creation of the main elements ie. the photographer list
  .then(function (json) {
    for (let i in json.photographers) {
      createCard(json.photographers[i]);
    }
  })
  //Adding event listener on the tags and manage the keyboard navigation on the tags
  .then(function () {
    const tags = document.getElementsByClassName("tag");
    for (let tag of tags) {
      tag.addEventListener("click", function (event) {
        tagFilter(event.target);
      });
    }
    //to enter the taglist with keyboard navigation it should press enter on a button
    //it allows to pass the list with 1 tab if user doesnt want to go into it
    //the button is invisible (access with tab) and when it is focussed it displayes a focus on the taglist witch CSS "":hover + ul" selector
    const taglistButtons = document.getElementsByClassName("tag__button");
    for (let taglistButton of taglistButtons) {
      taglistButton.addEventListener("click", function (event) {
        tagTabAcces(event.target);
      });
    }
    const taglists = document.getElementsByClassName("taglist");
    for (let taglist of taglists) {
      taglist.addEventListener("focusout", function (event) {
        if (!this.contains(event.relatedTarget)) {
          tagTabForbid(this);
        }
      });
    }
  })
  //if coming from photograph page via tag link : activate the tag
  .then(function () {
    if (url) { // "?tag=***"
      for (let tag of taglist) {
        if (tag.textContent.toUpperCase() === url.toUpperCase()) {
          tag.click();
          break;
        }
      }
    }
  });

//--------------------------------------------------------------------------------------------
//--------------------------------- Event listeners ------------------------------------------
//--------------------------------------------------------------------------------------------
