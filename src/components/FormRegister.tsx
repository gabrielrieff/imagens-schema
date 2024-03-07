import { z } from "zod";
import { AuthContext } from "~/context/context";
import { useContext, useState } from "react";

import { useRegisterSchema } from "./schema/schemeRegister";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export const FormRegister = () => {
  const { createUser } = useContext(AuthContext);

  const [invisiblePassword, setInvisiblePassword] = useState(true);

  const { handleSubmit, schema, errors, register } = useRegisterSchema();
  type formDataProps = z.infer<typeof schema>;

  const registerUser = async (data: formDataProps) => {
    const { email, firstName, lastName, password, user } = data;

    await createUser({ email, firstName, lastName, password, user });
  };

  function handleInvisiblePassword() {
    setInvisiblePassword(!invisiblePassword);
  }

  return (
    <Card className="w-[450px] h-full">
      <form
        autoComplete="off"
        onSubmit={handleSubmit(registerUser)}
        className="flex flex-col gap-2"
      >
        <CardHeader>
          <CardTitle>Cadastre-se</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          <label className="flex gap-2">
            <div className="flex flex-col">
              <span>Nome</span>
              <Input
                autoComplete="off"
                {...register("firstName")}
                type="text"
              />
              {errors.firstName && (
                <span className="text-red-700 text-xs">
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <span>Sobrenome</span>
              <Input autoComplete="off" {...register("lastName")} type="text" />
              {errors.lastName && (
                <span className="text-red-700 text-xs">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </label>

          <label className="flex flex-col">
            <div className="flex flex-col">
              <span>Usuário</span>
              <Input autoComplete="off" {...register("user")} type="text" />
              {errors.user && (
                <span className="text-red-700 text-xs">
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
                <span className="text-red-700 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>
          </label>

          <label className="flex flex-col">
            <div className="flex flex-col">
              <span>Senha</span>
              <div className="flex">
                <Input
                  className="rounded-r-none"
                  autoComplete="off"
                  {...register("password")}
                  type={`${invisiblePassword ? "password" : "text"}`}
                />
                <Button
                  type="button"
                  className="rounded-l-none px-3 bg-zinc-700"
                  onClick={handleInvisiblePassword}
                >
                  {invisiblePassword === true ? (
                    <IoEyeOutline size={25} />
                  ) : (
                    <IoEyeOffOutline size={25} />
                  )}
                </Button>
              </div>
              {errors.password && (
                <span className="text-red-700 text-xs">
                  {errors.password.message}
                </span>
              )}
            </div>
          </label>
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full">
            Cadastrar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
