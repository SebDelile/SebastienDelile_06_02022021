//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------

import { mediaList } from "../main_photographer.js";

//--------------------------------------------------------------------------------------------
//------------------------------- Intermediate stages ----------------------------------------
//--------------------------------------------------------------------------------------------

function Factory() {
  this.createMedia = function (media) {
    let element;
    if (media.type === "image") {
      element = new IsImage(media);
    }
    if (media.type === "video") {
      element = new IsVideo(media);
    }
    return element;
  };
}

function IsImage (media) {
  let imageElement = document.createElement("img");
  imageElement.classList.add("lightbox__media");
  imageElement.setAttribute("src", media.fullpath);
  imageElement.setAttribute("alt", "");
  return imageElement;
};
function IsVideo (media) {
  let videoElement = document.createElement("video");
  videoElement.classList.add("lightbox__media");
  videoElement.setAttribute("src", media.fullpath);
  videoElement.setAttribute("controls", "");
  videoElement.textContent = `Votre navigateur ne permet pas de lire la vidéo. Mais vous pouvez toujours <a href="${media.fullpath}">la télécharger</a> !`;
  return videoElement;
};

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

//Builds the media then inserts in replacement with old one and updates the title
export function lightboxMediaDisplay(mediaId) {
  let lightbox = document.querySelector(".lightbox");
  for (let media of mediaList) {
    let factory = new Factory();
    if (media.id === mediaId) {
      let mediaElement = factory.createMedia(media);
      lightbox.querySelector(".lightbox__media").replaceWith(mediaElement);
      lightbox.querySelector(".lightbox__title").textContent = media.title;
      break;
    }
  }
}

export function lightboxChangeMedia(indexChange) {
  //searches what is the current displayed media
  let currentMedia = document.querySelector(".lightbox__title").textContent;
  let i = 0;
  for (i in mediaList) {
    if (mediaList[i].title === currentMedia) {
      break;
    }
  }
  //determines the new media to display and return the corresponding ID
  i = parseInt(i,10);
  indexChange = parseInt(indexChange, 10);
  let newMedia;
  switch (i + indexChange) {
    case -1:
      newMedia = mediaList[mediaList.length - 1];
      break;
    case mediaList.length:
      newMedia = mediaList[0];
      break;
    default:
      newMedia = mediaList[i + indexChange];
  }
  return newMedia.id;
}
