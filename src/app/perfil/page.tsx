"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "~/context/context";

import { getImagesUser } from "~/helpers/getImagesUser";
import { deleteImage } from "~/helpers/deleteImage";

import { HeaderPerfil } from "~/components/perfil/HeaderPerfil";
import { ContainerImages } from "~/components/perfil/ContainerImages";

import { ImageProps } from "../@types/imagetype";
import { FaSpinner } from "react-icons/fa6";

export default function Perfil() {
  const { userAuth } = useContext(AuthContext);

  const [SavedAndCreated, setSavedAndCreated] = useState(true);
  const [images, setImages] = useState<ImageProps[]>([]);

  function toAlterSessionSavedAndCreated() {
    setSavedAndCreated(!SavedAndCreated);
  }

  useEffect(() => {
    if (userAuth === undefined) return;

    getImagesUser(setImages, userAuth.UserID);
  }, [userAuth]);

  function deleteImg(name: string, id: string) {
    deleteImage(name, id);

    const arrayFilter = images.filter((item) => item.imgID !== id);
    setImages(arrayFilter);
  }
  return (
    <main className="flex flex-col items-center h-screen gap-7 mt-24">
      <section
        className={`${
          userAuth === undefined ? "w-full h-full" : "max-w-[1200px]"
        } flex items-center justify-center flex-col gap-10`}
      >
        {userAuth === undefined ? (
          <div className="">
            <FaSpinner className="animate-spin" size={60} />
          </div>
        ) : (
          <>
            <HeaderPerfil
              SavedAndCreated={SavedAndCreated}
              toAlterSessionSavedAndCreated={toAlterSessionSavedAndCreated}
              user={userAuth!}
            />

            <ContainerImages
              SavedAndCreated={SavedAndCreated}
              deleteImg={deleteImg}
              images={images}
            />
          </>
        )}
      </section>
    </main>
  );
}
