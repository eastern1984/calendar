/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    // The locales you want to support in your app
    locales: ["ru", "en"],
    // The default locale you want to be used when visiting a non-locale prefixed path e.g. `/hello`
    defaultLocale: "en",
    localeDetection: true,
  },
};

module.exports = nextConfig;
