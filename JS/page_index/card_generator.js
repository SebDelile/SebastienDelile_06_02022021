//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
//------------------------------- Intermediate stages ----------------------------------------
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

export function createCard(photographer) {
  let element = document.createElement("article");
  element.classList.add("card");
  element.setAttribute("id", `id${photographer.id}`);
  element.innerHTML = `
    <a class="card__link" aria-label="Page de ${photographer.name}" href="photographer.html?id${photographer.id}">
     <img class="card__picture" src="./public/img/photographer-portraits/${photographer.portrait}" alt="photographer profile picture" />
     <h3 class="card__name">${photographer.name}</h3>
    </a>
    <div class="card__text" tabindex="0">
     <p class="card__location">${photographer.city}, ${photographer.country}</p>
     <p class="card__quote">${photographer.tagline}</p>
     <p class="card__price">${photographer.price} <span aria-hidden="true">€/j</span><span class="sr-only">euros par jour</span></p>
    </div>
    <button class="card__taglist__button tag__button sr-only" aria-labeledby="taglist-button-label" aria-checked="false" type="button"></button>
    <ul class="card__taglist taglist" role="menu">
    </ul>`;
  for (let tag of photographer.tags) {
    let Tag = tag.charAt(0).toUpperCase() + tag.substr(1); //1st letter uppercase
    element.querySelector(".card__taglist").insertAdjacentHTML("beforeend", 
    `<li class="card__tag">
      <button class="tag" role="menuitemcheckbox" aria-checked="false" aria-labelledby="tagLabel-${tag}" type="button" tabindex="-1">#${Tag}</button>
    </li>`);
  }
  document.querySelector(".main__grid").append(element);
}
