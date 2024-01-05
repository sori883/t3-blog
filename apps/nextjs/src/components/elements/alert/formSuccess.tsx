import type { ComponentPropsWithoutRef, FC } from "react";

export const FormSuccess: FC<ComponentPropsWithoutRef<"div">> = ({
  children,
  className,
}) => (
  <div
    role="alert"
    className={`bg-success rounded px-2 py-2 text-sm font-bold ${className}`}
  >
    <span>{children}</span>
  </div>
);
