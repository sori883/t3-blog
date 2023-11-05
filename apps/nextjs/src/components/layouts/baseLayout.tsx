import { Header, Footer, Sidebar } from "~/components/layouts";

export const BaseLayout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <Header />
    <div className="my-12 container mx-auto min-h-screen grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="colspan-1 md:col-span-3">
        {children}
      </div>
      <div className="colspan-1 bg-white">
      <Sidebar />
      </div>
    </div>
    <Footer />
  </div>
);

export const ContentLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full h-full border-2 p-4 bg-white">
    {children}
  </div>
);
