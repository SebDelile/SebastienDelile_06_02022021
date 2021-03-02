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

//sort the mediaList table according to the selected criterion
export function mediaListSort(target) {
  //target is the selected criterion element
  switch (target.innerText) {
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
