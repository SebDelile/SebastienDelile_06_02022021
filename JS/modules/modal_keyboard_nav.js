//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------
//------------------------------- Intermediate stages ----------------------------------------
//--------------------------------------------------------------------------------------------

//trap the keyboard tab navigation by allowing only tab navigation within the element in the array
let keyLog = function (e) {
    if (e.which !== 9) {
      return;
    }
    //MAJ+TAB is pressed, go to previous element (default) or go to last element
    if (e.shiftKey) {
      if (e.target === focusableElementsArray[0]) {
        e.preventDefault();
        focusableElementsArray[focusableElementsArray.length - 1].focus();
      }
    }
    //TAB is pressed : go to next element (default) or go to first element
    else {
      if (e.target === focusableElementsArray[focusableElementsArray.length - 1]) {
        e.preventDefault();
        focusableElementsArray[0].focus();
      }
    }
  };

//--------------------------------------------------------------------------------------------
//------------------------------------ variables ---------------------------------------------
//--------------------------------------------------------------------------------------------

//is the list of the elements that should receive focus in the modal
const focusableElementsTemplate = ["[href]", "button:not([disabled])", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])", '[tabindex]:not([tabindex="-1"])'];

//is the list of the element in the modal that matches the template
let focusableElementsArray = [];

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

//collect all focusable elements and gives focus to first one
export function modaleKeyboardNavigation(modal) {
  const focusableElements = modal.querySelectorAll(focusableElementsTemplate);
  focusableElementsArray = [];
  for (let focusableElement of focusableElements) {
    focusableElementsArray.push(focusableElement);
  }
  focusableElementsArray[0].focus();
  // on TAB and MAJ+TAB : trapping focus inside the modal
  for (let focusableElement of focusableElementsArray) {
    focusableElement.addEventListener("keydown", keyLog);
  }
}
