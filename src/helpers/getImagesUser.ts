import { collection, getDocs, query, where } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { ImageProps } from "~/app/@types/imagetype";
import { db } from "~/firebase/firebaseConnec";

export async function getImagesUser(
  setArray: Dispatch<SetStateAction<ImageProps[]>>,
  userID: string
) {
  let listImages: ImageProps[] = [];

  const queryCollection = query(
    collection(db, "images"),
    where("userID", "==", userID)
  );

  const querySnapshot = await getDocs(queryCollection);

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

  return setArray(listImages);
}
