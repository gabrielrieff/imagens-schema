import { ComponentProps, ReactNode } from "react";
import { cn } from "~/lib/utils";

interface imageFooterProps extends ComponentProps<"div"> {
  children: ReactNode;
}

export const ImageFooter = ({ children, className }: imageFooterProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-end justify-end opacity-0 group-hover:opacity-100 transition duration-300 mb-1 mr-1",
        className
      )}
    >
      {children}
    </div>
  );
};
