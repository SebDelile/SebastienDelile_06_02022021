//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------

import { idNumber, mediaList } from "../main_photographer.js";

//--------------------------------------------------------------------------------------------
//------------------------------- Intermediate stages ----------------------------------------
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

//for each media of the selected photographer : take the info and create an entry in mediaList with formated data
export function mediaListGenerator(medias) {
  for (let media of medias) {
    if (media.photographerId == idNumber) {
      //initiate the object with the easely reachable data
      let info = {
        id: `id${media.id}`,
        price: media.price,
        date: media.date,
        likes: media.likes,
        description: media.description,
      };
      //two possibilities whereas media is image or video
      if (media.image != null) {
        info.type = "image";
        info.minipath = `./public/img/media/${media.photographerId}/mini/${media.image}`;
        info.fullpath = `./public/img/media/${media.photographerId}/full/${media.image}`;
        info.title = media.image;
      }
      if (media.video != null) {
        info.type = "video";
        info.minipath = `./public/img/media/${media.photographerId}/mini/${media.video.replace(".mp4", ".jpg")}`;
        info.fullpath = `./public/img/media/${media.photographerId}/full/${media.video}`;
        info.title = media.video;
      }
      //Formats the title
      info.title = info.title.slice(media.tags[0].length, info.title.length - 4); // delete the initial keyword and file extension
      while (info.title.indexOf("_") !== -1) {
        info.title = info.title.replace("_", " "); // replace all underscores with spaces
      }
      if (info.title.charAt(0) === " ") {
        info.title = info.title.slice(1); // remove whitespace if first character (some data within json have, but not all)
      }
      //push in the table
      mediaList.push(info);
    }
  }
}

//creates and fills a "media" element for eahc entry of mediaList
export function portfolioGenerator() {
  let portfolio = document.querySelector(".portfolio__grid");
  for (let media of mediaList) {
    let element = document.createElement("div");
    element.classList.add("media");
    element.setAttribute("id", media.id);
    element.innerHTML = `<button class="media__button" type="button" aria-labelledby="${media.id}-label" aria-haspopup="dialog" aria-controls="lightbox__modal">
        <img class="media__img" src="${media.minipath}" alt="" />
        </button>
        <div class="media__legend">
          <h3 class="media__title" tabindex="0">${media.title}</h3>
          <p class="media__price" tabindex="0">${media.price} €</p>
          <button class="media__likes" aria-label="${media.likes} mentions j'aime, ajouter mention j'aime">${media.likes}<img src="public/img/icon/like.svg" alt="mentions j'aime"/></button>
          <p class="media__date hidden">${media.date}</p>
          <p class="media__description hidden" id="${media.id}-label">${media.description}, ouvrir média</p>
        </div>`;
    portfolio.append(element);
  }
}

export function incrementLikes(target) {
  //gets the Id of the media (media > media__legend > media__likes)
  let mediaId = target.parentNode.parentNode.getAttribute("id");
  for (let media of mediaList) {
    if (media.id === mediaId) {
      media.likes++;
      //changes the tag button for a new p one without interaction and gives it the focus
      let element = document.createElement("p");
      element.classList.add("media__likes");
      element.setAttribute("tabindex", "0");
      element.innerHTML = `${media.likes} <span aria-hidden="true"><img class="media__likes__liked" src="public/img/icon/like-liked.svg" alt="mentions j'aime, j'aime déjà"/></span><span class="sr-only">mentions j'aime, j'aime déjà</span>`;
      // insertion of element and removing of the old button
      // target.replaceWith(element) should have worked BUT the focus action does not let NVDA screen reader to immediately read the new element
      // so the trick is to let the old element displayed (display none does not worked too) and move it away, so focusing new one is understood as focusing a new element
      // after aq few time the old element can be properly removed.
      target.parentNode.append(element);
      const newLikesButton = document.querySelector(`#${media.id} .media__likes:last-child`);
      newLikesButton.focus();
      target.style.position = "absolute";
      target.style.left = "100000px";
      setInterval(function () {
        target.remove(), 100;
      });
      break;
    }
  }
}
