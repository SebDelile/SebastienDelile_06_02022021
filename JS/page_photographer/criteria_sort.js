//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------

import { sortCriterias, mediaList } from "../main_photographer.js";

//--------------------------------------------------------------------------------------------
//------------------------------- Intermediate stages ----------------------------------------
//--------------------------------------------------------------------------------------------

//take each media of mediaList and put the corresponding element at the end of portfolio. thus the first that was put at the end finishes at first place after loop is completed
function sortMedia() {
  const portfolio = document.querySelector(".portfolio__grid");
  const mediaElements = document.getElementsByClassName("media");
  for (let media of mediaList) {
    for (let mediaElement of mediaElements) {
      if (mediaElement.getAttribute("id") === media.id) {
        portfolio.append(mediaElement);
        break;
      }
    }
  }
}


function reorganizeCriteriaList(target) {
  const liTarget = target.parentNode;
  const ul = liTarget.parentNode;
  ul.prepend(liTarget); // Selected criteria is now first of the list
  for (let criteria of sortCriterias) {
    criteria.innerHTML = criteria.textContent; //delete icon for the one who had it
  }
  target.innerHTML = `${target.textContent}<img class="sort__icon" src="public/img/icon/menu-closed.svg">`; //give the icon to the new first of the list
}

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

export function openCloseCriteriaSort() {
  const criteriaButton = document.querySelector(".sort__criterialist");
  const criterias = criteriaButton.getElementsByClassName("sort__li");
  let icon = criteriaButton.querySelector(".sort__icon");
  if (criteriaButton.getAttribute("aria-expanded") === "false") {
    criteriaButton.setAttribute("aria-expanded", "true");
    icon.setAttribute("src", "public/img/icon/menu-opened.svg");
    for (let criteria of criterias) {
      criteria.style.display = "flex";
    }
  } else {
    criteriaButton.setAttribute("aria-expanded", "false");
    icon.setAttribute("src", "public/img/icon/menu-closed.svg");
    for (let criteria of criterias) {
      criteria.style.display = "";
    }
  }
}

export function sortMediaList(target) {
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
    sortMediaList(target); //sort the table mediaList
    sortMedia(); // sort the media according to mediaList
    reorganizeCriteriaList(target);
  }
}
