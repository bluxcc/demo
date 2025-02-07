import React from "react";
import clsx from "clsx";

import { RadiusValues } from "../../constants";

type ButtonProps = {
  rounded?: RadiusValues;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  active?: boolean;
};

const Button = ({
  children,
  rounded = "none",
  className,
  active,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "bg-white text-primary transition-colors",
        {
          "border-primary": active,
          "border-lightPurple": !active,
          "rounded-none": rounded === "none",
          "rounded-[4px]": rounded === "sm",
          "rounded-lg": rounded === "md",
          "rounded-xl": rounded === "lg",
          "rounded-[32px]": rounded === "full",
        },
        "border-2",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
