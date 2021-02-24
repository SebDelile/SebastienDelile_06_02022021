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

//takes the info and creates an entry in mediaList with formated data for each medium of the selected photographer
export function mediaListGenerator(media) {
  //media is the JSON.media table
  for (let medium of media) {
    if (medium.photographerId == idNumber) {
      //initiate the object with the easely reachable data
      let info = {
        id: `id${medium.id}`,
        price: medium.price,
        date: medium.date,
        likes: medium.likes,
        description: medium.description,
      };
      //two possibilities whereas medium is image or video
      if (medium.image != null) {
        info.type = "image";
        info.minipath = `./public/img/media/${medium.photographerId}/mini/${medium.image}`;
        info.fullpath = `./public/img/media/${medium.photographerId}/full/${medium.image}`;
        info.title = medium.image;
      }
      if (medium.video != null) {
        info.type = "video";
        info.minipath = `./public/img/media/${medium.photographerId}/mini/${medium.video.replace(".mp4", ".jpg")}`;
        info.fullpath = `./public/img/media/${medium.photographerId}/full/${medium.video}`;
        info.title = medium.video;
      }
      //Formats the title
      info.title = info.title.slice(medium.tags[0].length, info.title.length - 4); // delete the initial keyword and file extension
      while (info.title.indexOf("_") !== -1) {
        info.title = info.title.replace("_", " "); // replace all underscores with spaces
      }
      if (info.title.charAt(0) === " ") {
        info.title = info.title.slice(1); // remove whitespace if first character (some data within json has, but not all)
      }
      //push the final medium object in the table
      mediaList.push(info);
    }
  }
}
