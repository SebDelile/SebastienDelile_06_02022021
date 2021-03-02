//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------

import { videoButtons } from "../main_photographer.js";

//--------------------------------------------------------------------------------------------
//------------------------------ DOM static elements -----------------------------------------
//--------------------------------------------------------------------------------------------

const playPauseButton = document.querySelector(".lightbox__videocontrols__playpause");
const stopButton = document.querySelector(".lightbox__videocontrols__stop");
const reverseButton = document.querySelector(".lightbox__videocontrols__rwd");
const forwardButton = document.querySelector(".lightbox__videocontrols__fwd");
const timeLabel = document.querySelector(".lightbox__videocontrols__time");

//--------------------------------------------------------------------------------------------
//------------------------------- Intermediate stages ----------------------------------------
//--------------------------------------------------------------------------------------------

//keyboard actions when the video is focussed
function videoControlsGlobalListener(videoElement) {
  videoElement.addEventListener("keydown", function (event) {
    if (event.which === 13) {//13  ENTER
      videoElement.play();
      //then add eventlistener to play/pause with SPACE
      videoElement.addEventListener("keydown", function (event) {
        if (event.which === 32) { //32 = SPACE
          event.preventDefault();
          playPauseButton.click();
        }
      });
    }
  });
  videoElement.addEventListener("pause", function () {
    playPauseButton.innerHTML = `<img src="public/img/icon/play.svg" alt="Lecture"/>`;
  });
  videoElement.addEventListener("play", function () {
    playPauseButton.innerHTML = `<img src="public/img/icon/pause.svg" alt="Pause"/>`;
  });
}

function playPauseButtonListener(videoElement) {
  playPauseButton.addEventListener("click", function () {
    if (videoElement.paused) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  });
}

function stopButtonListener(videoElement) {
  stopButton.addEventListener("click", function () {
    videoElement.pause();
    videoElement.currentTime = 0;
  });
}

function forwardButtonListener(videoElement) {
  forwardButton.addEventListener("click", function () {
    videoElement.currentTime += 3;
    if (Math.floor(videoElement.currentTime * 100) >= Math.floor(videoElement.duration * 100)) {
      //without the math.floor there is no match
      videoElement.pause();
      videoElement.currentTime = 0;
    }
  });
}

function reverseButtonListener(videoElement) {
  reverseButton.addEventListener("click", function () {
    videoElement.currentTime -= 3;
  });
}

function timeLabelUpdate(videoElement) {
  videoElement.addEventListener("timeupdate", function () {
    let videoMinutes = Math.floor(videoElement.currentTime / 60);
    let videoSeconds = Math.floor(videoElement.currentTime - videoMinutes * 60);
    if (videoSeconds < 10) {
      videoSeconds = "0" + videoSeconds;
    }
    let videoTime = videoMinutes + ":" + videoSeconds;
    timeLabel.textContent = videoTime + "/" + totalTime(videoElement);
  });
}

//returns the formated duration of the video
function totalTime(videoElement) {
  let totalMinutes = Math.floor(videoElement.duration / 60);
  let totalSeconds = Math.floor(videoElement.duration - totalMinutes * 60);
  if (totalSeconds < 10) {
    totalSeconds = "0" + totalSeconds;
  }
 return totalMinutes + ":" + totalSeconds;
}

//--------------------------------------------------------------------------------------------
//------------------------------------- Export(s) --------------------------------------------
//--------------------------------------------------------------------------------------------

//Links the button to the videoElement and set the features on each of them
export function videoControlsInitialization(videoElement) { //videoelement is the displayed medium element
  videoElement.removeAttribute("controls");
  // initialize the videocontrols inner display
  playPauseButton.innerHTML = `<img src="public/img/icon/play.svg" alt="Lecture"/>`;
  timeLabel.textContent = "0:00/" + totalTime(videoElement);
  //set the features of the controls
  videoControlsGlobalListener(videoElement);
  playPauseButtonListener(videoElement);
  stopButtonListener(videoElement);
  forwardButtonListener(videoElement);
  reverseButtonListener(videoElement);
  timeLabelUpdate(videoElement);
}

//enables or not the keyboard tab navigation on videoControls depending on the displayed medium
//mandatory for the modalKeyboardNavigation feature 
export function videoControlsEnabling(keyword) {
  if (keyword === "disable") {
    for (let button of videoButtons) {
      button.setAttribute("disabled", "");
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


