import MarketingNavbar from "@/components/MarketingNavbar";
import Footer from "@/components/Footer";

function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <MarketingNavbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
export default MarketingLayout;
