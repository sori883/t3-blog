import type { ComponentPropsWithoutRef, FC } from 'react';

import NextLink from 'next/link';

export const Link: FC<ComponentPropsWithoutRef<'a'>> = ({ href, children }) => {
  if(href === undefined) return <span>{children}</span>

  return ( 
    href?.includes('http') ? 
    <a href={href} rel='noopener noreferrer' target='_blank' className='a-link no-underline inline-flex items-center break-all'>
      {children}
    </a>
      :
      <NextLink href={href}
        className='a-link no-underline inline-flex items-center break-all'
      >
        {children}
      </NextLink>
  );
};