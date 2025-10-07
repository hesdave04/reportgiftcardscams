'use client';

export default function AnnouncementBar() {
  return (
    <div className="w-full bg-slate-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-2 text-center text-sm">
        Made by{' '}
        <a
          href="https://www.socialcatfish.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline decoration-white/30 underline-offset-4 hover:decoration-white"
        >
          SocialCatfish.com
        </a>{' '}
        with <span role="img" aria-label="love">❤️</span>
      </div>
    </div>
  );
}
