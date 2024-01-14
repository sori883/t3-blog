import { Link } from "~/components/elements/link";
import { pagesPath } from "~/utils/$path";

export const Header = () => {
  return (
    <div className="ui_navbar bg-white">
      <div className="ui_navbar-start">
        <Link
          className="ui_btn ui_btn-ghost text-xl normal-case"
          href={pagesPath.$url().pathname}
        >
          daisyUI
        </Link>
      </div>
    </div>
  );
};
