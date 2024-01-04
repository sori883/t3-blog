"use client";
import { useSearchParams, usePathname } from 'next/navigation';
import { Link } from "~/components/elements/link";
import { PER_PAGE } from "~/components/elements/pagination"

const range = (start: number, end: number) =>
  [...Array<number>(end - start + 1)].map((_, i) => start + i);


export function Pagination(props: {
  totalCount: number;
}) {
  // 現時点のページを取得
  const searchParams = useSearchParams()
  const currentPage = searchParams.get("page") ? Number(searchParams.get("page")) :  1
  // 表示されてるパスを取得する
  const pathname = usePathname()

    return (
    <div className="ui_join">
      {
        range(1, Math.ceil(props.totalCount / PER_PAGE)).map((number, index) => (
          <button
            key={index}
            className={`ui_join-item ui_btn px-0 hover:bg-base-200 ${currentPage !== number ? "ui_btn-active" : ""}`}
          >
            <Link
              href={number === 1 ? `${pathname}` : `${pathname}?page=${number}`}
              className="inline-block p-4"
            >
              {number}
            </Link>
            </button>
        ))
      }
    </div>
    );
}