import * as React from "react";
import { InputHTMLAttributes } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        className="py-2 px-3 rounded-md text-black bg-white border border-spacing-[1px] border-zinc-700"
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
export { Input };
