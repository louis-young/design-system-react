import type { ReactNode } from "react";

interface LabelProps {
  children: ReactNode;
  htmlFor: string;
}

export const Label = ({ children, htmlFor }: LabelProps) => {
  return <label htmlFor={htmlFor}>{children}</label>;
};
