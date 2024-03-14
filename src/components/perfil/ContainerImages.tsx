import { useRouter } from "next/navigation";

import Image from "next/image";
import { ImageComp } from "~/components/shared/image";
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
import { Button } from "../ui/button";
import { MdClose } from "react-icons/md";
import { ImageProps } from "~/app/@types/imagetype";

interface containerImagesProps {
  images: Array<ImageProps>;
  SavedAndCreated: boolean;
  deleteImg: (name: string, id: string) => void;
}

export function ContainerImages({
  SavedAndCreated,
  deleteImg,
  images,
}: containerImagesProps) {
  const { push } = useRouter();

  return (
    <div>
      <div className="w-full flex justify-center">
        {SavedAndCreated === true ? (
          <div className="flex flex-col items-center gap-4">
            <div>
              <Button variant={"destructive"} onClick={() => push("/imagem")}>
                Criar imagem
              </Button>
            </div>
            <div
              className={
                images.length > 0
                  ? "columns-7 xl:columns-5 md:columns-3 gap-4 mb-4"
                  : "gap-4 mb-4"
              }
            >
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
                              permanently delete your account and remove your
                              data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex-row items-center justify-end gap-3">
                            <AlertDialogAction
                              className="bg-emerald-500 hover:bg-emerald-700"
                              onClick={() =>
                                deleteImg(image.title, image.imgID)
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
  );
}
