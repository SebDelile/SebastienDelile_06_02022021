//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------

import { videoButtons, videoControls } from "../main_photographer.js";

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


//Add all the event listeners with corresponding named function
function videoControlsAddListener(videoElement) {
  videoElement.addEventListener("keydown", videoEnterListener);
  videoElement.addEventListener("pause", videoPauseListener);
  videoElement.addEventListener("play", videoPlayListener);
  playPauseButton.addEventListener("click", playPauseButtonListener);
  stopButton.addEventListener("click", stopButtonListener);
  forwardButton.addEventListener("click", forwardButtonListener);
  reverseButton.addEventListener("click", reverseButtonListener);
  videoElement.addEventListener("timeupdate", timeLabelListener);
}


//All functions added to the different elements giving them the video features
//the functions have to be named in order to be removable

let videoEnterListener = function (event) {
  if (event.which === 13) {
    //13  ENTER
    event.target.play();
    //then add eventlistener to play/pause with SPACE
    event.target.addEventListener("keydown", videoSpaceListener);
  }
};

let videoSpaceListener = function (event) {
  if (event.which === 32) {
    //32 = SPACE
    event.preventDefault();
    playPauseButton.click();
  }
};

let videoPauseListener = function () {
  playPauseButton.innerHTML = `<img src="public/img/icon/play.svg" alt="Lecture"/>`;
};

let videoPlayListener = function () {
  playPauseButton.innerHTML = `<img src="public/img/icon/pause.svg" alt="Pause"/>`;
};

let playPauseButtonListener = function () {
  const videoElement = document.querySelector(".lightbox__medium");
  if (videoElement.paused) {
    videoElement.play();
  } else {
    videoElement.pause();
  }
};

let stopButtonListener = function () {
  const videoElement = document.querySelector(".lightbox__medium");
  videoElement.pause();
  videoElement.currentTime = 0;
};

let forwardButtonListener = function () {
  const videoElement = document.querySelector(".lightbox__medium");
  videoElement.currentTime += 3;
  if (Math.floor(videoElement.currentTime * 100) >= Math.floor(videoElement.duration * 100)) {
    //without the math.floor there is no match
    videoElement.pause();
    videoElement.currentTime = 0;
  }
};

let reverseButtonListener = function () {
  videoElement.currentTime -= 3;
};

let timeLabelListener = function () {
  const videoElement = document.querySelector(".lightbox__medium");
  let videoMinutes = Math.floor(videoElement.currentTime / 60);
  let videoSeconds = Math.floor(videoElement.currentTime - videoMinutes * 60);
  if (videoSeconds < 10) {
    videoSeconds = "0" + videoSeconds;
  }
  let videoTime = videoMinutes + ":" + videoSeconds;
  timeLabel.textContent = videoTime + "/" + totalTime(videoElement);
};

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
export function videoControlsInitialization(videoElement) {
  //videoelement is the displayed medium element
  videoElement.removeAttribute("controls");
  // initialize the videocontrols innerdisplay
  playPauseButton.innerHTML = `<img src="public/img/icon/play.svg" alt="Lecture"/>`;
  timeLabel.textContent = "0:00/" + totalTime(videoElement);
  //set the features of the controls
  videoControlsAddListener(videoElement);
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

//this function is used to remove all listener on the video and controls on undisplayment of the video
export function clearButtonsListener() {
  const videoElement = document.querySelector(".lightbox__medium");
  videoElement.removeEventListener("keydown", videoEnterListener);
  videoElement.removeEventListener("keydown", videoSpaceListener);
  videoElement.removeEventListener("pause", videoPauseListener);
  videoElement.removeEventListener("play", videoPlayListener);
  playPauseButton.removeEventListener("click", playPauseButtonListener);
  stopButton.removeEventListener("click", stopButtonListener);
  forwardButton.removeEventListener("click", forwardButtonListener);
  reverseButton.removeEventListener("click", reverseButtonListener);
  videoElement.removeEventListener("timeupdate", timeLabelListener);
}
