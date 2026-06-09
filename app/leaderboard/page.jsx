import LeaderboardClient from "./LeaderboardClient";

export const metadata = {
  title: "Scam Leaderboard — ScamComplaints",
  description:
    "Ranked leaderboard of scam activity by U.S. state, gift card brand, and financial institution. See where scams hit hardest and which payment methods scammers exploit most.",
  alternates: { canonical: "/leaderboard" },
};

export default function LeaderboardPage() {
  return <LeaderboardClient />;
}
