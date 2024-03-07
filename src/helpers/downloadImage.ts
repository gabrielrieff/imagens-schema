import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "~/firebase/firebaseConnec";

export async function downloadImage(url: string, filename: string) {
  const imageRef = ref(storage, url);

  try {
    const imageUrl = await getDownloadURL(imageRef);
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log("Download da imagem realizado com sucesso!");
  } catch (error) {
    console.error("Erro ao baixar imagem:", error);
  }
}
