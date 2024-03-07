import { collection, onSnapshot } from "firebase/firestore";
import { db } from "~/firebase/firebaseConnec";
import { getImages } from "./getImages";
import { Dispatch, SetStateAction } from "react";
import { imagesProps } from "~/app/@types/imagetype";

export function loadImages(
  setArrayImages: Dispatch<SetStateAction<imagesProps[]>>
) {
  const unsub = onSnapshot(collection(db, "images"), (snapshot) => {
    getImages(setArrayImages);
  });
}
