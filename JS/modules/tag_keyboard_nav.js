//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
//------------------------------- Intermediate stages ----------------------------------------
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

//when run (user press ENTER on taglist button), the tag buttons become accessible with tab
export function tagTabAcces(target) {
  //target is a button element next to the taglist
  const tags = target.parentNode.getElementsByClassName("tag");
  for (let tag of tags) {
    tag.removeAttribute("tabindex");
  }
  tags[0].focus();
}

//do the opposite of the tagTabAccess function to restore the tabindex attribute after leaving the taglist
export function tagTabForbid(target) {
  //target is the taglist element
  const tags = target.getElementsByClassName("tag");
  for (let tag of tags) {
    tag.setAttribute("tabindex", "-1");
  }
}
