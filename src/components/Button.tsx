import type { ComponentProps, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-sm cursor-pointer hover:opacity-75 transition-all",
  variants: {
    color: {
      primary: "text-white bg-primary",
      ghost: "text-dark-gray bg-none",
    },
  },
});

type ButtonVariants = VariantProps<typeof button>;
type ButtonAttributes = ComponentProps<"button">;
type ButtonAllProps = ButtonVariants & ButtonAttributes;

interface ButtonProps extends ButtonAllProps {
  children: ReactNode;
}

const Button = ({ children, color, ...props }: ButtonProps) => {
  return (
    <button className={button({ color })} {...props}>
      {children}
    </button>
  );
};

export default Button;
