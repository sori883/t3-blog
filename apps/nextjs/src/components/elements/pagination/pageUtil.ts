// ページに表示する記事の数
export const PER_PAGE = 10;

export const makeLimitOffset = (page: string | undefined) => {
  const currentPage = page !== undefined ? Number(page) : 1;
  const limit = PER_PAGE;
  // 1ページ目はoffset = 0からスタート
  // 2ページは(2-1) = 1 * 10 = offset 10
  const offset = currentPage === 1 ? 0 : (currentPage - 1) * PER_PAGE;

  return {
    limit,
    offset,
  };
};
