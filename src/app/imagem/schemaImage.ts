import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const useImageSchema = () => {
  const schema = z.object({
    description: z
      .string()
      .min(10, { message: "Insira uma descrição de pelo menos 10 caracteres" }),
    title: z
      .string()
      .min(3, { message: "Insira um titúlo de pelo menos 3 caracteres" }),
    image: z.any(),
  });

  type formDataProps = z.infer<typeof schema>;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<formDataProps>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(schema),
    defaultValues: {
      description: "",
      title: "",
      image: null,
    },
  });

  return { handleSubmit, register, errors, schema, reset };
};
