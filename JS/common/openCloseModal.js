//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------
//------------------------------- Intermediate stages ----------------------------------------
//--------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

// open the modal with an animation
export function openModal(element) {
    element.classList.add("modal__appear");
    element.querySelector(":last-child").classList.add("modal__child__appear");
    element.style.display = "flex";
    //Removing the classes for future use : 200ms delay + 600ms animation duration
    setTimeout(function(){
        element.querySelector(":last-child").classList.remove("modal__child__appear");
        element.classList.remove("modal__appear");
    },800);
}

//close the modal with an animation
export function closeModal(element) {
    element.querySelector(":last-child").classList.add("modal__child__disappear");
    element.classList.add("modal__disappear");
    //Removing the classes for future use 200ms delay + 600ms animation duration
    setTimeout(function(){
        element.style.display = "none";
        element.querySelector(":last-child").classList.remove("modal__child__disappear");
        element.classList.remove("modal__disappear");
    },800);
}