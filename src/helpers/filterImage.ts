import { collection, getDocs, query } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { ImageProps } from "~/app/@types/imagetype";
import { db } from "~/firebase/firebaseConnec";

export async function filterImage(
  setArray: Dispatch<SetStateAction<Array<ImageProps>>>,
  title: string
): Promise<void> {
  try {
    let listImages: ImageProps[] = [];

    const querySnapshot = await getDocs(query(collection(db, "images")));

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

    return setArray(
      listImages.filter((image) =>
        image.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())
      )
    );
  } catch (error) {
    console.error("Erro ao buscar imagens:", error);
    throw error;
  }
}
