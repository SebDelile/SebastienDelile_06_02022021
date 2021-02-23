//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------
import {modaleKeyboardNavigation} from "../common/openCloseModal.js"

//--------------------------------------------------------------------------------------------
//------------------------------- Intermediate stages ----------------------------------------
//--------------------------------------------------------------------------------------------



//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

export function formValidity (field){
    if (field.validity.valid) {
        field.style.border = "0.25rem solid #DB8876"; /*color secondary*/
        field.style.borderRadius = "calc(0.3215rem + 0.25rem)" /*need to take into account the border thickness*/
        field.parentNode.querySelector(".form__validity").setAttribute("src", "public/img/icon/checked.svg");
    }
    else {
        field.style.border = "0.25rem solid #901C1C"; /*color primary*/
        field.style.borderRadius = "0.3215rem"
        field.parentNode.querySelector(".form__validity").setAttribute("src", "public/img/icon/warning.svg");
    }
}


export function formSubmission(form){
    for (let field of form) {
        if (field.type !== "submit") {
            console.log(`${field.name} : ${field.value}`);
        }
    }
}

export function submissionConfirmation(form) {
    const confirmationWrapper = form.querySelector(".form__submitted");
    const confirmationMessage = form.querySelector(".form__submitted p");
    const formElementsToDisable = form.querySelectorAll(".form__input, .form__label, .form__submit, .form__head" );
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
        //disable them
        //give focus to close and preventdefault on tab
    confirmationWrapper.style.display = "flex";
    confirmationMessage.style.animation = "fade-shift 600ms both";
    confirmationMessage.setAttribute("tabindex", "0");
    setTimeout(function(){(modaleKeyboardNavigation(document.getElementById("form__modal")))},800); //wait for the animation to end and update keyboard navigation
}