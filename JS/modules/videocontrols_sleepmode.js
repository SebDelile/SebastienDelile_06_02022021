//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------

import { lightboxModal, lightboxModalClose, lightboxBackward, lightboxForward, videoControls, videoButtons } from "../main_photographer.js";

//--------------------------------------------------------------------------------------------
//------------------------------ DOM static elements -----------------------------------------
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
//----------------------------- Initialization of varibales ----------------------------------
//--------------------------------------------------------------------------------------------

let timer;
let mouseX = 0;
let mouseY = 0;
let instantMouseX = 0;
let instantMouseY = 0;
let mouseCount = 0;

//videoElement.controlsIsDisplayed is a property to check if the controls are displayed (true) or not (false). It's created within the factory method in lightbox.js

//--------------------------------------------------------------------------------------------
//------------------------------- Intermediate stages ----------------------------------------
//--------------------------------------------------------------------------------------------

//check position of the mouse, and update the display status of the videocontrols if needed
//the function is launched within an interval (0.1s)
let checkActivity = function () {
  //if the mouse hasn't moved or if the mouse isn't in the video area, increments the counter
  if (mouseDoesntMoved() || mouseIsOut()) {
    mouseCount += 1;
  }
  //there is a move in the video area : updates mouse position, resets counter and displays the controls if needed
  else {
    mouseX = instantMouseX;
    mouseY = instantMouseY;
    isActive();
  }
  //if the counter is 30, controls can be hidden because there is no aactivity for 3 seconds (30x0.1s)
  if (mouseCount === 30) {
    hideVideoControls();
  }
  //console.log(mouseCount);
};

//reports the mouse position on each move
let mouseTracking = function (e) {
  instantMouseX = e.clientX;
  instantMouseY = e.clientY;
};

//returns true if the mouse position is outside of the video area
function mouseIsOut() {
  const videoArea = document.querySelector(".lightbox__medium").getBoundingClientRect();
  return instantMouseX < videoArea.left || instantMouseX > videoArea.right || instantMouseY < videoArea.top || instantMouseY > videoArea.bottom;
}

//returns true if the mouse hasn't moved since last known position
function mouseDoesntMoved() {
  return mouseX === instantMouseX && mouseY === instantMouseY;
}

// reset the "countdown" of the sleep mode and display the controls if needed
let isActive = function() {
  const videoElement = document.querySelector(".lightbox__medium");
  mouseCount = 0;
  if (!videoElement.controlsIsDisplayed) {
    showVideoControls();
  }
}

//shows the controls with a transition (pure CSS) and updates the controlsIsDisplayed property
function showVideoControls() {
  const videoElement = document.querySelector(".lightbox__medium");
  videoControls.style.opacity = 1;
  videoControls.style.zIndex = 100;
  videoElement.controlsIsDisplayed = true;
}

//hides the controls with a transition (pure CSS) and updates the controlsIsDisplayed property
function hideVideoControls() {
  const videoElement = document.querySelector(".lightbox__medium");
  videoControls.style.opacity = 0;
  setTimeout(function () {
    videoControls.style.zIndex = -1;
  }, 400); // after opacitiy transition
  videoElement.controlsIsDisplayed = false;
}

//removes the mouse and keyboard activity tracking features and reset the timer and counter
let stopActivityTracking = function () {
    clearInterval(timer);
    mouseCount = 0;
    document.removeEventListener("mousemove", mouseTracking);
    for (let button of videoButtons) {
      button.removeEventListener("focus", isActive);
      button.removeEventListener("click", isActive);
    }
  };

//--------------------------------------------------------------------------------------------
//------------------------------------ Export(s) ---------------------------------------------
//--------------------------------------------------------------------------------------------

//manage the display or hidding of the video controls according to user's activity
export function videoControlsDisplay() {
  //launch the mouse tracking that is used to monitor the mouse activity
  document.addEventListener("mousemove", mouseTracking);
  //sets eventlistener to monitor the keyboard activity on the videocontrols buttons
  for (let button of videoButtons) {
    button.addEventListener("focus", isActive);
    button.addEventListener("click", isActive);
  }
  //launch the timer which acts as a countdown to hide the videocontrols after inactivity period
  timer = setInterval(checkActivity, 100);
  //remove all tracking when the video is undisplayed (whatever the way)
  lightboxModalClose.addEventListener("click", stopActivityTracking);
  lightboxBackward.addEventListener("click", stopActivityTracking);
  lightboxForward.addEventListener("click", stopActivityTracking);
  lightboxModal.addEventListener("click", function (event) {
    if (event.target === lightboxModal) {
      stopActivityTracking();
    }
  });
  lightboxModal.addEventListener("keydown", function (event) {
    if (event.which === 39 || event.which === 37 || event.which === 27) {
      // 39 = right arrow, 37 = left arrow, 27 = ESC
      stopActivityTracking();
    }
  });
}
