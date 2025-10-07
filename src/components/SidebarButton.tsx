import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
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
  href: string;
}

const SidebarButton = ({ children, href }: SidebarButtonProps) => {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        sidebarButton({ color: isActive ? "primary" : "ghost" })
      }
    >
      {children}
    </NavLink>
  );
};

export default SidebarButton;
