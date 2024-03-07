"use client";

import { useEffect, useState } from "react";

import { loadImages } from "~/helpers/loadImages";
import { getImages } from "~/helpers/getImages";

import Image from "next/image";
import { ImageComp } from "../components/shared/image";
import { Button } from "~/components/ui/button";
import { FaDownload } from "react-icons/fa6";

import { imagesProps } from "./@types/imagetype";

export default function Home() {
  const [arrayImages, setArrayImages] = useState<imagesProps[]>([]);

  useEffect(() => {
    getImages(setArrayImages);
  }, []);

  useEffect(() => {
    loadImages(setArrayImages);
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
              <ImageComp.Root
                key={image.imgID}
                Image={
                  <Image
                    src={image.urlImage}
                    width={200}
                    height={250}
                    alt={image.title}
                    className="rounded-lg mb-3 w-full bg-no-repeat"
                  />
                }
              >
                <ImageComp.ImageHeader>
                  <span>Criador: {image.author}</span>
                </ImageComp.ImageHeader>

                <ImageComp.ImageFooter>
                  <Button
                    variant={"ghost"}
                    className="bg-white h-[30px] p-2 rounded-full hover:bg-gray-200"
                  >
                    <FaDownload size={15} />
                  </Button>
                </ImageComp.ImageFooter>
              </ImageComp.Root>
            ))}
          </section>
        )}
      </main>
    </>
  );
}
