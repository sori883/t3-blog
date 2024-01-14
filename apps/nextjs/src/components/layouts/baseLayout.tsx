import { Breadcrumb } from "~/components/elements/breadcrumb";
import { Footer, Header, Sidebar } from "~/components/layouts";

export const BaseLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-base-200">
    <Header />
    <div className="mx-aut container">
      <Breadcrumb />
      <div className="container mx-auto my-12 grid min-h-screen grid-cols-1 gap-4 md:grid-cols-4">
        <div className="colspan-1 md:col-span-3">{children}</div>
        <div className="colspan-1">
          <Sidebar />
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export const ContentLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="h-full w-full bg-white px-10 py-8">{children}</div>
);
