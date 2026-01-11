import TanstackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "@/styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <TanstackProvider>
          <Header />

          <div className="container mx-auto px-4 py-6">
            {children}
          </div>

          <Footer />
        </TanstackProvider>
      </body>
    </html>
  );
}

