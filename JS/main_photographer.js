//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------
import {openModal, closeModal} from "./common/openCloseModal.js";
import {formValidity, formSubmission, submissionConfirmation} from "./page_photographer/contact_form.js"

//--------------------------------------------------------------------------------------------
//----------------------------------- DOM elements -------------------------------------------
//--------------------------------------------------------------------------------------------

const buttonContact = document.querySelector(".profile__contact");
const medias = document.getElementsByClassName("media");
const formModal = document.querySelector(".form__modal");
const lightboxModal = document.querySelector(".lightbox__modal");
const form = document.querySelector("form");

//--------------------------------------------------------------------------------------------
//--------------------------------- Event listeners ------------------------------------------
//--------------------------------------------------------------------------------------------

//------------------------------ Open/Close the modale ---------------------------------------
buttonContact.addEventListener("click", function () {
  openModal(formModal);
});
for (let media of medias) {
  media.addEventListener("click", function () {
    openModal(lightboxModal);
  });
}
formModal.querySelector(".form__close").addEventListener("click", function(){
    closeModal(formModal);
});
lightboxModal.querySelector(".lightbox__close").addEventListener("click", function(){
    closeModal(lightboxModal);
});

//------------------------------ form Verification/Submission --------------------------------
for (let field of form) {
    field.addEventListener("input", function(event) {
        formValidity(event.target);
    });
};
form.addEventListener("submit", function(event) {
    event.preventDefault();
    formSubmission(event.target);
    submissionConfirmation(event.target);
});