"use client";

import { useContext, useEffect, useState } from "react";

import Image from "next/image";
import { ImageComp } from "../components/shared/image";
import { Button } from "~/components/ui/button";
import { FaDownload, FaSpinner } from "react-icons/fa6";

import { AuthContext } from "~/context/context";

export default function Home() {
  const { images, limitedImages, setLimitedImages } = useContext(AuthContext);

  const [loadingImages, setLoadingImages] = useState(true);

  function handleMaxImage() {
    setLoadingImages(false);

    setLimitedImages(limitedImages + 2);
  }

  useEffect(() => {
    setTimeout(() => {
      setLoadingImages(true);
    }, 1000);
  }, [images]);

  return (
    <>
      <main className="flex flex-col justify-between items-center h-full gap-7 xl:px-4 mb-4">
        {images.length <= 0 ? (
          <section className="h-full flex items-center">
            <p>Não encontramos imagens na base de dados</p>
          </section>
        ) : (
          <>
            <section className="columns-6 xl:columns-4 md:columns-3 sm:columns-2 gap-4 max-w-[1200px]">
              {images.map((image) => (
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

            {limitedImages === images.length ? (
              <Button
                variant={"destructive"}
                className={`w-[70%] `}
                onClick={handleMaxImage}
              >
                {loadingImages === true ? (
                  <>Buscar por mais images</>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Carregando mais imagens
                    <FaSpinner
                      size={25}
                      className={`${!loadingImages && "animate-spin"}`}
                    />
                  </span>
                )}
              </Button>
            ) : (
              <Button variant={"default"} className={`w-[70%]`} disabled>
                Não há mais imagens no banco de dados
              </Button>
            )}
          </>
        )}
      </main>
    </>
  );
}
