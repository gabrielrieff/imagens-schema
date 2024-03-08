import { ComponentProps, ReactNode } from "react";

interface rootProps extends ComponentProps<"div"> {
  children: ReactNode;
  Image: ReactNode;
}

export const Root = ({ Image, children }: rootProps) => {
  return (
    <div className="relative group mb-4">
      {Image}
      <div className="absolute inset-0 bg-gray-700 rounded-lg  opacity-0 group-hover:opacity-50 transition duration-300"></div>
      {children}
    </div>
  );
};
