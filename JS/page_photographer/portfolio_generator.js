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
        "id": `id${media.id}`,
        "price": media.price,
        "date": media.date,
        "likes": media.likes,
        "description": "string", //wait before json is filled with description
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
        info.title = info.title.slice(1) // remove whitespace if first character (some data within json have, but not all)
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
    element.innerHTML = `<img class="media__img" src="${media.minipath}" alt="" />
        <p class="media__description sr-only"></p>
        <div class="media__legend">
          <h3 class="media__title">${media.title}</h3>
          <p class="media__price">${media.price} €</p>
          <p class="media__likes">${media.likes}<img src="public/img/icon/like.svg" /></p>
          <p class="media__date hidden">${media.date}</p>
        </div>`;

    //add description ?
    portfolio.append(element);
  }
}

export function incrementLikes(target) {
  //get the Id of the media (media > media__legend > media__likes > img)
  let mediaId = target.parentNode.parentNode.parentNode.getAttribute("id");
  for (let media of mediaList) {
    if (media.id === mediaId) {
      media.likes++;
      //changing the innerHTML with new value as great effect to remove the event listener on the <img> !
      target.parentNode.innerHTML = `${media.likes}<img class="media__likes__liked" src="public/img/icon/like.svg" /></p>`
      break;
    }
  }
}