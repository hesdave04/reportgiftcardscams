// app/layout.jsx
export const metadata = {
  title: 'Gift Card Report',
  description: 'Report and search suspected gift card misuse.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
