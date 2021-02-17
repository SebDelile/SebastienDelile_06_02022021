//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------

import { tagSort } from "./common/tag_sort.js";
import { createCard } from "./page_index/card_generator.js";

//--------------------------------------------------------------------------------------------
//--------------------------------- On page loading ------------------------------------------
//--------------------------------------------------------------------------------------------

fetch("./public/FishEyeDataFR.json")
  //import of the json file
  .then((response) => {
    if (!response.ok) {
      throw new Error("HTTP error " + response.status + " " + response.statusText);
    }
    return response.json();
  })
  .catch(function (error) {
    alert(error.message);
  })
  //Creation of the main elements
  .then((json) => {
    for (let i in json.photographers) {
      createCard(json.photographers[i]);
    }
  })
  //Adding event listener on the tags
  .then(function () {
    const tags = document.getElementsByClassName("tag");
    for (let tag of tags) {
      tag.addEventListener("click", function (event) {
        event.preventDefault();
        tagSort(event.target);
      });
    }
  })
  //if coming from photograph page via tag link : activate the tag
  .then(function(){
    const url = "#" + window.location.search.slice(5); //remove "?tag=" and add the "#"
    const taglist = document.querySelectorAll(".header__nav__tag");
    for (let tag of taglist) {
        if (tag.textContent.toUpperCase() === url.toUpperCase()) {
            tag.click();
            break;
        }
    }
  });

//--------------------------------------------------------------------------------------------
//--------------------------------- Event listeners ------------------------------------------
//--------------------------------------------------------------------------------------------
