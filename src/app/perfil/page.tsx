"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "~/context/context";

import { getImagesUser } from "~/helpers/getImagesUser";
import { useRouter } from "next/navigation";

import Image from "next/image";

import { Button } from "~/components/ui/button";
import { ImageComp } from "~/components/shared/image";
import { MdClose } from "react-icons/md";
import { imagesProps } from "../@types/imagetype";
import { deleteImage } from "~/helpers/deleteImage";
import { loadImages } from "~/helpers/loadImages";

export default function Perfil() {
  const { userAuth } = useContext(AuthContext);
  const { push } = useRouter();

  const [SavedAndCreated, setSavedAndCreated] = useState(true);
  const [images, setImages] = useState<imagesProps[]>([]);

  function toAlterSessionSavedAndCreated() {
    setSavedAndCreated(!SavedAndCreated);
  }

  useEffect(() => {
    if (userAuth === undefined) return;

    getImagesUser(setImages, userAuth.UserID);
  }, [userAuth]);

  useEffect(() => {
    loadImages(setImages);
  }, []);
  return (
    <main className="flex flex-col items-center h-screen gap-7">
      <section className="flex items-center justify-center flex-col gap-10 w-[1200px]">
        <div className="flex items-center flex-col gap-4">
          <span className="w-28 h-28 rounded-full bg-zinc-200 flex items-center justify-center text-6xl font-semibold">
            {userAuth?.firstName.substring(0, 1).toLocaleUpperCase()}
          </span>

          <span className="text-4xl">
            {userAuth?.firstName} {userAuth?.lastName}
          </span>

          <div className="flex items-center justify-center gap-1">
            <span className="flex items-center justify-center font-medium text-xs w-[20px] h-[20px] bg-gray-400 text-white rounded-full">
              IS
            </span>
            <span>@{userAuth?.user}</span>
          </div>
        </div>

        <div>
          <Button variant={"default"}>Editar perfil</Button>
        </div>

        <div>
          <Button
            onClick={toAlterSessionSavedAndCreated}
            variant={`${SavedAndCreated ? "link" : "ghost"}`}
            className={`${SavedAndCreated ? "underline" : ""}`}
          >
            Criados
          </Button>
          <Button
            onClick={toAlterSessionSavedAndCreated}
            variant={`${!SavedAndCreated ? "link" : "ghost"}`}
            className={`${!SavedAndCreated ? "underline" : ""}`}
          >
            Salvos
          </Button>
        </div>

        <div className="max-w-[1200px] w-[70%]">
          <div className="w-full flex justify-center">
            {SavedAndCreated === true ? (
              <div className="flex flex-col items-center gap-4">
                <div>
                  <Button
                    variant={"destructive"}
                    onClick={() => push("/imagem")}
                  >
                    Criar imagem
                  </Button>
                </div>
                <div className="max-w-[1200px] flex flex-wrap gap-3">
                  {images.length > 0 ? (
                    images.map((image) => (
                      <ImageComp.Root
                        key={image.imgID}
                        Image={
                          <Image
                            src={image.urlImage}
                            width={100}
                            height={150}
                            alt={image.title}
                            className="rounded-lg w-full bg-no-repeat"
                          />
                        }
                      >
                        <ImageComp.ImageFooter className="justify-end items-start mr-1 mt-1">
                          <Button
                            onClick={() =>
                              deleteImage(image.imageName, image.imgID)
                            }
                            variant={"ghost"}
                            className="bg-white h-[30px] p-1 hover:bg-gray-200"
                          >
                            <MdClose size={20} />
                          </Button>
                        </ImageComp.ImageFooter>
                      </ImageComp.Root>
                    ))
                  ) : (
                    <p>
                      Ainda não há nada para mostrar. As imagens que você criar
                      ficarão aqui.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <p>Em construção</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
