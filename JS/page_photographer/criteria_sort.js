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
    if (target === sortCriterias[0]) {
    //nothing : no sort to do, the event on the parent will close the menu
  } else {
    let sortedArray = [];
    //need to sort mediaList according to criteria
    switch (target.textContent) {
      case "Popularité":
        while (mediaList.length !== 0) {
          let max = 0;
          let maxIndex = 0;
          for (let i in mediaList) {
            if (mediaList[i].likes > max) {
              max = mediaList[i].likes;
              maxIndex = i;
            }
            console.log(mediaList[i].likes +", max:" + max)
          }
          console.log("end loop");
          sortedArray.push(mediaList[maxIndex]);
          mediaList.splice(maxIndex, 1);
        }
        break;
      case "Date":
        while (mediaList.length !== 0) {
          let min = "2050-01-01";
          let minIndex = 0;
          for (let i in mediaList) {
            if (mediaList[i].date.localeCompare(min) < 0) {
              min = mediaList[i].date;
              minIndex = i;
            }
            console.log(mediaList[i].date +", min:" + min)
          }
          console.log("end loop")
          sortedArray.push(mediaList[minIndex]);
          mediaList.splice(minIndex, 1);
        }
        break;
      case "Titre":
        while (mediaList.length !== 0) {
          let min = "zzz";
          let minIndex = 0;
          for (let i in mediaList) {
            if (mediaList[i].title.localeCompare(min) < 0) {
              min = mediaList[i].title;
              minIndex = i;
            }
          }
          sortedArray.push(mediaList[minIndex]);
          mediaList.splice(minIndex, 1);
        }
        break;
    }
    for (let media of sortedArray) {
        mediaList.push(media)
    }
    console.log(mediaList);
  }
}
