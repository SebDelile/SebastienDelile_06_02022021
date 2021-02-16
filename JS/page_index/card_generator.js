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
    <a class="card__link" href="photographer.html?id${photographer.id}">
     <img class="card__picture" src="./public/img/photographer-portraits/${photographer.portrait}" alt="photographer profile picture" />
     <h3 class="card__name">${photographer.name}</h3>
    </a>
    <div class="card__text">
     <p class="card__location">${photographer.city}, ${photographer.country}</p>
     <p class="card__quote">${photographer.tagline}</p>
     <p class="card__price">${photographer.price} €/j</p>
    </div>
    <ul class="card__taglist">
     <span class="card__taglist__title sr-only">Tags</span>
    </ul>`;
  for (let tag of photographer.tags) {
    let Tag = tag.charAt(0).toUpperCase() + tag.substr(1); //1st letter uppercase
    element.querySelector(".card__taglist").insertAdjacentHTML("beforeend", `<li class="card__tag"><a class="tag" href="${tag}">#${Tag}</a></li>`);
  };
  document.querySelector(".main__grid").append(element);
}
