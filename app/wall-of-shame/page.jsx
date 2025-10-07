import WallOfShameView from '../components/WallOfShameView';

export const metadata = {
  title: 'Wall of Shame | Report Gift Card Scams',
  description: 'Top gift card brands used in scams and top retailers selling scam gift cards.',
};

export default function WallOfShamePage() {
  return (
    <div className="mx-auto max-w-6xl py-8">
      <h1 className="mb-3 text-3xl font-bold text-slate-900">Wall of Shame</h1>
      <p className="mb-6 text-slate-600">
        Ranked lists based on recent reports: which gift card brands are most abused and which retailers are selling the most scam-related cards.
      </p>
      <WallOfShameView />
    </div>
  );
}
