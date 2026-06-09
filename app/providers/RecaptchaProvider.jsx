'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function RecaptchaProvider({ children }) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';
  // action and script props can be tuned as needed
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
        nonce: undefined
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
