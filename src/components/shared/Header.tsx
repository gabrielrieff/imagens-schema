"use client";
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { AuthContext } from "~/context/context";

import Link from "next/link";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IoMdClose, IoMdSearch } from "react-icons/io";
import { filterImage } from "~/helpers/filterImage";
import { DropUser } from "./DropUser";
import { getImages } from "~/helpers/getImages";

export const Header = () => {
  const { userAuth, setImages, limitedImages } = useContext(AuthContext);
  const { push } = useRouter();
  const path = usePathname();

  const [stringSeach, setStringSeach] = useState<string>("");
  const [inputSearch, setInputSearch] = useState<string>("");
  const [typing, setTyping] = useState<boolean>(false);

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

  function typingInSearch() {
    if (inputSearch.trim()) {
      setStringSeach(inputSearch);
      setTyping(true);
    } else {
      setTyping(false);
    }
  }

  function cleanFilter() {
    getImages(setImages, limitedImages);
    setInputSearch("");
    setTyping(false);
  }

  useEffect(() => {
    typingInSearch();
  }, [inputSearch]);
  return (
    <header
      className={`flex items-center justify-around fixed bg-white h-[80px] w-[90%] ms:w-[100%] max-w-[1200px] z-50 ${
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

      <div className="relative w-[50%]">
        <button
          className="h-full absolute flex items-center justify-center top-0 left-0 px-2 border-r-[1px] border-slate-300"
          onClick={search}
        >
          <IoMdSearch size={20} />
        </button>
        <Input
          type="search"
          value={inputSearch}
          placeholder="Pesquisar"
          className="pl-11 pr-11"
          onChange={(event) => {
            setInputSearch(event.target.value);
          }}
          onKeyUp={changePressKeyEntre}
        />
        {typing && (
          <button
            className="flex items-center justify-center p-1 absolute focus:animate-pulse
             text-white bg-slate-950 rounded-full hover:animate-pulse top-[25%] right-1"
            onClick={cleanFilter}
          >
            <IoMdClose size={15} />
          </button>
        )}
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
