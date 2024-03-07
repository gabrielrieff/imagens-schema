"use client";

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "~/firebase/firebaseConnec";
import { doc, setDoc } from "firebase/firestore";

import { AuthContext } from "~/context/context";
import { z } from "zod";

import { useContext, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Progress } from "~/components/ui/progress";
import { Textarea } from "~/components/ui/textarea";
import { useImageSchema } from "~/app/imagem/schemaImage";

export default function Imagem() {
  const { userAuth } = useContext(AuthContext);
  const [progress, setProgress] = useState(0);

  const { handleSubmit, schema, errors, register } = useImageSchema();
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
    <main className="flex flex-col items-center h-screen gap-7">
      <div className="flex items-start">
        <span className="text-4xl font-medium">Criar uma nova imagem</span>
      </div>
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

        <div className="flex justify-center items-center flex-row gap-3 w-full">
          <Button type="submit" className="bg-green-900 w-full">
            Salvar
          </Button>
        </div>
      </form>
    </main>
  );
}
