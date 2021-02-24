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

//creates and fills a "medium" element for each entry of mediaList
export function portfolioGenerator() {
  let portfolio = document.querySelector(".portfolio__grid");
  for (let medium of mediaList) {
    let element = document.createElement("div");
    element.classList.add("media");
    element.setAttribute("id", medium.id);
    element.innerHTML = `<button class="media__button" type="button" aria-labelledby="${medium.id}-label">
        <img class="media__img" src="${medium.minipath}" alt="" />
        </button>
        <div class="media__legend">
          <h3 class="media__title" tabindex="0" lang="en">${medium.title}</h3>
          <p class="media__price" tabindex="0">${medium.price} €</p>
          <button class="media__likes" aria-label="${medium.likes} mentions j'aime, ajouter mention j'aime">${medium.likes}<img src="public/img/icon/like.svg" alt="mentions j'aime"/></button>
          <p class="media__date hidden">${medium.date}</p>
          <p class="media__description hidden" id="${medium.id}-label">${medium.description}, ouvrir média</p>
        </div>`;
    portfolio.append(element);
  }
}
