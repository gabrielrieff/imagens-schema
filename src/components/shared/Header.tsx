"use client";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "~/context/context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IoIosArrowDown, IoMdSearch } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";

export const Header = () => {
  const { userAuth, signOutUser } = useContext(AuthContext);
  const { push } = useRouter();
  const path = usePathname();

  return (
    <header
      className={`flex items-center justify-around h-[80px] w-[90%] max-w-[1200px] ${
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

        <Button asChild>
          <Link href={"/"}>Página inicial</Link>
        </Button>

        <Button asChild>
          <Link href={"/imagem"}>Criar</Link>
        </Button>
      </div>

      <div className="flex w-[50%]">
        <Input type="search" className="rounded-r-none" />
        <Button className="rounded-l-none">
          <IoMdSearch size={30} />
        </Button>
      </div>

      {userAuth === undefined ? (
        <Button asChild variant={"outline"}>
          <Link href={"/user"}>Login</Link>
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center">
            <span
              className="flex items-center justify-center w-[30px] h-[30px] p-4 
          bg-slate-300 hover:bg-accent rounded-full font-bold text-sm"
            >
              {userAuth.name.substring(0, 1).toLocaleUpperCase()}
            </span>
            <IoIosArrowDown size={20} />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="flex flex-col w-ful">
            <DropdownMenuLabel>Usuario</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => push("/perfil")}
            >
              Perfil
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => push("/imagem")}
            >
              Criar
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="cursor-pointer focus:bg-red-100"
              onClick={signOutUser}
            >
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
};
