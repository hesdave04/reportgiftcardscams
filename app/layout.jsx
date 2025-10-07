export const metadata = {
  title: "Report Gift Card Scams",
  description: "Report and search suspected gift card misuse."
};

import "./globals.css";
import Nav from "./components/Nav";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <Nav />
        {children}
      </body>
    </html>
  );
}
