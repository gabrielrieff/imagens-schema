import { z } from "zod";
import { useRegisterSchema } from "./schema/schemeRegister";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { auth } from "../firebase/firebaseConnec";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const FormRegister = () => {
  const { handleSubmit, schema, errors, register } = useRegisterSchema();
  type formDataProps = z.infer<typeof schema>;

  const registerUser = async (data: formDataProps) => {
    const { email, name, passaword, user } = data;

    await createUserWithEmailAndPassword(auth, email, passaword)
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
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
          <Input
            autoComplete="off"
            {...register("passaword")}
            type="password"
          />
          {errors.passaword && (
            <span className="text-red-700 font-semibold">
              {errors.passaword.message}
            </span>
          )}
        </div>
      </label>

      <Button type="submit">Cadastrar</Button>
    </form>
  );
};
