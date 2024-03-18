"use client";

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "~/firebase/firebaseConnec";
import { doc, setDoc } from "firebase/firestore";

import { AuthContext } from "~/context/context";
import { z } from "zod";

import { ChangeEvent, useContext, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Progress } from "~/components/ui/progress";
import { Textarea } from "~/components/ui/textarea";
import { useImageSchema } from "~/app/imagem/schemaImage";
import { toast } from "react-toastify";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { BsCardImage } from "react-icons/bs";
import Image from "next/image";

export default function Imagem() {
  const { userAuth } = useContext(AuthContext);
  const [progress, setProgress] = useState(0);

  const { handleSubmit, schema, errors, register, reset } = useImageSchema();
  type formDataProps = z.infer<typeof schema>;

  const [avatar, setAvatar] = useState("");

  async function handleAvatar(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    const image = e.target.files[0];

    if (!image) {
      return;
    }

    setAvatar(URL.createObjectURL(e.target.files[0]));
  }

  function extrairToken(url: string) {
    const regex = /token=([^&]+)/;
    const match = url.match(regex);

    if (match) {
      return match[1];
    }
    return "";
  }

  const uploadImage = async (data: formDataProps) => {
    const { description, image, title } = data;
    const file = image[0];

    if (!file) return;

    try {
      const storageRef = ref(storage, `images/${title}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      await uploadTask.on(
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
            imageName: title,
            author: `${userAuth?.firstName} ${userAuth?.lastName}`,
            userID: userAuth?.UserID,
            description,
            title,
          });
        }
      );

      reset();
      setAvatar("");
      toast.success("Imagem salva com sucesso 😁");
    } catch (error) {
      toast.error("Não foi possível salvar sua imagem 😔");
    }
  };
  return (
    <main className="flex flex-col items-center h-full gap-7 mt-24 w-[1200px]">
      <div className="flex items-start">
        <span className="text-4xl font-medium">Criar uma nova imagem</span>
      </div>
      <form
        className="flex gap-4 py-4 justify-center h-full w-full"
        onSubmit={handleSubmit(uploadImage)}
      >
        <div className="h-3/4 w-2/3 flex flex-col gap-3 p-3">
          {!avatar ? (
            <>
              <Card className="h-full w-[350px] flex items-center justify-center relative">
                <CardContent className="flex flex-col items-center justify-center">
                  <BsCardImage size={40} />
                  <span className="text-center">
                    Escolha uma imagem ou arraste e solte-o aqui
                  </span>
                </CardContent>
                <Input
                  id="file"
                  type="file"
                  {...register("image", {
                    onChange: (e) => {
                      handleAvatar(e);
                    },
                  })}
                  className="h-full w-full absolute opacity-0"
                />
              </Card>
            </>
          ) : (
            <div className="h-full w-[350px] flex items-center justify-center relative">
              <Image
                alt="Preview"
                src={avatar}
                width={350}
                height={350}
                className="w-full max-w-[350px] rounded-lg"
              />
              <Input
                id="file"
                type="file"
                {...register("image", {
                  onChange: (e) => {
                    handleAvatar(e);
                  },
                })}
                className="h-full w-full absolute opacity-0"
              />
            </div>
          )}
        </div>

        <div className="h-3/4 w-2/3 relative">
          <div
            className={`h-full w-full absolute z-50 bg-slate-50 opacity-40 rounded-lg cursor-not-allowed ${
              avatar && "hidden"
            }`}
          ></div>

          <div className="h-full w-full flex flex-col justify-between p-3">
            <label className="flex flex-col gap-2" htmlFor="title">
              <span>Titúlo</span>
              <Input id="title" type="text" {...register("title")} />
              {errors.title && (
                <span className="text-red-700 text-xs">
                  {errors.title.message}
                </span>
              )}
            </label>

            <label className="flex flex-col gap-2" htmlFor="description">
              <span>Descrição da imagem</span>
              <Textarea
                id="description"
                {...register("description")}
              ></Textarea>
              {errors.description && (
                <span className="text-red-700 text-xs">
                  {errors.description.message}
                </span>
              )}
            </label>

            <div className="flex items-center gap-2">
              <Progress value={progress} max={100} /> <span>{progress}%</span>
            </div>

            <div className="flex justify-center items-center flex-row gap-3 w-full">
              <Button
                disabled={userAuth?.user === "UserPublico" && true}
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-700 w-full"
              >
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
