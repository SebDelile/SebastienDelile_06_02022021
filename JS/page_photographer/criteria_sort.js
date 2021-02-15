//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------

import { sortCriterias, mediaList } from "../main_photographer.js";

//--------------------------------------------------------------------------------------------
//------------------------------- Intermediate stages ----------------------------------------
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

export function openCloseCriteriaSort() {
  const criteriaButton = document.querySelector(".sort__criterialist");
  const criterias = criteriaButton.getElementsByClassName("sort__criteria");
  if (criteriaButton.getAttribute("aria-expanded") === "false") {
    criteriaButton.setAttribute("aria-expanded", "true");
    for (let criteria of criterias) {
      criteria.style.display = "block";
    }
  } else {
    criteriaButton.setAttribute("aria-expanded", "false");
    for (let criteria of criterias) {
      criteria.style.display = "";
    }
  }
}

export function sortMedia(target) {
  switch (target.textContent) {
    case "Popularité":
      mediaList.sort((a, b) => b.likes - a.likes); // sort from the more liked to the less liked
      break;
    case "Date":
      mediaList.sort((a, b) => new Date(b.date) - new Date(a.date)); //sort form newest to oldest
      break;
    case "Titre":
      mediaList.sort(function (a, b) {
        // sort form 1st to last in alphabetical order
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1;
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
      break;
  }
}

export function sortAction(target) {
  if (target === sortCriterias[0]) {
    //this criteria is already selected, no sort to do
  } else {
    sortMedia(target); //sort the table mediaList
    for (let i in mediaList) {
      // sort the media object according to the table
      document.getElementById(mediaList[i].id).style.order = i;
    }
    target.parentNode.prepend(target); // Selected criteria is now first of the list
    console.log(mediaList);
  }
}
