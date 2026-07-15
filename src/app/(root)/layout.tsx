import StreamClientProvider from "@/components/providers/StreamClientProvider";
import Navbar from "@/components/Navbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <StreamClientProvider>
      <div className="min-h-screen">
        <Navbar />
        <main className="px-4 sm:px-6 lg:px-8">{children}</main>
      </div>
    </StreamClientProvider>
  );
}
export default Layout;
