//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------

import { mediaList } from "../main_photographer.js";

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

var controlsTimeout = null;

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
  // show/hide controls for mouse users
  /*videoElement.addEventListener("mouseleave", function () {
    hideVideoControls();
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
      controlsTimeout = null;
    }
    console.log("videoElement mouseleave");
  });
  videoControls.addEventListener("mouseleave", function () {
    hideVideoControls();
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
      controlsTimeout = null;
    }
    console.log("videoControls mouseleave");
  });
  videoElement.addEventListener("mouseover", function () {
    showVideoControls();
    resetTimeout();
    console.log("videoElement mouseover");
    videoElement.addEventListener ("mousemove", function () {
      showVideoControls();
      resetTimeout();
      console.log("videoElement mousemove");
    });
  });
  videoControls.addEventListener("mouseover", function () {
    showVideoControls();
    resetTimeout();
    console.log("videoControls mouseover");
    videoControls.addEventListener ("mousemove", function () {
      showVideoControls();
      resetTimeout();
      console.log("videoControls mousemove");
    });
  });
  //show/hide controls for keyboard users
  for (let videoButton of videoButtons) {
    videoButton.addEventListener("focus", function () {
      resetTimeout()
      console.log(this.classList[0] + " focus");
    });
    videoButton.addEventListener("click", function () {
      resetTimeout();
      console.log(this.classList[0] + " click");
    });
  }*/
}

function showVideoControls() {
  videoControls.style.opacity = 1;
  videoControls.style.zIndex = 100;
}
function hideVideoControls() {
  videoControls.style.opacity = 0;
  setTimeout(function () {
    videoControls.style.zIndex = -1;
  }, 400); // after opacitiy transition
}

function resetTimeout() {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  controlsTimeout = setTimeout(hideVideoControls, 3000);
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
      mediaTitle.textContent = media.title;
      //alignement media/title and display/hide of controls :
      mediaDisplayed = lightbox.querySelector(".lightbox__media"); // re affect the variable because replaceWith do not update
      switch (mediaDisplayed.tagName) {
        case "IMG":
          mediaDisplayed.addEventListener("load", function () {
            titleAlignement();
            videoControls.style.display = "none";
          });
          break;
        case "VIDEO":
          mediaDisplayed.addEventListener("loadeddata", function () {
            titleAlignement();
            videoControlsAlignement();
            videoControls.style.display = "flex";
            setVideoControls();
          });
          break;
      }
      window.addEventListener("resize", function () {
        titleAlignement();
        if (document.querySelector(".lightbox__videocontrols").style.display !== "none") {
          videoControlsAlignement();
        }
      });
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
