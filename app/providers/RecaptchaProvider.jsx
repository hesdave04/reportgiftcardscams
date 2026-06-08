'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const RECAPTCHA_SITE_KEY = '6LcxxBItAAAAAK3KFFEmOJCtWhjOD6YCT4DQlKDR';

export default function RecaptchaProvider({ children }) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={RECAPTCHA_SITE_KEY}
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
