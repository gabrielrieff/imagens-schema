import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "~/context/context";

export const DropUser = () => {
  const { userAuth, signOutUser } = useContext(AuthContext);

  const { push } = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center">
        <span
          className="flex items-center justify-center w-[30px] h-[30px] p-4 
        bg-slate-300 rounded-full font-bold text-sm"
        >
          {userAuth?.firstName.substring(0, 1).toLocaleUpperCase()}
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
  );
};
