const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const ContentSecurityPolicy = `
  default-src 'self';
	connect-src * ws: wss:;
	frame-src 'self' giscus.app https://static.line-scdn.net https://api.line.me;
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app *.google-analytics.com *.google.com *.line.me *.static.line-scdn.net https://static.line-scdn.net https://api.line.me;
	media-src * 'none';
	font-src 'self' 'unsafe-inline' *.googleapis.com *.gstatic.com;
  style-src 'self' 'unsafe-inline' *.googleapis.com *.gstatic.com;
	img-src 'self' data: content: blob: *.w3.org;
`;

const securityHeaders = [
  {
    key: "Access-Control-Allow-Credentials",
    value: "true",
  },
  {
    key: "Access-Control-Allow-Origin",
    value: "*",
  },
  {
    key: "Access-Control-Allow-Headers",
    value:
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Language, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Origin, Authorization, Upgrade-Insecure-Requests, baggage, x-content-type-options, x-line-request-id",
  },
  {
    key: "Access-Control-Allow-Methods",
    value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "sameorigin",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "geolocation=(*), camera=(self), fullscreen=(*), autoplay=(*)",
  },
  {
    key: "Server",
    value: "OHServer",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
  {
    key: "Cache-Control",
    value: "public, max-age=31536000, must-revalidate",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  pageExtensions: ["js", "jsx", "md", "mdx"],
  eslint: {
    dirs: ["pages", "components", "lib", "layouts", "scripts"],
  },
  images: {
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ["127.0.0.1", "localhost"],
  },
  trailingSlash: true,
  optimizeFonts: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/getrichmenu",
        destination: "https://api.line.me/v2/bot/user/all/richmenu",
      },
      {
        source: "/api/addrichmenu",
        destination: "https://api.line.me/v2/bot/richmenu/bulk/link",
      },
      {
        source: "/api/delrichmenu",
        destination: "https://api.line.me/v2/bot/richmenu/bulk/unlink",
      },
			{
        source: "/api/welcomemessage",
        destination: "https://api.line.me/v2/bot/message/push",
      },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
