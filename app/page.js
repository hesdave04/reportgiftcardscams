import ReportForm from './components/ReportForm';
import Stream from './components/Stream';

export const metadata = {
  title: 'Gift Card Report',
  description: 'Report and search suspected gift card misuse.'
};

export default function HomePage() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
      <header style={{ margin: '12px 0 20px' }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>Gift Card Number Reporting</h1>
        <p style={{ color: '#555' }}>
          Submit details of a gift card you shared and to whom. Public stream shows only last 4 digits.
          Full numbers are encrypted and available via authenticated XML export for verified parties.
        </p>
      </header>

      <ReportForm onSubmitted={() => { /* optional hook */ }} />

      <h3 style={{ margin: '24px 0 12px', fontWeight: 700 }}>Recent Reports</h3>
      <Stream />

      <footer style={{ marginTop: 40, fontSize: 12, color: '#777' }}>
        <p>XML export: <code>/api/xml</code> — requires header <code>x-api-key: YOUR_XML_API_KEY</code>.</p>
      </footer>
    </main>
  );
}
