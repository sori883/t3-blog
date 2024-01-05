import type { ComponentPropsWithoutRef, FC } from "react";

export const FormError: FC<ComponentPropsWithoutRef<"div">> = ({
  children,
  className,
}) => (
  <div
    role="alert"
    className={`bg-error rounded px-2 py-2 text-sm font-bold text-red-950 ${className}`}
  >
    <span>{children}</span>
  </div>
);
