//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------

import { taglist } from "../main_index.js";

//--------------------------------------------------------------------------------------------
//------------------------------- Intermediate stages ----------------------------------------
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

//sort the photographer according to the selected tag
export function tagSort(activatedTag) {
  //activatedTag is the tag element selected by the user
  const tags = document.getElementsByClassName("tag");
  const cards = document.getElementsByClassName("card");
  //step 1 : check if it needs to sort or unsort
  const sortMode = activatedTag.getAttribute("aria-checked"); // false : need to sort, true : to unsort
  //step 2 : turn true/false the aria-checked attribute on the corresponding tags
  for (let tag of tags) {
    if (tag.textContent.toUpperCase() === activatedTag.textContent.toUpperCase()) {
      if (sortMode === "true") {
        tag.setAttribute("aria-checked", "false");
      } else {
        tag.setAttribute("aria-checked", "true");
      }
    }
  }
  //step 3 : count how many tags are ON
  let totalTagON = 0;
  for (let tag of taglist) {
    if (tag.getAttribute("aria-checked") === "true") {
      totalTagON++;
    }
  }
  //there is at least one tag ON : display only the cards having as many tag ON as totaltagON
  if (totalTagON !== 0) {
    for (let card of cards) {
      let countTagON = 0;
      let cardTaglist = card.getElementsByClassName("tag");
      for (let tag of cardTaglist) {
        if (tag.getAttribute("aria-checked") === "true") {
          countTagON++;
        }
      }
      if (countTagON === totalTagON) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    }
  }
  //no tagON : display all
  else {
    for (let card of cards) {
      card.style.display = "block";
    }
  }
}
