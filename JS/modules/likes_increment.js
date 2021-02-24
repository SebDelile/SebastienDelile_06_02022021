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

//increments the number of likes both in the element and in the mediaList table
//there is an animation on the like feature (the icon gets bigger and then recover its size). It's fully managed by CSS
export function likesIncrement(target) {
  //target is the media__likes element (button with the number of likes, the icon and text for screen readers)
  //gets the Id of the medium (media > media__legend > media__likes)
  let mediumId = target.parentNode.parentNode.getAttribute("id");
  for (let medium of mediaList) {
    if (medium.id === mediumId) {
      medium.likes++;
      //changes the tag button for a new p one without interaction and gives it the focus
      //So it's not possible to like more than one time the same medium
      let element = document.createElement("p");
      element.classList.add("media__likes");
      element.setAttribute("tabindex", "0");
      element.innerHTML = `${medium.likes} <span aria-hidden="true"><img class="media__likes__liked" src="public/img/icon/like-liked.svg" alt="mentions j'aime, j'aime déjà"/></span><span class="sr-only">mentions j'aime, j'aime déjà</span>`;
      // insertion of element and removing of the old button
      // target.replaceWith(element) should have worked BUT the focus action does not let NVDA screen reader to immediately read the new element
      // so the trick is to let the old element displayed (display none does not worked either) and to move it away, so focusing new one is understood as focusing a new element
      // after a few time, the old element can be properly removed.
      target.parentNode.append(element);
      const newLikesButton = document.querySelector(`#${medium.id} .media__likes:last-child`);
      newLikesButton.focus();
      target.style.position = "absolute";
      target.style.left = "100000px";
      setInterval(function () {
        target.remove(), 100;
      });
      break;
    }
  }
}
