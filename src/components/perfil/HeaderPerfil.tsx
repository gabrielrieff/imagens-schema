import { authUserModelProps } from "~/model/userModel";
import { Button } from "../ui/button";

interface headerPerfilProps {
  user: authUserModelProps;
  SavedAndCreated: boolean;
  toAlterSessionSavedAndCreated: () => void;
}

export function HeaderPerfil({
  user,
  SavedAndCreated,
  toAlterSessionSavedAndCreated,
}: headerPerfilProps) {
  return (
    <>
      <div className="flex items-center flex-col gap-4">
        <span className="w-28 h-28 rounded-full bg-zinc-200 flex items-center justify-center text-6xl font-semibold">
          {user?.firstName.substring(0, 1).toLocaleUpperCase()}
        </span>

        <span className="text-4xl">
          {user?.firstName} {user?.lastName}
        </span>

        <div className="flex items-center justify-center gap-1">
          <span className="flex items-center justify-center font-medium text-xs w-[20px] h-[20px] bg-gray-400 text-white rounded-full">
            IS
          </span>
          <span>@{user?.user}</span>
        </div>
      </div>

      <div>
        <Button variant={"default"}>Editar perfil</Button>
      </div>

      <div>
        <Button
          onClick={toAlterSessionSavedAndCreated}
          variant={`${SavedAndCreated ? "link" : "ghost"}`}
          className={`${SavedAndCreated ? "underline" : ""}`}
        >
          Criados
        </Button>
        <Button
          onClick={toAlterSessionSavedAndCreated}
          variant={`${!SavedAndCreated ? "link" : "ghost"}`}
          className={`${!SavedAndCreated ? "underline" : ""}`}
        >
          Salvos
        </Button>
      </div>
    </>
  );
}
