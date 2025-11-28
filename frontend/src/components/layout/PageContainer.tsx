import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export const PageContainer = ({ children, className = "" }: PageContainerProps) => {
  return (
    <div className={`max-w-5xl mx-auto px-4 py-6 ${className}`}>
      {children}
    </div>
  );
};
