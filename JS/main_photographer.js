//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------
import { openModal, closeModal } from "./common/openCloseModal.js";
import { formValidity, formSubmission, submissionConfirmation } from "./page_photographer/contact_form.js";
import { profileGenerator, sumLikes } from "./page_photographer/profile_generator.js";
import { portfolioGenerator, mediaListGenerator, incrementLikes } from "./page_photographer/portfolio_generator.js";
import { lightboxMediaDisplay, lightboxChangeMedia } from "./page_photographer/lightbox.js";
import {openCloseCriteriaSort, sortMedia} from "./page_photographer/criteria_sort.js"

//--------------------------------------------------------------------------------------------
//----------------------------------- DOM elements -------------------------------------------
//--------------------------------------------------------------------------------------------

const sortButton = document.querySelector(".sort__criterialist");
const contactButton = document.querySelector(".profile__contact");
const formModal = document.querySelector(".form__modal");
const formModalClose = formModal.querySelector(".form__close");
const form = document.querySelector("form");
const lightboxModal = document.querySelector(".lightbox__modal");
const lightboxModalClose = lightboxModal.querySelector(".lightbox__close");
const lightboxBackward = lightboxModal.querySelector(".lightbox__command__backward");
const lightboxForeward = lightboxModal.querySelector(".lightbox__command__foreward");

//--------------------------------------------------------------------------------------------
//--------------------------------- On page loading ------------------------------------------
//--------------------------------------------------------------------------------------------

//the id of the photographer picked from the url
export const idNumber = window.location.search.slice(3); //remove "?id" from url

export const sortCriterias = document.getElementsByClassName("sort__criteria");

//the media corresponding to the photographer, with some data reorganization
//will be filled during fetch json import method
//usefull for the sort and the display in the lightbox
export let mediaList = [];

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
    profileGenerator(json.photographers);
    return json;
  })
  //Creation of the mediaList of the photographer
  .then(function (json) {
    mediaListGenerator(json.media);
    sortMedia(sortCriterias[0]);
    console.log(sortCriterias[0].textcontent);
  })
  .then(function () {
    portfolioGenerator();
    sumLikes();
  })
  .then(function () {
    const medias = document.getElementsByClassName("media__img");
    for (let media of medias) {
      media.addEventListener("click", function (event) {
        openModal(lightboxModal);
        lightboxMediaDisplay(event.target.parentNode.getAttribute("id"));
      });
    }
    const likes = document.getElementsByClassName("media__likes");
    for (let like of likes) {
      like.querySelector("img").addEventListener("click", function (event) {
        incrementLikes(event.target);
        sumLikes();
      });
    };
  });

//--------------------------------------------------------------------------------------------
//--------------------------------- Event listeners ------------------------------------------
//--------------------------------------------------------------------------------------------

//-------------------------------- sort the media --------------------------------------------

sortButton.addEventListener("click", function () {
  openCloseCriteriaSort();
})
for (let criteria of sortCriterias) {
  criteria.addEventListener("click", function(event){
    sortMedia(event.target);
  })
}


//------------------------------ Open/Close the modale ---------------------------------------
contactButton.addEventListener("click", function () {
  openModal(formModal);
});
//for the lightbox modal, the eventlistener is set within the fetch method (needs to wait for the media to be generated)
formModalClose.addEventListener("click", function () {
  closeModal(formModal);
});
lightboxModalClose.addEventListener("click", function () {
  closeModal(lightboxModal);
});

lightboxForeward.addEventListener("click", function () {
  lightboxMediaDisplay(lightboxChangeMedia(1));
});
lightboxBackward.addEventListener("click", function () {
  lightboxMediaDisplay(lightboxChangeMedia(-1));
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
