import { Header, Footer, Sidebar } from "~/components/layouts";
import { Breadcrumb } from "~/components/elements/breadcrumb"

export const BaseLayout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <Header />
    <div className="container mx-auto px-28">
      <Breadcrumb />
      <div className="my-12 container mx-auto min-h-screen grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="colspan-1 md:col-span-3">
          {children}
        </div>
        <div className="colspan-1">
        <Sidebar />
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export const ContentLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full h-full py-8 px-10 bg-white">
    {children}
  </div>
);
