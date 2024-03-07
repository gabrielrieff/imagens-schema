import { collection, getDocs, limit, query } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { imagesProps } from "~/app/@types/imagetype";
import { db } from "~/firebase/firebaseConnec";

export async function getImages(
  setArray: Dispatch<SetStateAction<imagesProps[]>>
) {
  let listImages: imagesProps[] = [];

  const querySnapshot = await getDocs(
    query(collection(db, "images"), limit(50))
  );

  await querySnapshot.forEach((doc) => {
    const imagedata = doc.data() as imagesProps;

    listImages.push({
      description: imagedata.description,
      imgID: imagedata.imgID,
      title: imagedata.title,
      urlImage: imagedata.urlImage,
      userID: imagedata.userID,
    });
  });

  setArray(listImages);

  return setArray;
}
