"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "~/context/context";

import { getImagesUser } from "~/helpers/getImagesUser";
import { useRouter } from "next/navigation";

import Image from "next/image";

import { Button } from "~/components/ui/button";
import { ImageComp } from "~/components/shared/image";
import { MdClose } from "react-icons/md";
import { ImageProps } from "../@types/imagetype";
import { deleteImage } from "~/helpers/deleteImage";
import { loadImages } from "~/helpers/loadImages";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { toast } from "react-toastify";

export default function Perfil() {
  const { userAuth } = useContext(AuthContext);
  const { push } = useRouter();

  const [SavedAndCreated, setSavedAndCreated] = useState(true);
  const [images, setImages] = useState<ImageProps[]>([]);

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

  function deleteImg(name: string, id: string) {
    try {
      deleteImage(name, id);

      toast.success("Imagem deletada com sucesso 😁");
    } catch (error) {
      toast.error("Erro ao tentar deletar sua imagem 😔");
    }
  }
  return (
    <main className="flex flex-col items-center h-screen gap-7 mt-24">
      <section className="flex items-center justify-center flex-col gap-10 max-w-[1200px]">
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

        <div>
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
                <div className=" columns-7 xl:columns-5 md:columns-3 gap-4 mb-4">
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
                            className="rounded-lg w-full bg-no-repeat mb-4"
                          />
                        }
                      >
                        <ImageComp.ImageFooter className="justify-end items-start mr-1 mt-1">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                className="bg-white h-[30px] p-1 hover:bg-gray-200"
                              >
                                <MdClose size={20} />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Tem certeza absoluta que deseja deleta essa
                                  imagem?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your account and remove
                                  your data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter className="flex-row items-center justify-end gap-3">
                                <AlertDialogAction
                                  className="bg-emerald-500 hover:bg-emerald-700"
                                  onClick={() =>
                                    deleteImg(image.imageName, image.imgID)
                                  }
                                >
                                  Confirmar
                                </AlertDialogAction>
                                <AlertDialogCancel className="bg-red-500 hover:bg-red-700 text-white hover:text-white m-0">
                                  Cancelar
                                </AlertDialogCancel>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
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
