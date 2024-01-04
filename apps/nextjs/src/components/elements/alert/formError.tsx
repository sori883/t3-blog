import type { ComponentPropsWithoutRef, FC } from 'react';

export const FormError: FC<ComponentPropsWithoutRef<'div'>> = ({ children, className }) => (
<div role="alert" className={`px-2 py-2 bg-error text-sm font-bold text-red-950 rounded ${className}`}>
  <span>{children}</span>
</div>
);