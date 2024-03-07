import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const useAddImageSchema = () => {
  const schema = z.object({
    description: z
      .string()
      .min(10, { message: "Insira uma descrição de pelo menos 10 caracteres" }),
    title: z
      .string()
      .min(3, { message: "Insira um titúlo de pelo menos 3 caracteres" }),
    image: z.instanceof(FileList),
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
      description: "",
      title: "",
      image: undefined,
    },
  });

  return { handleSubmit, register, errors, schema };
};
