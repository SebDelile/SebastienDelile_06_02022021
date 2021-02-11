//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
//------------------------------- Intermediate stages ----------------------------------------
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

export function profileGenerator(json, idNumber) {
  const profile = document.querySelector(".profile");
  //looking for the photographer in the list
  for (let photographer of json) {
    if (photographer.id == idNumber) {
      //copying the data in the profile section
      profile.querySelector(".profile__name").textContent = photographer.name;
      profile.querySelector(".profile__location").textContent = `${photographer.city}, ${photographer.country}`;
      profile.querySelector(".profile__quote").textContent = photographer.tagline;
      for (let tag of photographer.tags) {
        let Tag = tag.charAt(0).toUpperCase() + tag.substr(1); //1st letter uppercase
        profile.querySelector(".profile__taglist").insertAdjacentHTML("beforeend", `<li class="profile__tag tag"><a href="index.html?${tag}">#${Tag}</a></li>`);
      }
      profile.querySelector(".profile__picture").setAttribute("src", `./public/img/photographer-portraits/${photographer.portrait}`);
      profile.querySelector(".profile__picture").setAttribute("alt", `Portrait of ${photographer.name}`);
      profile.querySelector(".profile__price").textContent = `${photographer.price} €/j`;
      document.querySelector(".main__title").textContent = `Page de ${photographer.name}`;
      break;
    }
  }

  //copying the data in the profile section
}
