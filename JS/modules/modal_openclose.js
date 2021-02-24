//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------

import { modaleKeyboardNavigation } from "./modal_keyboard_nav.js";


//--------------------------------------------------------------------------------------------
//------------------------------- Intermediate stages ----------------------------------------
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------


// open the modal with an animation
export function modalOpen(modal) {
  //modal is the modal object to open (lightbox or form)
  modal.setAttribute("aria-hidden", false);
  document.querySelector(".main").setAttribute("aria-hidden", true);
  modal.classList.add("modal__appear");
  modal.firstElementChild.classList.add("modal__child__appear");
  modal.style.display = "flex";
  //Removing the classes for future use : 200ms delay + 600ms animation duration
  setTimeout(function () {
    modal.firstElementChild.classList.remove("modal__child__appear");
    modal.classList.remove("modal__appear");
  }, 800);
  //for the form the keyboard nav is started from opening, for the lightbox it needs to wait for the media loading, so it's started within the function lightboxMediaDisplay
  if (modal.id === "form__modal") {
    modaleKeyboardNavigation(modal);
  }
}

//close the modal with an animation
export function modalClose(modal) {
  document.querySelector(".main").setAttribute("aria-hidden", false);
  modal.setAttribute("aria-hidden", true);
  modal.firstElementChild.classList.add("modal__child__disappear");
  modal.classList.add("modal__disappear");
  //gives the focus back to the button which launch the modale
  switch (modal.id) {
    case "lightbox__modal": {
      let id = modal.querySelector(".lightbox__medium").id;
      id = id.slice(0, id.indexOf("-lightbox")); // remove the extrapart
      document.querySelector(`#${id} .media__button`).focus();
      break;
    }
    case "form__modal":
      document.querySelector(".profile__contact").focus();
      break;
  }
  //Removing the classes for future use 200ms delay + 600ms animation duration
  setTimeout(function () {
    modal.style.display = "none";
    modal.firstElementChild.classList.remove("modal__child__disappear");
    modal.classList.remove("modal__disappear");
  }, 800);
}
