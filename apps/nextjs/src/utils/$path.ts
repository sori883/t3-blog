const buildSuffix = (url?: {query?: Record<string, string>, hash?: string}) => {
  const query = url?.query;
  const hash = url?.hash;
  if (!query && !hash) return '';
  const search = query ? `?${new URLSearchParams(query)}` : '';
  return `${search}${hash ? `#${hash}` : ''}`;
};

export const pagesPath = {
  "about": {
    $url: (url?: { hash?: string }) => ({ pathname: '/about' as const, hash: url?.hash, path: `/about${buildSuffix(url)}` })
  },
  "client": {
    $url: (url?: { hash?: string }) => ({ pathname: '/client' as const, hash: url?.hash, path: `/client${buildSuffix(url)}` })
  },
  "privacypolicy": {
    $url: (url?: { hash?: string }) => ({ pathname: '/privacypolicy' as const, hash: url?.hash, path: `/privacypolicy${buildSuffix(url)}` })
  },
  "srv": {
    $url: (url?: { hash?: string }) => ({ pathname: '/srv' as const, hash: url?.hash, path: `/srv${buildSuffix(url)}` })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash, path: `/${buildSuffix(url)}` })
};

export type PagesPath = typeof pagesPath;
