import { z } from "zod";
import { useContext, useState } from "react";
import { AuthContext } from "~/context/context";
import { useLoginSchema } from "./schema/schemaLogin";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export const FormLogin = () => {
  const { signIn } = useContext(AuthContext);

  const [invisiblePassword, setInvisiblePassword] = useState(true);

  const { handleSubmit, schema, errors, register } = useLoginSchema();
  type formDataProps = z.infer<typeof schema>;

  const authUser = async (data: formDataProps) => {
    const { password, email } = data;

    await signIn(email, password);
  };

  function handleInvisiblePassword() {
    setInvisiblePassword(!invisiblePassword);
  }

  return (
    <Card className="w-[450px] h-full">
      <form
        onSubmit={handleSubmit(authUser)}
        autoComplete="off"
        className="flex flex-col gap-2"
      >
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Insira seu e-mail e senha para acessar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-center gap-3">
          <label className="flex flex-col">
            <div className="flex flex-col">
              <span>Email</span>
              <Input autoComplete="off" {...register("email")} type="text" />
              {errors.email && (
                <span className="text-red-700 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>
          </label>
          <label className="flex flex-col">
            <div className="flex flex-col relative">
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
          <Button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-400 w-full"
          >
            Entrar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
