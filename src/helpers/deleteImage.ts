import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "~/firebase/firebaseConnec";

export async function deleteImage(nameImg: string, idImg: string) {
  const storageDb = ref(storage, `images/${nameImg}`);
  const imageDb = doc(db, "images", idImg);

  await deleteObject(storageDb)
    .then(async (res) => {
      await deleteDoc(imageDb);
    })
    .catch((error) => {
      console.log(error);
    });
}
