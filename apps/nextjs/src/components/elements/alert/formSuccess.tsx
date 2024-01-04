import type { ComponentPropsWithoutRef, FC } from 'react';

export const FormSuccess: FC<ComponentPropsWithoutRef<'div'>> = ({ children, className }) => (
<div role="alert" className={`px-2 py-2 bg-success text-sm font-bold rounded ${className}`}>
  <span>{children}</span>
</div>
);