'use client'
 
import { usePathname } from 'next/navigation'
import { Link } from "~/components/elements/link";
import { pagesPath } from "~/utils/$path";

export function Breadcrumb() {
    const pathname = usePathname();

    // 2階層以上に対応するため、
    // 表示用pathnameとリンク用pathnameを個別に生成する
    let tmp = "";
    const paths = pathname.split("/").map((item) => {
      if (item) {
        tmp += item + "/" // 階層ごとに連結する
        return {
          linkPath: tmp,
          displayPath: item
        }
      }
    })


    return (
      <div className="text-sm ui_breadcrumbs ml-2">
        <ul>
          <li>
            <Link href={pagesPath.$url().pathname}>
              home
            </Link>
          </li>
          {
            paths.map((item) => {
              if (!item) return
              return (
            <li key={item.linkPath}>
              <Link href={`/${item.linkPath}`}>{item.displayPath}</Link> 
            </li>
              )
            })
          }
        </ul>
      </div>
    );
}