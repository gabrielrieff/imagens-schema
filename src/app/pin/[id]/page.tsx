"use server";

import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import {
  IoArrowBackOutline,
  IoEllipsisHorizontalSharp,
  IoShareSocialOutline,
} from "react-icons/io5";
import { ImageProps } from "~/app/@types/imagetype";
import { Avatar } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { db } from "~/firebase/firebaseConnec";

export default async function Pin({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  let image: ImageProps = {
    imageName: "",
    author: "",
    title: "",
    userID: "",
    imgID: "",
    description: "",
    urlImage: "",
  };

  async function getImage() {
    const img = await getDoc(doc(db, "images", id));

    if (img.data() !== undefined) {
      image = img.data() as ImageProps;
    }
  }

  await getImage();
  return (
    <section className="flex justify-around w-full max-w-[1300px]  mt-24">
      <Button
        variant={"outline"}
        className="gap-2 fixed top-28 left-5 sm:p-1"
        asChild
      >
        <Link href={"/"}>
          <IoArrowBackOutline size={20} />
          <span className="lg:hidden">Voltar</span>
        </Link>
      </Button>
      <Card className="w-3/4 flex flex-row rounded-3xl ms:flex-col ms:mb-4">
        <div className="w-1/2 flex ms:w-full">
          <Image
            alt={image.imageName}
            src={image.urlImage}
            width={400}
            height={500}
            className="rounded-3xl rounded-e-none ms:rounded-3xl ms:w-full ms:rounded-b-none"
          />
        </div>

        <div className="flex flex-col gap-10 items-start w-1/2 p-4 ms:w-full">
          <div className="w-full flex ">
            <div className="w-1/2 flex justify-start">
              <Button variant={"ghost"}>
                <IoShareSocialOutline size={30} />
              </Button>
              <Button variant={"ghost"}>
                <IoEllipsisHorizontalSharp size={30} />
              </Button>
            </div>

            <div className="w-1/2 flex justify-end">
              <Button variant={"destructive"}>Salvar</Button>
            </div>
          </div>

          <p className="font-semibold text-xl">{image.title}</p>
          <div className="flex flex-col gap-10">
            <Label className="flex items-center gap-2">
              <Avatar className="w-14 h-14 rounded-full bg-gray-800 text-white flex items-center justify-center text-4xl">
                {image.author.substring(0, 1).toLocaleUpperCase()}
              </Avatar>
              <h1>{image.author}</h1>
            </Label>

            <Label>
              <span className="text-lg">Descrição</span>
              <p>{image.description}</p>
            </Label>
          </div>
        </div>
      </Card>
    </section>
  );
}
