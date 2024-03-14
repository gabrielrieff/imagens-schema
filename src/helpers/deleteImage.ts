import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "react-toastify";
import { db, storage } from "~/firebase/firebaseConnec";

export async function deleteImage(nameImg: string, idImg: string) {
  const storageDb = ref(storage, `images/${nameImg}`);
  const imageDb = doc(db, "images", idImg);

  await deleteObject(storageDb)
    .then(async (res) => {
      await deleteDoc(imageDb);
      toast.success("Imagem deletada com sucesso 😁");
    })
    .catch((error) => {
      console.log(error);
      toast.error("Erro ao tentar deletar sua imagem 😔");
    });
}
