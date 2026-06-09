// app/wall-of-shame/page.jsx
import WallOfShameClient from "@/app/components/WallOfShameClient";

export const metadata = {
  title: "Wall of Shame",
  description:
    "See the most reported scam types, platforms scammers exploit, and payment methods used in fraud — based on real victim reports.",
  alternates: { canonical: "/wall-of-shame" },
};

export default function WallOfShamePage() {
  return <WallOfShameClient />;
}
