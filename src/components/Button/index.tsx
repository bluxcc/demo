import React from "react";
import clsx from "clsx";

import { RadiusValues } from "../../constants";

type ButtonProps = {
  rounded?: RadiusValues;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
};

const Button = ({
  children,
  rounded = "none",
  className,
  active,
  onClick,
  disabled,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={clsx(
        "bg-white text-primary transition-colors",
        {
          "border-primary": active,
          "border-lightPurple": !active,
          "!text-[#999999] !border-[#B3B3B3]": disabled,
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
