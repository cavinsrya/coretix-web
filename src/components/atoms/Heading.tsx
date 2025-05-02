import type { ReactNode } from "react";

type HeadingProps = {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
};

export default function Heading({
  children,
  level = 2,
  className = "",
}: HeadingProps) {
  const baseStyles = "font-bold";

  const sizeStyles = {
    1: "text-3xl",
    2: "text-xl",
    3: "text-lg",
    4: "text-base",
    5: "text-sm",
    6: "text-xs",
  };

  const headingClasses = `${baseStyles} ${sizeStyles[level]} ${className}`;

  switch (level) {
    case 1:
      return <h1 className={headingClasses}>{children}</h1>;
    case 2:
      return <h2 className={headingClasses}>{children}</h2>;
    case 3:
      return <h3 className={headingClasses}>{children}</h3>;
    case 4:
      return <h4 className={headingClasses}>{children}</h4>;
    case 5:
      return <h5 className={headingClasses}>{children}</h5>;
    case 6:
      return <h6 className={headingClasses}>{children}</h6>;
    default:
      return <h2 className={headingClasses}>{children}</h2>;
  }
}
