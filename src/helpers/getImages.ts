import { collection, getDocs, limit, query } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { ImageProps } from "~/app/@types/imagetype";
import { db } from "~/firebase/firebaseConnec";

export async function getImages(
  setArray: Dispatch<SetStateAction<ImageProps[]>>,
  limited: number = 50
) {
  let listImages: ImageProps[] = [];

  const querySnapshot = await getDocs(
    query(collection(db, "images"), limit(limited))
  );

  await querySnapshot.forEach((doc) => {
    const imagedata = doc.data() as ImageProps;

    listImages.push({
      description: imagedata.description,
      imgID: imagedata.imgID,
      title: imagedata.title,
      author: imagedata.author,
      imageName: imagedata.imageName,
      urlImage: imagedata.urlImage,
      userID: imagedata.userID,
    });
  });

  setArray(listImages);

  return setArray;
}
