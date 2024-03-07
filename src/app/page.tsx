"use client";
import { AuthContext } from "~/context/context";

import { db } from "~/firebase/firebaseConnec";
import { collection, onSnapshot } from "firebase/firestore";
import { imagesProps } from "./@types/imagetype";

import { useContext, useEffect, useState } from "react";

import Image from "next/image";
import { Header } from "~/components/shared/Header";
import { Button } from "~/components/ui/button";
import { FaDownload } from "react-icons/fa6";
import { getImages } from "~/helpers/getImages";
import { downloadImage } from "~/helpers/downloadImage";

export default function Home() {
  const { userAuth } = useContext(AuthContext);

  const [arrayImages, setArrayImages] = useState<imagesProps[]>([]);

  useEffect(() => {
    getImages(setArrayImages);
  }, []);

  useEffect(() => {
    const loadImages = async () => {
      const unsub = onSnapshot(collection(db, "images"), (snapshot) => {
        getImages(setArrayImages);
      });
    };

    loadImages();
  }, []);

  return (
    <>
      <main className="flex flex-col items-center h-screen gap-7">
        {arrayImages.length <= 0 ? (
          <section className="h-full flex items-center">
            <p>Não encontramos imagens na base de dados</p>
          </section>
        ) : (
          <section className="columns-6 gap-3 max-w-[1200px]">
            {arrayImages.map((image) => (
              <div className="relative group" key={image.imgID}>
                <Image
                  src={image.urlImage}
                  width={200}
                  height={250}
                  alt=""
                  className="rounded-lg mb-3 w-full bg-no-repeat"
                />
                <div className="absolute inset-0 bg-black rounded-lg  opacity-0 group-hover:opacity-50 transition duration-300"></div>

                <div className="absolute inset-0 flex items-start justify-start text-white text-xs opacity-0 group-hover:opacity-100 transition duration-300 mt-1 ml-1">
                  {image.title}
                </div>

                <div className="absolute inset-0 flex items-end justify-end opacity-0 group-hover:opacity-100 transition duration-300 mb-1 mr-1">
                  <Button
                    onClick={() => downloadImage(image.urlImage, image.title)}
                    variant={"ghost"}
                    className="bg-white h-[30px] p-2 rounded-full hover:bg-gray-200"
                  >
                    <FaDownload size={15} />
                  </Button>
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
    </>
  );
}
