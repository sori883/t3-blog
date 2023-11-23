import { Suspense } from "react";
import { CategorySidebarList } from "~/components/category";

export const Sidebar= () => {
  return (
    <div className="bg-white p-2">
      <Suspense>
        <CategorySidebarList />
      </Suspense>
    </div>
);
}
