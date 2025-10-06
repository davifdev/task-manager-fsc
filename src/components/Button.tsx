import type { ComponentProps, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "flex items-center justify-center gap-2 font-semibold rounded-md cursor-pointer hover:opacity-75 transition-all",
  variants: {
    color: {
      primary: "text-white bg-primary",
      secondary: "bg-light-gray text-dark-blue",
      ghost: "text-dark-gray bg-none",
      danger: "text-white bg-danger",
    },
    size: {
      small: "px-3 py-1 text-xs",
      large: "px-9 py-2 text-sm",
    },
    width: {
      full: "w-full",
    },
    disabled: {
      true: "opacity-70 cursor-not-allowed hover:opacity-70",
    },
  },
});

type ButtonVariants = VariantProps<typeof button>;
type ButtonAttributes = ComponentProps<"button">;
type ButtonAllProps = ButtonVariants & ButtonAttributes;

interface ButtonProps extends ButtonAllProps {
  children: ReactNode;
}

const Button = ({ children, color, size, width, ...props }: ButtonProps) => {
  return (
    <button
      className={button({ color, size, width, disabled: props.disabled })}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
