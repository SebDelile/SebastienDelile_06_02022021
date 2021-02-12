//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------
//------------------------------- Intermediate stages ----------------------------------------
//--------------------------------------------------------------------------------------------



//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

export function formValidity (field){
    if (field.validity.valid) {
        field.style.border = "0.25rem solid #DB8876"; /*color secondary*/
        field.style.borderRadius = "calc(0.3215rem + 0.25rem)" /*need to take into account the border thickness*/
        field.parentNode.querySelector(".form__validity").setAttribute("src", "public/img/icon/checked.svg");
    }
    else {
        field.style.border = "0.25rem solid #901C1C"; /*color primary*/
        field.style.borderRadius = "0.3215rem"
        field.parentNode.querySelector(".form__validity").setAttribute("src", "public/img/icon/warning.svg");
    }
}


export function formSubmission(form){
    for (let field of form) {
        if (field.type !== "submit") {
            console.log(`${field.name} : ${field.value}`);
        }
    }
}

export function submissionConfirmation(form) {
    form.querySelector(".form__submitted").style.display = "flex";
    form.querySelector(".form__submitted p").style.animation = "fade-shift 600ms both";
}