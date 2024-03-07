import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const useRegisterSchema = () => {
  const schema = z.object({
    firstName: z
      .string()
      .min(3, { message: "Por gentileza informe seu primeiro nome." }),
    lastName: z
      .string()
      .min(3, { message: "Por gentileza informe seu sobrenome nome." }),
    user: z.string().min(2, { message: "Por gentileza informe um usuário." }),
    email: z
      .string()
      .min(1, { message: "Por gentileza informe um email." })
      .email({ message: "Por gentileza informe um email valido." }),
    password: z
      .string()
      .min(3, { message: "Por gentileza forneça uma senha." }),
  });

  type formDataProps = z.infer<typeof schema>;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formDataProps>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      user: "",
      email: "",
      password: "",
    },
  });

  return { handleSubmit, register, errors, schema };
};
