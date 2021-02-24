//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------
import { modaleKeyboardNavigation } from "./modal_keyboard_nav.js";
import { form } from "../main_photographer.js";

//--------------------------------------------------------------------------------------------
//------------------------------- Intermediate stages ----------------------------------------
//--------------------------------------------------------------------------------------------

//display the confirmation message with an animation
function formSubmissionConfirmation() {
  const confirmationWrapper = form.querySelector(".form__submitted");
  const confirmationMessage = form.querySelector(".form__submitted p");
  confirmationWrapper.style.display = "flex";
  confirmationMessage.style.animation = "fade-shift 600ms both";
  confirmationMessage.setAttribute("tabindex", "0");
}

//disable the keyboard navigation on the elements
function formSubmissionKeyboardNavigationUpdate() {
  const formElementsToDisable = form.querySelectorAll(".form__input, .form__label, .form__submit, .form__head");
  for (let element of formElementsToDisable) {
    switch (element.tagName) {
      case "INPUT":
      case "TEXTAREA":
      case "BUTTON":
        element.setAttribute("disabled", "");
        break;
      case "DIV":
      case "LABEL":
        element.removeAttribute("tabindex");
        break;
    }
  }
  //wait for the confirmation submission message animation to end and update keyboard navigation
  setTimeout(function () {
    modaleKeyboardNavigation(document.getElementById("form__modal"));
  }, 800);
}

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

//styles the input according to their validity state
export function formValidity(field) {
  if (field.validity.valid) {
    field.style.border = "0.25rem solid #DB8876"; /*color secondary*/
    field.style.borderRadius = "calc(0.3215rem + 0.25rem)"; /*need to take into account the border thickness*/
    field.parentNode.querySelector(".form__validity").setAttribute("src", "public/img/icon/checked.svg");
  } else {
    field.style.border = "0.25rem solid #901C1C"; /*color primary*/
    field.style.borderRadius = "0.3215rem";
    field.parentNode.querySelector(".form__validity").setAttribute("src", "public/img/icon/warning.svg");
  }
}

//put a log in the console for each field, then display a message and update keyboard navigation in the modal
export function formSubmission() {
  for (let field of form) {
    if (field.tagName === "INPUT" || field.tagName === "TEXTAREA") {
      console.log(`${field.name} : ${field.value}`);
    }
  }
  formSubmissionConfirmation();
  formSubmissionKeyboardNavigationUpdate();
}
