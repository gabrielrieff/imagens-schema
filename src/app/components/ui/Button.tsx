import { ComponentProps, ReactNode } from "react";

interface buttonProps extends ComponentProps<"button"> {
  children: ReactNode;
}

export const Button = ({ children, ...rest }: buttonProps) => {
  return (
    <button
      {...rest}
      className="py-2 px-3 bg-emerald-400 hover:bg-emerald-500 rounded-md text-white font-bold"
    >
      {children}
    </button>
  );
};
