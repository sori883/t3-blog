import { Link } from "~/components/elements/link"
import { pagesPath } from "~/utils/$path";

export const Header= () => {
  return (
  <div className="ui_navbar bg-base-300">
  <div className="ui_navbar-start">
    <Link
      className="ui_btn ui_btn-ghost normal-case text-xl"
      href={pagesPath.$url().pathname}
    >
      daisyUI
    </Link>
  </div>
  <div className="ui_navbar-end">
    <Link className="ui_btn">Button</Link>
  </div>
</div>
);
}
