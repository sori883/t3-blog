import type { ComponentPropsWithoutRef, FC } from "react";

export const Button: FC<ComponentPropsWithoutRef<"button">> = ({
  type,
  children,
  className,
  disabled,
}) => {
  return (
    <button type={type} className={`ui_btn ${className}`} disabled={disabled}>
      {disabled && <span className="ui_loading ui_loading-spinner"></span>}
      {children}
    </button>
  );
};
