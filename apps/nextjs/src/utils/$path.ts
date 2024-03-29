const buildSuffix = (url?: {
  query?: Record<string, string>;
  hash?: string;
}) => {
  const query = url?.query;
  const hash = url?.hash;
  if (!query && !hash) return "";
  const search = query ? `?${new URLSearchParams(query)}` : "";
  return `${search}${hash ? `#${hash}` : ""}`;
};

export const pagesPath = {
  _category: (category: string | number) => ({
    _post: (post: string | number) => ({
      $url: (url?: { hash?: string }) => ({
        pathname: "/[category]/[post]" as const,
        query: { category, post },
        hash: url?.hash,
        path: `/${category}/${post}${buildSuffix(url)}`,
      }),
    }),
    $url: (url?: { hash?: string }) => ({
      pathname: "/[category]" as const,
      query: { category },
      hash: url?.hash,
      path: `/${category}${buildSuffix(url)}`,
    }),
  }),
  about: {
    $url: (url?: { hash?: string }) => ({
      pathname: "/about" as const,
      hash: url?.hash,
      path: `/about${buildSuffix(url)}`,
    }),
  },
  contact: {
    $url: (url?: { hash?: string }) => ({
      pathname: "/contact" as const,
      hash: url?.hash,
      path: `/contact${buildSuffix(url)}`,
    }),
  },
  embed: {
    _type: (type: string | number) => ({
      $url: (url?: { hash?: string }) => ({
        pathname: "/embed/[type]" as const,
        query: { type },
        hash: url?.hash,
        path: `/embed/${type}${buildSuffix(url)}`,
      }),
    }),
  },
  privacypolicy: {
    $url: (url?: { hash?: string }) => ({
      pathname: "/privacypolicy" as const,
      hash: url?.hash,
      path: `/privacypolicy${buildSuffix(url)}`,
    }),
  },
  $url: (url?: { hash?: string }) => ({
    pathname: "/" as const,
    hash: url?.hash,
    path: `/${buildSuffix(url)}`,
  }),
};

export type PagesPath = typeof pagesPath;
