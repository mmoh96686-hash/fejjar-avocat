import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Domain restructuring (see revision notes): "Divorce" is now folded
      // into "Droit de la famille", and "Droit des affaires" was renamed.
      // 301s preserve any link equity / bookmarks from the previous URLs.
      {
        source: "/domaines/divorce",
        destination: "/domaines/droit-de-la-famille",
        permanent: true,
      },
      {
        source: "/domaines/droit-des-affaires",
        destination: "/domaines/droit-commercial-affaires",
        permanent: true,
      },
      {
        source: "/ar/domaines/divorce",
        destination: "/ar/domaines/droit-de-la-famille",
        permanent: true,
      },
      {
        source: "/ar/domaines/droit-des-affaires",
        destination: "/ar/domaines/droit-commercial-affaires",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
