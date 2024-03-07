import { ComponentProps, ReactNode } from "react";

interface rootProps extends ComponentProps<"div"> {
  children: ReactNode;
  Image: ReactNode;
  key: string;
}

export const Root = ({ Image, children, key }: rootProps) => {
  return (
    <div className="relative group" key={key}>
      {Image}
      <div className="absolute inset-0 bg-black rounded-lg  opacity-0 group-hover:opacity-50 transition duration-300"></div>
      {children}
    </div>
  );
};