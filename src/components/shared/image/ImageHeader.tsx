import { ComponentProps, ReactNode } from "react";
import { cn } from "~/lib/utils";

interface imageHeaderProps extends ComponentProps<"div"> {
  children: ReactNode;
}

export const ImageHeader = ({ children, className }: imageHeaderProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 flex justify-start text-white text-xs opacity-0 group-hover:opacity-100 transition duration-300 mt-1 ml-1",
        className
      )}
    >
      {children}
    </div>
  );
};
