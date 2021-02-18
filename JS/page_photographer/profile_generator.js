//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------

import {idNumber, mediaList} from "../main_photographer.js";

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

export function profileGenerator(photographers) {
  const profile = document.querySelector(".profile");
  //looking for the photographer in the list
  for (let photographer of photographers) {
    if (photographer.id == idNumber) {
      //copying the data in the profile section
      profile.querySelector(".profile__name").textContent = photographer.name;
      profile.querySelector(".profile__location").textContent = `${photographer.city}, ${photographer.country}`;
      profile.querySelector(".profile__quote").textContent = photographer.tagline;
      for (let tag of photographer.tags) {
        let Tag = tag.charAt(0).toUpperCase() + tag.substr(1); //1st letter uppercase
        profile.querySelector(".profile__taglist").insertAdjacentHTML("beforeend", `<li class="profile__tag"><a class="tag" href="index.html?tag=${tag}">#${Tag}</a></li>`);
      }
      profile.querySelector(".profile__picture").setAttribute("src", `./public/img/photographer-portraits/${photographer.portrait}`);
      profile.querySelector(".profile__picture").setAttribute("alt", `Portrait de ${photographer.name}`);
      profile.querySelector(".profile__price").innerHTML = `${photographer.price} <span aria-hidden="true">€/j</span><span class="sr-only">euros par jour</span>`;
      profile.querySelector(".profile__title").textContent = `Page de ${photographer.name}`;
      document.querySelector(".form__subtitle").textContent = photographer.name;
      document.title = `${photographer.name} - FishEye`
      break;
    }
  }
}

export function sumLikes() {
  let sum = 0;
  for (let media of mediaList) {
    sum = sum + media.likes
  }
  document.querySelector(".profile__likes").innerHTML = `${sum} <span aria-hidden="true"><img src="public/img/icon/like-alt.svg" alt="mentions j'aime"/></span><span class="sr-only">mentions j'aime</span>`;
}
