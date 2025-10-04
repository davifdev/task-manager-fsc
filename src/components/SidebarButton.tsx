import type { ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const sidebarButton = tv({
  base: "py-3 px-6 rounded-xl  flex items-center gap-2 text-sm",
  variants: {
    color: {
      primary: "bg-[var(--primary-opacity)]  text-primary",
      ghost: "bg-none text-dark-blue",
    },
  },
});

type SidebarButtonVariants = VariantProps<typeof sidebarButton>;

interface SidebarButtonProps extends SidebarButtonVariants {
  children: ReactNode;
}

const SidebarButton = ({ color, children }: SidebarButtonProps) => {
  return (
    <a href="#" className={sidebarButton({ color })}>
      {children}
    </a>
  );
};

export default SidebarButton;
