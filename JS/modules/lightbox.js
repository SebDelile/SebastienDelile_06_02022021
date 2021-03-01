//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------

import { mediaList, lightboxModal, lightbox, videoControls } from "../main_photographer.js";
import { modaleKeyboardNavigation } from "./modal_keyboard_nav.js";
import { videoControlsDisplay } from "./videocontrols_sleepmode.js";
import { videoControlsInitialization, videoControlsEnabling } from "./videocontrols_initialization.js";

//--------------------------------------------------------------------------------------------
//------------------------------ DOM static elements -----------------------------------------
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
//------------------------------- Intermediate stages ----------------------------------------
//--------------------------------------------------------------------------------------------

//factory design pattern to create the medium in the lightbox
function Factory() {
  this.createMedium = function (medium) {
    let element;
    if (medium.type === "image") {
      element = new IsImage(medium);
    }
    if (medium.type === "video") {
      element = new IsVideo(medium);
    }
    return element;
  };
}

function IsImage(medium) {
  let imageElement = document.createElement("img");
  imageElement.classList.add("lightbox__medium");
  imageElement.setAttribute("src", medium.fullpath);
  imageElement.setAttribute("aria-label", medium.description);
  return imageElement;
}
function IsVideo(medium) {
  let videoElement = document.createElement("video");
  videoElement.classList.add("lightbox__medium");
  videoElement.setAttribute("src", medium.fullpath);
  videoElement.setAttribute("controls", "");
  videoElement.textContent = `Votre navigateur ne permet pas de lire la vidéo. Mais vous pouvez toujours <a href="${medium.fullpath}">la télécharger</a> !`;
  videoElement.controlsDisplay = true; // used to manage the display of the video controls
  videoElement.setAttribute("aria-label", medium.description + ", lire video?");
  return videoElement;
}

//use to align the title with the medium. not possible with CSS only as it needs to wait the medium to load
function titleAlignement(displayedMedium, mediumTitle) {
  //these are medium element and title element
  const mediumWidth = parseFloat(window.getComputedStyle(displayedMedium).width);
  const lightboxWidth = parseFloat(window.getComputedStyle(lightbox).width);
  const margin = (lightboxWidth - mediumWidth) / 2;
  mediumTitle.style.width = `${mediumWidth}px`;
  mediumTitle.style.margin = `0 ${margin}px`;
}

//use to align the video controls with the medium. not possible with CSS only as it needs to wait the medium to load
function videoControlsAlignement(displayedMedium, mediumTitle) {
  //horizontal alignement
  const videoWidth = parseFloat(window.getComputedStyle(displayedMedium).width);
  const lightboxWidth = parseFloat(window.getComputedStyle(lightbox).width);
  const margin = (lightboxWidth - videoWidth) / 2;
  videoControls.style.width = `${videoWidth}px`;
  videoControls.style.margin = `0 ${margin}px`;
  //vertical alignement
  const videoHeight = parseFloat(window.getComputedStyle(displayedMedium).height);
  const lightboxHeight = parseFloat(window.getComputedStyle(lightbox).height);
  const titleHeight = parseFloat(window.getComputedStyle(mediumTitle).height);
  const bottom = (lightboxHeight - videoHeight - titleHeight) / 2 + titleHeight;
  videoControls.style.bottom = `${bottom}px`;
}

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

//Builds the medium and then inserts in replacement with old one and updates the title
export function lightboxDisplayMedium(mediumId) {
  //mediumId is the id of the selected medium
  for (let medium of mediaList) {
    if (medium.id === mediumId) {
      let factory = new Factory();
      let mediumElement = factory.createMedium(medium);
      let displayedMedium = lightbox.querySelector(".lightbox__medium");
      let mediumTitle = lightbox.querySelector(".lightbox__title");
      displayedMedium.replaceWith(mediumElement);
      displayedMedium = lightbox.querySelector(".lightbox__medium"); // re affect the variable because replaceWith do not update
      displayedMedium.setAttribute("tabindex", "0");
      displayedMedium.setAttribute("id", `${mediumId}-lightbox`);
      mediumTitle.textContent = medium.title;
      //alignement medium/title and display/hide of videocontrols
      //need to be within a load or loadeddata event to have the actual computed size of the medium
      switch (displayedMedium.tagName) {
        case "IMG":
          displayedMedium.addEventListener("load", function () {
            titleAlignement(displayedMedium, mediumTitle);
            videoControls.style.display = "none";
          });
          videoControlsEnabling("disable");
          break;
        case "VIDEO":
          displayedMedium.addEventListener("loadeddata", function () {
            titleAlignement(displayedMedium, mediumTitle);
            videoControlsAlignement(displayedMedium, mediumTitle);
            videoControls.style.display = "flex";
            videoControlsInitialization(displayedMedium);
            videoControlsDisplay();
          });
          videoControlsEnabling("enable");
          break;
      }
      //re-does the title alignement for each resize of the window
      window.addEventListener("resize", function () {
        titleAlignement(displayedMedium, mediumTitle);
        if (document.querySelector(".lightbox__videocontrols").style.display !== "none") {
          videoControlsAlignement(displayedMedium, mediumTitle);
        }
      });
      //enables the keyborad navigation within the modal (not possible to initiate before medium is loaded)
      modaleKeyboardNavigation(lightboxModal);
      //deletes parameters if they were applied
      videoControls.style.opacity = "";
      videoControls.style.zIndex = "";
      break;
    }
  }
}

//return the id of the new medium to display
export function lightboxChangeMedium(indexChange) {
  //is +1 to get the next medium or -1 for the previous one
  //searches what is the current displayed medium
  const currentMedium = document.querySelector(".lightbox__title").textContent;
  let i = 0;
  for (i in mediaList) {
    if (mediaList[i].title === currentMedium) {
      break;
    }
  }
  //determines the new medium to display and return the corresponding ID
  i = parseInt(i, 10);
  indexChange = parseInt(indexChange, 10);
  let newMedium;
  switch (i + indexChange) {
    //case where it ws first item and user press "previous", go to the last item
    case -1:
      newMedium = mediaList[mediaList.length - 1];
      break;
    //case where it was the last item and user press "next", go to  the first item
    case mediaList.length:
      newMedium = mediaList[0];
      break;
    //other "normal" cases
    default:
      newMedium = mediaList[i + indexChange];
  }
  return newMedium.id;
}
