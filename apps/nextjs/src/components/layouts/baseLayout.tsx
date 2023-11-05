import { Header, Footer } from "~/components/layouts";
import { Link } from "~/components/elements/link"

export const BaseLayout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <Header />
    <div className="my-12 container mx-auto min-h-screen grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="colspan-1 md:col-span-3">
        {children}
      </div>
      <div className="colspan-1 bg-base-200">
      <ul className="ui_menu bg-base-200 ui_rounded-box w-full">
        <li className="ui_menu-title">Title</li>
        <li><Link>Item 1</Link></li>
        <li><Link>Item 2</Link></li>
        <li><Link>Item 3</Link></li>
      </ul>
      </div>
    </div>
    <Footer />
  </div>
);
