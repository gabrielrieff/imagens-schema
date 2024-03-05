import { z } from "zod";
import { useRegisterSchema } from "./schema/schemeRegister";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { AuthContext } from "~/context/context";
import { useContext } from "react";

export const FormRegister = () => {
  const { createUser } = useContext(AuthContext);

  const { handleSubmit, schema, errors, register } = useRegisterSchema();
  type formDataProps = z.infer<typeof schema>;

  const registerUser = async (data: formDataProps) => {
    const { email, name, password, user } = data;

    await createUser({ email, name, password, user });
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(registerUser)}
      className="flex flex-col gap-2"
    >
      <h1>Cadastre-se</h1>
      <label className="flex flex-col">
        <div className="flex flex-col">
          <span>Nome</span>
          <Input autoComplete="off" {...register("name")} type="text" />
          {errors.name && (
            <span className="text-red-700 font-semibold">
              {errors.name.message}
            </span>
          )}
        </div>
      </label>

      <label className="flex flex-col">
        <div className="flex flex-col">
          <span>Usuário</span>
          <Input autoComplete="off" {...register("user")} type="text" />
          {errors.user && (
            <span className="text-red-700 font-semibold">
              {errors.user.message}
            </span>
          )}
        </div>
      </label>

      <label className="flex flex-col">
        <div className="flex flex-col">
          <span>E-mail</span>
          <Input autoComplete="off" {...register("email")} type="email" />
          {errors.email && (
            <span className="text-red-700 font-semibold">
              {errors.email.message}
            </span>
          )}
        </div>
      </label>

      <label className="flex flex-col">
        <div className="flex flex-col">
          <span>Senha</span>
          <Input autoComplete="off" {...register("password")} type="password" />
          {errors.password && (
            <span className="text-red-700 font-semibold">
              {errors.password.message}
            </span>
          )}
        </div>
      </label>

      <Button type="submit">Cadastrar</Button>
    </form>
  );
};
