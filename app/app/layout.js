export const metadata = {
  title: "Gift Card Reporter",
  description: "Report and search suspected gift card misuse."
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
