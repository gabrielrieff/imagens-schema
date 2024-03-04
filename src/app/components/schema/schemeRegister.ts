import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const useRegisterSchema = () => {
  const schema = z.object({
    name: z.string().min(3, { message: "Por gentileza informe um nome" }),
    user: z.string().min(2, { message: "Por gentileza informe um usuário" }),
    email: z
      .string()
      .min(1, { message: "Por gentileza informe um email" })
      .email({ message: "Por gentileza informe um email valido" }),
    passaword: z
      .string()
      .min(3, { message: "Por gentileza forneça uma senha" }),
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
      name: "",
      user: "",
      email: "",
      passaword: "",
    },
  });

  return { handleSubmit, register, errors, schema };
};
