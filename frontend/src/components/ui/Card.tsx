import type { HTMLAttributes, ReactNode } from "react";
import "./card.css";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  elevated?: boolean;
}

export function Card({
  children,
  elevated = false,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`sovereign-card ${
        elevated ? "sovereign-card--elevated" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}