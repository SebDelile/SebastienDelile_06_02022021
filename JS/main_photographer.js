//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------
import { modalOpen, modalClose } from "./modules/modal_openclose.js";
import { formValidity, formSubmission} from "./modules/form.js";
import { profileGenerator } from "./modules/profile_generator.js";
import { portfolioGenerator } from "./modules/portfolio_generator.js";
import { mediaListGenerator } from "./modules/mediaList_generator.js";
import { mediaListSort } from "./modules/mediaList_sort.js";
import { lightboxDisplayMedium, lightboxChangeMedium } from "./modules/lightbox.js";
import { criteriaSortOpenClose, criteriaSortAction } from "./modules/criteria_sort.js";
import { tagTabAcces, tagTabForbid } from "./modules/tag_keyboard_nav.js";
import { likesSum } from "./modules/likes_sum.js";
import { likesIncrement } from "./modules/likes_increment.js";

//--------------------------------------------------------------------------------------------
//----------------------------------- DOM elements -------------------------------------------
//--------------------------------------------------------------------------------------------

//the id of the photographer picked from the url
export const idNumber = window.location.search.slice(4); //remove "?id=" from url

//section profile
export const profile = document.querySelector(".profile");
const taglistButton = document.querySelector(".tag__button");
const taglist = document.querySelector(".taglist");
const contactButton = document.querySelector(".profile__contact");

//section portfolio aside sort
export const criteriaList = document.querySelector(".sort__criterialist"); //ul element
export const criteriaListItems = document.getElementsByClassName("sort__li"); //li
export const criteriaButtons = document.getElementsByClassName("sort__criteria"); //button elements

//section portfolio
export const portfolio = document.querySelector(".portfolio__grid");

//lightbox modal
export const lightboxModal = document.getElementById("lightbox__modal");
export const lightbox = document.querySelector(".lightbox");
export const lightboxModalClose = lightboxModal.querySelector(".lightbox__close");
export const lightboxBackward = lightboxModal.querySelector(".lightbox__command__backward");
export const lightboxForward = lightboxModal.querySelector(".lightbox__command__forward");

//lightbox videocontrols
export const videoControls = document.querySelector(".lightbox__videocontrols");
export const videoButtons = document.getElementsByClassName("lightbox__videocontrols__button")

//form modal
const formModal = document.getElementById("form__modal");
export const form = document.querySelector("form");
const formModalClose = formModal.querySelector(".form__close");

//the media corresponding to the photographer, with some data reorganization
//will be filled during fetch json import method
//usefull for the sort and the display in the lightbox
export var mediaList = [];

//DOM elements depending on the JSON  data need to be declare inside the fetch

//--------------------------------------------------------------------------------------------
//--------------------------------- On page loading ------------------------------------------
//--------------------------------------------------------------------------------------------

//fisrt feature of the page, to load the data from the JSON (both profile and portfolio)
//all the features that need the data to be loaded must be included into ".then" brackets
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
  //Creation of the mediaList table of the photographer
  //the mediaList table is sorted according to default criterion (popularité) to be consistent to the displayed sorting criterion
  .then(function (json) {
    mediaListGenerator(json.media);
    mediaListSort(criteriaButtons[0]);
  })
  //the media elements are created from the mediaList table, and the sum of the likes is displayed
  .then(function () {
    portfolioGenerator();
    likesSum();
  })
  //adds an event listener on each medium to open the lightbox modal and to manage the like feature
  .then(function () {
    const media = document.getElementsByClassName("media__button");
    for (let medium of media) {
      medium.addEventListener("click", function () {
        modalOpen(lightboxModal);
        lightboxDisplayMedium(this.parentNode.getAttribute("id"));
      });
    }
    const likes = document.getElementsByClassName("media__likes");
    for (let like of likes) {
      like.addEventListener("click", function () {
        likesIncrement(this);
        likesSum();
      });
    }
  });

//--------------------------------------------------------------------------------------------
//--------------------------------- Event listeners ------------------------------------------
//--------------------------------------------------------------------------------------------

//---------------------------- tag access/forbide tab nav ------------------------------------

//to enter the taglist with keyboard navigation it should press enter on a button
//it allows to pass the list with 1 tab if user doesnt want to go into it
//the button is invisible (access with tab) and when it is focussed, it displayes a focus on the taglist witch CSS "":hover + ul" selector
taglistButton.addEventListener("click", function (event) {
  tagTabAcces(event.target);
});
taglist.addEventListener("focusout", function (event) {
  if (!this.contains(event.relatedTarget)) {
    tagTabForbid(this);
  }
});
//-------------------------------- sort the media --------------------------------------------

//manage the selection of the sorting criteria (popularité, date, titre)
criteriaList.addEventListener("click", function (event) {
  criteriaSortOpenClose(event);
});
for (let criterionButton of criteriaButtons) {
  criterionButton.addEventListener("click", function (event) {
    criteriaSortAction(event.target);
  });
}

//------------------------------ Open the modals ---------------------------------------
contactButton.addEventListener("click", function () {
  modalOpen(formModal);
});
//for the lightbox modal opening, the eventlistener is set within the fetch method (needs to wait for the media to be generated)


//------------------------------ Close the modals ---------------------------------------
//modals are closed by click on close button, click on the background of the modal or by pressing ESC
formModalClose.addEventListener("click", function () {
  modalClose(formModal);
});
formModal.addEventListener("click", function (event) {
  if (event.target === formModal) {
    modalClose(formModal);
  }
});
formModal.addEventListener("keydown", function (event) {
  if (event.which == 27) { //27 = ESC
    modalClose(formModal);
  }
});

lightboxModalClose.addEventListener("click", function () {
  modalClose(lightboxModal);
});
lightboxModal.addEventListener("click", function (event) {
  if (event.target === lightboxModal) {
    modalClose(lightboxModal);
  }
});
lightboxModal.addEventListener("keydown", function (event) {
  if (event.which == 27) { //27 = ESC
    modalClose(lightboxModal);
  }
});

//------------------------------ Lightbox Navigation ---------------------------------------
lightboxForward.addEventListener("click", function () {
  lightboxDisplayMedium(lightboxChangeMedium(1));
});
lightboxBackward.addEventListener("click", function () {
  lightboxDisplayMedium(lightboxChangeMedium(-1));
});
lightboxModal.addEventListener("keydown", function (event) {
  if (event.which === 39) { // 39 = right arrow
    lightboxDisplayMedium(lightboxChangeMedium(1));
  }
  if (event.which === 37) { // 37 = left arrow
    lightboxDisplayMedium(lightboxChangeMedium(-1));
  }
});

//--------------------------- form Verification/Submission --------------------------------

for (let field of form) {
  field.addEventListener("input", function (event) {
    formValidity(event.target);
  });
}
form.addEventListener("submit", function (event) {
  event.preventDefault();
  formSubmission();
});
