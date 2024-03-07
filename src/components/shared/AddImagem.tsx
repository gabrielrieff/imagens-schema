import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "~/firebase/firebaseConnec";
import { doc, setDoc } from "firebase/firestore";

import { AuthContext } from "~/context/context";
import { useAddImageSchema } from "../schema/schemaAddImage";
import { z } from "zod";

import { useContext, useState } from "react";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import { Textarea } from "../ui/textarea";

export const AddImagem = () => {
  const { userAuth } = useContext(AuthContext);
  const [progress, setProgress] = useState(0);

  const { handleSubmit, schema, errors, register } = useAddImageSchema();
  type formDataProps = z.infer<typeof schema>;

  function extrairToken(url: string) {
    const regex = /token=([^&]+)/;
    const match = url.match(regex);

    if (match) {
      return match[1];
    }
    return "";
  }

  const uploadImage = (data: formDataProps) => {
    const { description, image, title } = data;
    const file = image[0];

    if (!file) return;
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => {
        console.log(err);
      },
      async () => {
        var urlImage = "";
        await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          urlImage = url;
        });

        const imgID = extrairToken(urlImage);

        await setDoc(doc(db, "images", imgID), {
          urlImage,
          imgID,
          userID: userAuth?.UserID,
          description,
          title,
        });
      }
    );
  };

  return (
    <DialogContent className="max-w-[70%] sm:max-w-[425px]">
      <DialogHeader className="flex items-start">
        <DialogTitle>Criar uma nova imagem</DialogTitle>
      </DialogHeader>
      <form
        className="grid gap-4 py-4 justify-center"
        onSubmit={handleSubmit(uploadImage)}
      >
        <label className="flex flex-col gap-2" htmlFor="title">
          <span>Titúlo</span>
          <Input id="title" type="text" {...register("title")} />
          {errors.title && (
            <span className="text-red-700 text-xs">{errors.title.message}</span>
          )}
        </label>

        <label className="flex flex-col gap-2" htmlFor="description">
          <span>Descrição da imagem</span>
          <Textarea id="description" {...register("description")}></Textarea>
          {errors.description && (
            <span className="text-red-700 text-xs">
              {errors.description.message}
            </span>
          )}
        </label>

        <label className="flex flex-col gap-2" htmlFor="file">
          <span>Escolha uma imagem</span>
          <Input
            id="file"
            type="file"
            {...register("image")}
            accept="image/png, image/jpeg, image/jpg"
          />
        </label>

        <div className="flex items-center gap-2">
          <Progress value={progress} max={100} /> <span>{progress}%</span>
        </div>

        <DialogFooter className="flex justify-center items-center flex-row gap-3 w-full">
          <DialogClose asChild>
            <Button type="button" variant={"destructive"}>
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-green-900">
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
