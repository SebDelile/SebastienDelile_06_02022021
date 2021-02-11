//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------
import { openModal, closeModal } from "./common/openCloseModal.js";
import { formValidity, formSubmission, submissionConfirmation } from "./page_photographer/contact_form.js";
import { profileGenerator } from "./page_photographer/profile_generator.js";
import {portfolioGenerator} from "./page_photographer/portfolio_generator.js";

//--------------------------------------------------------------------------------------------
//----------------------------------- DOM elements -------------------------------------------
//--------------------------------------------------------------------------------------------

let idNumber = window.location.search.slice(3); //remove "?id" from url
const buttonContact = document.querySelector(".profile__contact");
const medias = document.getElementsByClassName("media");
const formModal = document.querySelector(".form__modal");
const lightboxModal = document.querySelector(".lightbox__modal");
const form = document.querySelector("form");

//--------------------------------------------------------------------------------------------
//--------------------------------- On page loading ------------------------------------------
//--------------------------------------------------------------------------------------------

fetch("./public/FishEyeDataFR.json")
  //import of the json file
  .then(function (response) {
    if (!response.ok) {
      throw new Error("HTTP error " + response.status + " " + response.statusText);
    }
    return response.json();
  })
  .catch(function (error) {
    alert(error.message);
  })
  //Creation of the profile section
  .then(function (json) {
    profileGenerator(json.photographers, idNumber);
    return json;
  })
  //Creation of the profile section
  .then(function (json) {
    portfolioGenerator(json.media, idNumber);
  });

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
formModal.querySelector(".form__close").addEventListener("click", function () {
  closeModal(formModal);
});
lightboxModal.querySelector(".lightbox__close").addEventListener("click", function () {
  closeModal(lightboxModal);
});

//------------------------------ form Verification/Submission --------------------------------
for (let field of form) {
  field.addEventListener("input", function (event) {
    formValidity(event.target);
  });
}
form.addEventListener("submit", function (event) {
  event.preventDefault();
  formSubmission(event.target);
  submissionConfirmation(event.target);
});
