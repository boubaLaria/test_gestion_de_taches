import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-300">
        <div>
          <Navbar />
          <main className="mt-20 ">
            <div className="max-w-screen-xl mx-auto p-4 shadow-lg rounded-lg">
              {children}
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
