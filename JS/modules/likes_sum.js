//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------

import { mediaList } from "../main_photographer.js";

//--------------------------------------------------------------------------------------------
//------------------------------- Intermediate stages ----------------------------------------
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

//calculate the total of the likes of each media (from the table, not the elements)
//is called at loading and at each like increment
export function likesSum() {
  let sum = 0;
  for (let media of mediaList) {
    sum += media.likes;
  }
  document.querySelector(
    ".profile__likes"
  ).innerHTML = `${sum} <span aria-hidden="true"><img src="public/img/icon/like-alt.svg" alt="mentions j'aime"/></span><span class="sr-only">mentions j'aime...</span>`;
}
