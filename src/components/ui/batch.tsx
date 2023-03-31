import { FC } from "react";

interface BatchProps {
  children: React.ReactNode;
}

const Batch: FC<BatchProps> = ({ children }) => {
  return (
    <span className="rounded-md bg-teal-100 px-1.5 py-0.5 text-xs no-underline group-hover:no-underline dark:text-slate-900">
      {children}
    </span>
  );
};

export default Batch;
