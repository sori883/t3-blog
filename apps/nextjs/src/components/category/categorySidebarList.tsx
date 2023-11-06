import { api } from "~/utils/server";
import { Link } from "~/components/elements/link";

/*
@TODO
pagesPath機能しない
see
https://nextjs.org/docs/messages/app-dir-dynamic-href
*/

export async function CategorySidebarList() {
  const categories = await api.category.all.query();

  if (categories.length === 0) {
    return (
      <div className="relative flex w-full flex-col gap-4">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10">
        <p className="text-2xl font-bold text-white">No category yet</p>
      </div>
    </div>
    );
  }

  return (
    <ul className="ui_menu ui_rounded-box w-full">
      <li className="ui_menu-title">Category</li>
      {categories.map((c) => (
        <li key={c.id}>
          <Link href={`/post/${c.slug}/`}>
            {c.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}