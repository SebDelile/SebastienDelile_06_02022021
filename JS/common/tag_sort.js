//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
//------------------------------- Intermediate stages ----------------------------------------
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

export function tagSort(activedTag) {
  const tags = document.getElementsByClassName("tag");
  const cards = document.getElementsByClassName("card");
  //step 1 : check if it needs to sort or unsort
  const sortMode = !activedTag.classList.contains("tagON"); // true : need to sort, false : to unsort
  //step 2 : add/remove class tagON on the corresponding tags
  for (let tag of tags) {
    if (tag.textContent.toUpperCase() === activedTag.textContent.toUpperCase()) {
      if (sortMode) {
        tag.classList.add("tagON");
      } else {
        tag.classList.remove("tagON");
      }
    }
  }
  //step 3 : count how many tags are ON
  const taglist = document.querySelectorAll(".header__nav__tag .tag");
  let totalTagON = 0;
  console.log(taglist);
  for (let tag of taglist) {
    if (tag.classList.contains("tagON")) {
      totalTagON++;
    }
  }
  //there is at least one tagON : display only card with countTagON tagON
  if (totalTagON !== 0) {
    for (let card of cards) {
      let countTagON = 0;
      let cardTaglist = card.getElementsByClassName("tag");
      for (let tag of cardTaglist) {
        if (tag.classList.contains("tagON")) {
          countTagON++;
        }
      }
      if (countTagON === totalTagON) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    }
  }
  //no tagON : display all
  else {
    for (let card of cards) {
      card.style.display = "block";
    }
  }
}
