//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
//------------------------------- Intermediate stages ----------------------------------------
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

export function portfolioGenerator(json, idNumber) {
  console.log(idNumber);
  console.log(json);
  const portfolio = document.querySelector(".portfolio__grid");
  for (let media of json) {
    if (media.photographerId == idNumber) {
      //initiates an element
      let element = document.createElement("div");
      element.classList.add("media");
      element.setAttribute("id", `id${media.id}`);
      element.innerHTML = `<img class="media__img" src="" alt="" />
        <p class="media__description sr-only"></p>
        <div class="media__legend">
          <h3 class="media__title"></h3>
          <p class="media__price">${media.price} €</p>
          <p class="media__likes">${media.likes}<img src="public/img/icon/like.svg" /></p>
          <p class="media__date hidden">${media.date}</p>
        </div>`;
      // checks if media is a video or image and gives corresponding value to title and path
      let path = "string";
      let title = "string";
      if (media.image != null) {
        path = `./public/img/media/${media.photographerId}/mini/${media.image}`;
        title = media.image.slice(0, media.image.length - 4); // delete the file extension;
      }
      if (media.video != null) {
        path = `./public/img/media/${media.photographerId}/mini/${media.video.replace(".mp4", ".jpg")}`;
        title = media.video.slice(0, media.video.length - 4); // delete the file extension;
      }
      title = title.slice(media.tags[0].length); // delete the initial keyword
      while (title.indexOf("_") !== -1) {
        title = title.replace("_", " "); // replace all underscores with spaces
      }
      element.querySelector(".media__img").setAttribute("src", path);
      element.querySelector(".media__title").textContent = title;
      portfolio.append(element);
    }
  }
}
