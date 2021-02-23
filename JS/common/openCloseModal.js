//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
//------------------------------- Intermediate stages ----------------------------------------
//--------------------------------------------------------------------------------------------

let keyLog = function (e) {
    if (e.which !== 9) {
      return;
    }
    //MAJ+TAB is pressed, go to previous element (default) or go to last element
    if (e.shiftKey) {
      if (e.target === focusableElementsArray[0]) {
        e.preventDefault();
        focusableElementsArray[focusableElementsArray.length - 1].focus();
      }
    }
    //TAB is pressed : go to next element (default) or go to first element
    else {
      if (e.target === focusableElementsArray[focusableElementsArray.length - 1]) {
        e.preventDefault();
        focusableElementsArray[0].focus();
      }
    }
  }

//--------------------------------------------------------------------------------------------
//------------------------------------ variables ---------------------------------------------
//--------------------------------------------------------------------------------------------
const focusableElementsTemplate = ["[href]", "button:not([disabled])", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])", '[tabindex]:not([tabindex="-1"])'];
let focusableElementsArray =[];
//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

export function modaleKeyboardNavigation(modal) {
  //collect all focusable elements and gives focus to first one
  const focusableElements = modal.querySelectorAll(focusableElementsTemplate);
  focusableElementsArray =[];
  for (let focusableElement of focusableElements) {
    focusableElementsArray.push(focusableElement)
  }
  focusableElementsArray[0].focus();

  // on TAB and MAJ+TAB : trapping focus inside the dialog
  for (let focusableElement of focusableElementsArray) {
    focusableElement.addEventListener("keydown", keyLog);
  };
}

// open the modal with an animation
export function openModal(element) {
  element.setAttribute("aria-hidden", false);
  document.querySelector(".main").setAttribute("aria-hidden", true);
  element.classList.add("modal__appear");
  element.querySelector(":last-child").classList.add("modal__child__appear");
  element.style.display = "flex";
  //Removing the classes for future use : 200ms delay + 600ms animation duration
  setTimeout(function () {
    element.querySelector(":last-child").classList.remove("modal__child__appear");
    element.classList.remove("modal__appear");
  }, 800);
  //for the form the keyboard nav is started from opening, for the lightbox it needs to wait for the media loading, so it's started within the function lightboxMediaDisplay
  if (element.id === "form__modal") {
    modaleKeyboardNavigation(element);
  }
}

//close the modal with an animation
export function closeModal(element) {
  document.querySelector(".main").setAttribute("aria-hidden", false);
  element.setAttribute("aria-hidden", true);
  element.querySelector(":last-child").classList.add("modal__child__disappear");
  element.classList.add("modal__disappear");
  //gives the focus back to the button which launch the modale
  switch (element.id) {
    case "lightbox__modal":
      let id = element.querySelector(".lightbox__media").id;
      id = id.slice(0, id.indexOf("-lightbox")); // remove the extrapart
      document.querySelector(`#${id} .media__button`).focus();
      break;
    case "form__modal":
      document.querySelector(".profile__contact").focus();
      break;
  }
  //Removing the classes for future use 200ms delay + 600ms animation duration
  setTimeout(function () {
    element.style.display = "none";
    element.querySelector(":last-child").classList.remove("modal__child__disappear");
    element.classList.remove("modal__disappear");
  }, 800);
}
