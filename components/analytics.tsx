"use client"

import Script from "next/script"
import { useConsent } from "./consent-provider"

const GA_ID = process.env.NEXT_PUBLIC_GA_ID
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID

/**
 * Google Analytics 4 + Microsoft Clarity.
 *
 * Privacy-first: the scripts are only injected once the visitor has explicitly
 * granted consent, so no analytics cookies are set beforehand (nFADP / GDPR).
 * IDs come from env vars — if they're unset, nothing renders.
 */
export default function Analytics() {
  const { consent } = useConsent()

  if (consent !== "granted") return null

  return (
    <>
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('consent', 'default', {
                ad_storage: 'granted',
                analytics_storage: 'granted'
              });
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {CLARITY_ID && (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>
      )}
    </>
  )
}
