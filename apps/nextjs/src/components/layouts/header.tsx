import { Link } from "~/components/elements/link"

export const Header= () => {
  return (
  <div className="ui_navbar bg-base-300">
  <div className="ui_navbar-start">
    <div className="ui_dropdown">
      <ul className="ui_menu ui_menu-sm ui_dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><Link>Item 1</Link></li>
        <li><Link>Item 2</Link></li>
        <li><Link>Item 3</Link></li>
      </ul>
    </div>
    <Link className="ui_btn ui_btn-ghost normal-case text-xl">daisyUI</Link>
  </div>
  <div className="ui_navbar-end">
    <Link className="ui_btn">Button</Link>
  </div>
</div>
);
}
