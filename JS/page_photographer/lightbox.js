//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------

import { mediaList } from "../main_photographer.js";
import { modaleKeyboardNavigation } from "../common/openCloseModal.js";

//--------------------------------------------------------------------------------------------
//------------------------------ DOM static elements -----------------------------------------
//--------------------------------------------------------------------------------------------

const lightbox = document.querySelector(".lightbox");
const videoControls = document.querySelector(".lightbox__videocontrols");
const videoButtons = document.getElementsByClassName("lightbox__videocontrols__button");
const playPauseButton = document.querySelector(".lightbox__videocontrols__playpause");
const stopButton = document.querySelector(".lightbox__videocontrols__stop");
const reverseButton = document.querySelector(".lightbox__videocontrols__rwd");
const forwardButton = document.querySelector(".lightbox__videocontrols__fwd");
const timeLabel = document.querySelector(".lightbox__videocontrols__time");

//--------------------------------------------------------------------------------------------
//---------------------------------- variables -----------------------------------------------
//--------------------------------------------------------------------------------------------

//set of variable used for the display status of the video controls
let timer;
let mouseX = 0;
let mouseY = 0;
let instantMouseX = 0;
let instantMouseY = 0;
let mouseCount = 0;
let activeButton = null;

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

function IsImage(media) {
  let imageElement = document.createElement("img");
  imageElement.classList.add("lightbox__media");
  imageElement.setAttribute("src", media.fullpath);
  imageElement.setAttribute("alt", media.description);
  return imageElement;
}
function IsVideo(media) {
  let videoElement = document.createElement("video");
  videoElement.classList.add("lightbox__media");
  videoElement.setAttribute("src", media.fullpath);
  videoElement.setAttribute("controls", "");
  videoElement.textContent = `Votre navigateur ne permet pas de lire la vidéo. Mais vous pouvez toujours <a href="${media.fullpath}">la télécharger</a> !`;
  videoElement.controlsDisplay = true; // used to manage the display of the video controls
  return videoElement;
}

function titleAlignement() {
  const mediaDisplayed = lightbox.querySelector(".lightbox__media");
  const mediaTitle = lightbox.querySelector(".lightbox__title");
  const mediaWidth = parseFloat(window.getComputedStyle(mediaDisplayed).width);
  const lightboxWidth = parseFloat(window.getComputedStyle(lightbox).width);
  const margin = (lightboxWidth - mediaWidth) / 2;
  mediaTitle.style.width = `${mediaWidth}px`;
  mediaTitle.style.margin = `0 ${margin}px`;
}

function videoControlsAlignement() {
  const videoElement = document.querySelector(".lightbox__media");
  const title = document.querySelector(".lightbox__title");
  //horizontal alignement
  const videoWidth = parseFloat(window.getComputedStyle(videoElement).width);
  const lightboxWidth = parseFloat(window.getComputedStyle(lightbox).width);
  const margin = (lightboxWidth - videoWidth) / 2;
  videoControls.style.width = `${videoWidth}px`;
  videoControls.style.margin = `0 ${margin}px`;
  //vertical alignement
  const videoHeight = parseFloat(window.getComputedStyle(videoElement).height);
  const lightboxHeight = parseFloat(window.getComputedStyle(lightbox).height);
  const titleHeight = parseFloat(window.getComputedStyle(title).height);
  const bottom = (lightboxHeight - videoHeight - titleHeight) / 2 + titleHeight;
  videoControls.style.bottom = `${bottom}px`;
}

function setVideoControls() {
  const videoElement = document.querySelector(".lightbox__media");
  videoElement.removeAttribute("controls");
  // in case it was played for last video reading
  playPauseButton.innerHTML = `<img src="public/img/icon/play.svg" alt="Lecture"/>`;
  // format total duration
  let totalMinutes = Math.floor(videoElement.duration / 60);
  let totalSeconds = Math.floor(videoElement.duration - totalMinutes * 60);
  if (totalSeconds < 10) {
    totalSeconds = "0" + totalSeconds;
  }
  let totalTime = totalMinutes + ":" + totalSeconds;
  timeLabel.textContent = "0:00/" + totalTime;
  //Event Listener for button features
  playPauseButton.addEventListener("click", function () {
    if (videoElement.paused) {
      videoElement.play();
      playPauseButton.innerHTML = `<img src="public/img/icon/pause.svg" alt="Pause"/>`;
    } else {
      videoElement.pause();
      playPauseButton.innerHTML = `<img src="public/img/icon/play.svg" alt="Lecture"/>`;
    }
  });
  stopButton.addEventListener("click", function () {
    videoElement.pause();
    videoElement.currentTime = 0;
    playPauseButton.innerHTML = `<img src="public/img/icon/play.svg" alt="Lecture"/>`;
  });
  reverseButton.addEventListener("click", function () {
    videoElement.currentTime -= 3;
  });
  forwardButton.addEventListener("click", function () {
    videoElement.currentTime += 3;
    if (Math.floor(videoElement.currentTime * 100) >= Math.floor(videoElement.duration * 100)) {
      //without the math.floor there is no match
      videoElement.pause();
      videoElement.currentTime = 0;
      playPauseButton.innerHTML = `<img src="public/img/icon/play.svg" alt="Lecture"/>`;
    }
  });
  videoElement.addEventListener("timeupdate", function () {
    //current time
    let mediaMinutes = Math.floor(videoElement.currentTime / 60);
    let mediaSeconds = Math.floor(videoElement.currentTime - mediaMinutes * 60);
    if (mediaSeconds < 10) {
      mediaSeconds = "0" + mediaSeconds;
    }
    let mediaTime = mediaMinutes + ":" + mediaSeconds;
    timeLabel.textContent = mediaTime + "/" + totalTime;
  });
}

function videoControlsDisplay() {
  document.addEventListener("mousemove", mouseTracking);
  for (let button of videoButtons) {
    button.addEventListener("focus", isActive);
    button.addEventListener("click", isActive);
  }
  timer = setInterval(checkActivity, 100);

  document.querySelector(".lightbox__close").addEventListener("click", stopMouseTracking);
  document.querySelector(".lightbox__command__backward").addEventListener("click", stopMouseTracking);
  document.querySelector(".lightbox__command__foreward").addEventListener("click", stopMouseTracking);
}

let mouseTracking = function (e) {
  instantMouseX = e.clientX;
  instantMouseY = e.clientY;
};

//check position of the mouse, and update the display status of the videocontrols if needed
let checkActivity = function () {
  const videoElement = document.querySelector(".lightbox__media");
  //if the mouse hasn't moved or if the mouse isn't in the video area, increments the counter
  if (mouseDoesntMoved() || mouseIsOut()) {
    mouseCount += 1;
  }
  //there is a move in the video area : update mouse position, reset counter and display controls if needed
  else {
    mouseX = instantMouseX;
    mouseY = instantMouseY;
    isActive();
  }
  //if the counter is 30, controls can be hidden because there is no interaction for 3 seconds (30x0.1s)
  if (mouseCount === 30) {
    hideVideoControls();
  }
  //console.log(mouseCount);
};

function mouseIsOut() {
  const videoArea = document.querySelector(".lightbox__media").getBoundingClientRect();
  return instantMouseX < videoArea.left || instantMouseX > videoArea.right || instantMouseY < videoArea.top || instantMouseY > videoArea.bottom;
}

function mouseDoesntMoved() {
  return mouseX === instantMouseX && mouseY === instantMouseY;
}

function showVideoControls() {
  const videoElement = document.querySelector(".lightbox__media");
  videoControls.style.opacity = 1;
  videoControls.style.zIndex = 100;
  videoElement.controlsDisplay = true;
}
function hideVideoControls() {
  const videoElement = document.querySelector(".lightbox__media");
  videoControls.style.opacity = 0;
  setTimeout(function () {
    videoControls.style.zIndex = -1;
  }, 400); // after opacitiy transition
  videoElement.controlsDisplay = false;
}

function isActive() {
  //console.log("fire");
  const videoElement = document.querySelector(".lightbox__media");
  mouseCount = 0;
  if (!videoElement.controlsDisplay) {
    showVideoControls();
  }
}

let stopMouseTracking = function () {
  clearInterval(timer);
  document.removeEventListener("mousemove", mouseTracking);
};

function videoControlsEnabling(keyword) {
  if (keyword === "disable") {
    for (let button of videoButtons) {
      button.setAttribute("disabled","");
    }
    timeLabel.removeAttribute("tabindex");
  }
  if (keyword === "enable") {
    for (let button of videoButtons) {
      button.removeAttribute("disabled");
    }
    timeLabel.setAttribute("tabindex", 0);
  }
}

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

//Builds the media then inserts in replacement with old one and updates the title
export function lightboxMediaDisplay(mediaId) {
  let lightbox = document.querySelector(".lightbox");
  let factory = new Factory();
  for (let media of mediaList) {
    if (media.id === mediaId) {
      let mediaElement = factory.createMedia(media);
      let mediaDisplayed = lightbox.querySelector(".lightbox__media");
      let mediaTitle = lightbox.querySelector(".lightbox__title");
      mediaDisplayed.replaceWith(mediaElement);
      mediaDisplayed = lightbox.querySelector(".lightbox__media"); // re affect the variable because replaceWith do not update
      mediaDisplayed.setAttribute("tabindex", "0");
      mediaDisplayed.setAttribute("id", `${mediaId}-lightbox`);
      mediaTitle.textContent = media.title;
      //alignement media/title and display/hide of controls :
      mediaDisplayed = lightbox.querySelector(".lightbox__media"); // re affect the variable because replaceWith do not update
      switch (mediaDisplayed.tagName) {
        case "IMG":
          mediaDisplayed.addEventListener("load", function () {
            titleAlignement();
            videoControls.style.display = "none";
          });
          videoControlsEnabling("disable");
          break;
        case "VIDEO":
          mediaDisplayed.addEventListener("loadeddata", function () {
            titleAlignement();
            videoControlsAlignement();
            videoControls.style.display = "flex";
            setVideoControls();
            videoControlsDisplay();
          });
          videoControlsEnabling("enable");
          break;
      }
      window.addEventListener("resize", function () {
        titleAlignement();
        if (document.querySelector(".lightbox__videocontrols").style.display !== "none") {
          videoControlsAlignement();
        }
      });
      modaleKeyboardNavigation(document.getElementById("lightbox__modal"));
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
  i = parseInt(i, 10);
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
