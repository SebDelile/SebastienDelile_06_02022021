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
    <a href="photographer.html?id${photographer.id}">
     <img class="card__picture" src="./public/img/photographer-portraits/${photographer.portrait}" alt="photographer profile picture" />
     <h3 class="card__name">${photographer.name}</h3>
     <p class="card__location">${photographer.city}, ${photographer.country}</p>
     <p class="card__quote">${photographer.tagline}</p>
     <p class="card__price">${photographer.price} €/j</p>
    </a>
    <ul class="card__taglist"></ul>`;
  for (let tag in photographer.tags) {
    element.querySelector(".card__taglist").insertAdjacentHTML("beforeend", `<li class="card__tag tag"><a href="${photographer.tags[tag]}">#${photographer.tags[tag]}</a></li>`);
    document.querySelector(".main__grid").append(element);
  };
}
