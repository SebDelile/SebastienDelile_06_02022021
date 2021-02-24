//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------

import { criteriaList, criteriaListItems, criteriaButtons, mediaList, portfolio } from "../main_photographer.js";
import { mediaListSort } from "./mediaList_sort.js";

//--------------------------------------------------------------------------------------------
//------------------------------- Intermediate stages ----------------------------------------
//--------------------------------------------------------------------------------------------

//take each media of mediaList and put the corresponding element at the end of portfolio. thus the first that was put at the end finishes at first place after loop is completed
//note : the DOM have to be modified to let keyboard tab navigation selection in a consistent order. The use of "order" CSS property does not work
function portfolioSort() {
  for (let medium of mediaList) {
    const mediaElements = document.getElementsByClassName("media");
    for (let mediumElement of mediaElements) {
      if (mediumElement.getAttribute("id") === medium.id) {
        //first to append will last as first item in the list by the end
        //already moved elements are not browsed within the loop as it must find the entry before reaching these elements
        portfolio.append(mediumElement);
        break;
      }
    }
  }
}

//reorganize the criteriaList element according to the selected criteria
function criteriaListSort(target) {
  //target is the selected criterionButton element
  const liTarget = target.parentNode;
  const ul = liTarget.parentNode;
  // Put the selected criteria on top of the list
  ul.prepend(liTarget);
  //deletes icon and thecustomized aria-label for the old first item of the list
  for (let criterion of criteriaButtons) {
    criterion.innerHTML = criterion.textContent;
    criterion.setAttribute("aria-label", `trier par ${criterion.textContent}`);
  }
  //gives the icon and the customized aria-label to the new first item of the list
  criteriaButtons[0].innerHTML = `${target.textContent}<img class="sort__icon" src="public/img/icon/menu-closed.svg"  alt="icone menu déroulant">`;
  criteriaButtons[0].setAttribute("aria-label", `Actuellement trié par ${criteriaButtons[0].textContent}`);
}

let sortEventListener = function (e) {
  //trap the tab navigation until it is sorted
  if (e.which === 9) {
    //9 = TAB
    //MAJ+TAB is pressed, goes to previous element (default) or goes to last element of the list
    if (e.shiftKey) {
      if (e.target === criteriaButtons[0]) {
        e.preventDefault();
        criteriaButtons[criteriaButtons.length - 1].focus();
      }
    }
    //TAB is pressed : goes to next element (default) or goes to first element
    else {
      if (e.target === criteriaButtons[criteriaButtons.length - 1]) {
        e.preventDefault();
        criteriaButtons[0].focus();
      }
    }
  }
  //on escape => close the menu
  if (e.which === 27) {
    //27 = ESC
    criteriaSortOpenClose(e);
  }
};

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

//open or close the sort menu, called each time a click is made on one of the item
export function criteriaSortOpenClose(event) {
  //event is the event of the click or keypress listener
  let icon = criteriaList.querySelector(".sort__icon");
  if (criteriaList.getAttribute("aria-expanded") === "false") {
    criteriaList.setAttribute("aria-expanded", "true");
    icon.setAttribute("src", "public/img/icon/menu-opened.svg");
    for (let criterionListItems of criteriaListItems) {
      criterionListItems.style.display = "flex";
    }
    //for keybord navigation, focus goes to first unselected element (So the 2nd in the list)
    if (event.detail === 0) {
      criteriaButtons[1].focus();
    }
    for (let criterionButton of criteriaButtons) {
      criterionButton.addEventListener("keydown", sortEventListener);
    }
  } else {
    criteriaList.setAttribute("aria-expanded", "false");
    icon.setAttribute("src", "public/img/icon/menu-closed.svg");
    for (let criterionListItems of criteriaListItems) {
      criterionListItems.style.display = "";
    }
    //for keybord navigation, focus stays on the selected element
    if (event.detail === 0) {
      criteriaButtons[0].focus();
    }
    //remove the event listeners
    for (let criterionButton of criteriaButtons) {
      criterionButton.removeEventListener("keydown", sortEventListener);
    }
  }
}

//sort the mediaList table according to the selected criterion, then sort the portfolio element and last reorganize the criteriaList element
export function criteriaSortAction(target) {
  //target is the selected criterionButton element
  if (target === criteriaButtons[0]) {
    //this criterion is already selected, no sort to do
  } else {
    mediaListSort(target);
    portfolioSort();
    criteriaListSort(target);
  }
}
