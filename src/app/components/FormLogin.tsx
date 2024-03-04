import { z } from "zod";
import { useLoginSchema } from "./schema/schemaLogin";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConnec";

export const FormLogin = () => {
  const { handleSubmit, schema, errors, register } = useLoginSchema();
  type formDataProps = z.infer<typeof schema>;

  const authUser = async (data: formDataProps) => {
    const { passaword, email } = data;

    await signInWithEmailAndPassword(auth, email, passaword)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
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
          <Input autoComplete="off" {...register("passaword")} type="text" />
          {errors.passaword && (
            <span className="text-red-700 font-semibold">
              {errors.passaword.message}
            </span>
          )}
        </div>
      </label>
      <Button type="submit">Entrar</Button>
    </form>
  );
};
