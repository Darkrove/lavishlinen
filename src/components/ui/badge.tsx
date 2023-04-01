import { FC } from "react";

interface BadgeProps {
  children: React.ReactNode;
}

const Badge: FC<BadgeProps> = ({ children }) => {
  return (
    <span className="rounded-md bg-teal-100 px-1.5 py-0.5 text-xs no-underline group-hover:no-underline dark:text-slate-900">
      {children}
    </span>
  );
};

export default Badge;
