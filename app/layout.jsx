import "./globals.css";
import Nav from "@/app/components/Nav";

export const metadata = {
  title: "Scam Complaints",
  description: "Report scams in one place; help the experts stop them.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
