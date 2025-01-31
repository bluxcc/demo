import React from "react";
import clsx from "clsx";

import { RadiosValues } from "../../constants";

type ButtonProps = {
  rounded?: RadiosValues;
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
          "rounded-[3.43px]": rounded === "sm",
          "rounded-lg": rounded === "md",
          "rounded-xl": rounded === "lg",
          "rounded-full": rounded === "full",
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
