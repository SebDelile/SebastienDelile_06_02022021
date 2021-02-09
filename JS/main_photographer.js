//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------
import { openModal, closeModal } from "./common/openCloseModal.js";

//--------------------------------------------------------------------------------------------
//----------------------------------- DOM elements -------------------------------------------
//--------------------------------------------------------------------------------------------

const buttonContact = document.querySelector(".profile__contact");
const medias = document.getElementsByClassName("media");
const formModal = document.querySelector(".form__modal");
const lightboxModal = document.querySelector(".lightbox__modal");

//--------------------------------------------------------------------------------------------
//--------------------------------- Event listeners ------------------------------------------
//--------------------------------------------------------------------------------------------

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
