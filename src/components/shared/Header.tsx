"use client";
import { KeyboardEvent, useContext, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AuthContext } from "~/context/context";

import Link from "next/link";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IoMdSearch } from "react-icons/io";
import { filterImage } from "~/helpers/filterImage";
import { DropUser } from "./DropUser";

export const Header = () => {
  const { userAuth, setImages } = useContext(AuthContext);
  const { push } = useRouter();
  const path = usePathname();

  const [stringSeach, setStringSeach] = useState<string>("");

  async function search() {
    if (path !== "/") {
      push("/");
    }
    await filterImage(setImages, stringSeach);
  }

  function changePressKeyEntre(event: KeyboardEvent) {
    if (event.key === "Enter") {
      search();
    }
  }
  return (
    <header
      className={`flex items-center justify-around h-[80px] w-[90%] ms:w-[100%] max-w-[1200px] xl:mt-4 ${
        path === "/user" && "hidden"
      }`}
    >
      <div className="flex items-center gap-5">
        <Link
          href={"/"}
          className="flex items-center justify-center font-bold text-sm w-[30px] h-[30px] bg-red-600 hover:bg-red-400 text-white rounded-full"
        >
          IS
        </Link>

        <Button asChild className="sm:px-2 sm:text-xs">
          <Link href={"/"}>Página inicial</Link>
        </Button>

        <Button asChild className="ms:hidden">
          <Link href={"/imagem"}>Criar</Link>
        </Button>
      </div>

      <div className="flex w-[50%]">
        <Input
          type="search"
          placeholder="Pesquisar"
          className="rounded-r-none md:rounded-md"
          onChange={(e) => setStringSeach(e.target.value)}
          onKeyUp={changePressKeyEntre}
        />
        <Button className="rounded-l-none md:hidden" onClick={search}>
          <IoMdSearch size={30} />
        </Button>
      </div>

      {userAuth === undefined ? (
        <Button asChild variant={"outline"}>
          <Link href={"/user"}>Login</Link>
        </Button>
      ) : (
        <DropUser />
      )}
    </header>
  );
};
