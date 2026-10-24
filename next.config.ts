import type { NextConfig } from "next";

/**
 * Content Security Policy.
 *
 * Rolled out in report-only mode first: violations land in the browser
 * console and nothing is blocked, so a directive that turns out to be too
 * tight cannot take the live site down. Flip CSP_REPORT_ONLY to false to
 * enforce it once the console is clean.
 *
 * `script-src` carries 'unsafe-inline' rather than a nonce. A nonce has to be
 * generated per request, which means every page becomes dynamically rendered;
 * these pages are prerendered and served from the edge cache today, and the
 * font-swap script in app/layout.tsx has to run inline before the first paint
 * for the metric-matched fallback to work at all. The policy still blocks
 * script loaded from any host outside the list below, which is the part that
 * matters for a site with no user-generated content.
 *
 * The third-party hosts are the ad and analytics stack: Meta Pixel, Google
 * Tag / GA4, Google Ads conversion tracking, and the Google Maps iframe on
 * /iletisim. Fonts are self-hosted by next/font, so no font CDN is needed;
 * fonts.gstatic.com is listed only so a hand-added <link> would not break.
 */
const CSP_REPORT_ONLY = false;

const META = ["https://connect.facebook.net", "https://www.facebook.com", "https://graph.facebook.com"];

const GOOGLE_TAG = [
  "https://www.googletagmanager.com",
  "https://www.google-analytics.com",
  "https://*.google-analytics.com",
  "https://*.analytics.google.com",
];

const GOOGLE_ADS = [
  "https://googleads.g.doubleclick.net",
  "https://td.doubleclick.net",
  "https://www.googleadservices.com",
  "https://googleadservices.com",
  "https://www.google.com",
  "https://www.google.com.tr",
];

const GOOGLE_MAPS = [
  "https://maps.google.com",
  "https://maps.googleapis.com",
  "https://maps.gstatic.com",
  "https://*.ggpht.com",
];

const csp = [
  `default-src 'self'`,
  `base-uri 'self'`,
  `object-src 'none'`,
  `frame-ancestors 'none'`,
  `form-action 'self'`,
  `script-src 'self' 'unsafe-inline' ${[...META, ...GOOGLE_TAG, ...GOOGLE_ADS].join(" ")}`,
  // Tailwind utilities are in a stylesheet, but inline style attributes are
  // used for progress widths and motion transforms.
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' data: blob: ${[...META, ...GOOGLE_TAG, ...GOOGLE_ADS, ...GOOGLE_MAPS].join(" ")}`,
  `font-src 'self' data: https://fonts.gstatic.com`,
  `connect-src 'self' ${[...META, ...GOOGLE_TAG, ...GOOGLE_ADS, "https://maps.googleapis.com"].join(" ")}`,
  // The Maps embed on /iletisim, plus the frames the tag manager and the ads
  // conversion pixels open for themselves.
  `frame-src 'self' ${[...GOOGLE_MAPS, "https://www.google.com", "https://www.googletagmanager.com", "https://td.doubleclick.net", "https://www.facebook.com"].join(" ")}`,
  `media-src 'self'`,
  `worker-src 'self' blob:`,
  `manifest-src 'self'`,
  // Browsers ignore this one in a report-only policy and say so in the
  // console, so it is only sent once the policy actually enforces.
  ...(CSP_REPORT_ONLY ? [] : [`upgrade-insecure-requests`]),
].join("; ");

/**
 * Features the site never uses. `autoplay` stays at 'self' because the media
 * slots autoplay muted video from this origin; `fullscreen` is left out
 * entirely so the Maps iframe keeps its fullscreen button.
 */
const permissionsPolicy = [
  "accelerometer=()",
  "autoplay=(self)",
  "browsing-topics=()",
  "camera=()",
  "display-capture=()",
  "encrypted-media=()",
  "geolocation=()",
  "gyroscope=()",
  "magnetometer=()",
  "microphone=()",
  "midi=()",
  "payment=()",
  "picture-in-picture=()",
  "screen-wake-lock=()",
  "usb=()",
].join(", ");

const nextConfig: NextConfig = {
  // The framework version is not something a visitor needs to know.
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: CSP_REPORT_ONLY ? "Content-Security-Policy-Report-Only" : "Content-Security-Policy",
            value: csp,
          },
          // Two years, matching what Vercel already sends. `preload` is left
          // off on purpose: submitting to the preload list is hard to undo
          // and is a separate, deliberate decision.
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          // Belt and braces with CSP frame-ancestors, which is report-only
          // for now and therefore not yet enforcing.
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: permissionsPolicy },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;
