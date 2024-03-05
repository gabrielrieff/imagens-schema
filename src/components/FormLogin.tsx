import { z } from "zod";
import { useLoginSchema } from "./schema/schemaLogin";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useContext } from "react";
import { AuthContext } from "~/context/context";

export const FormLogin = () => {
  const { signIn } = useContext(AuthContext);

  const { handleSubmit, schema, errors, register } = useLoginSchema();
  type formDataProps = z.infer<typeof schema>;

  const authUser = async (data: formDataProps) => {
    const { password, email } = data;

    await signIn(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit(authUser)}
      autoComplete="off"
      className="flex flex-col gap-2"
    >
      <h1>Login</h1>
      <label className="flex flex-col">
        <div className="flex flex-col">
          <span>Email</span>
          <Input autoComplete="off" {...register("email")} type="text" />
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
          <Input autoComplete="off" {...register("password")} type="text" />
          {errors.password && (
            <span className="text-red-700 font-semibold">
              {errors.password.message}
            </span>
          )}
        </div>
      </label>
      <Button type="submit">Entrar</Button>
    </form>
  );
};
