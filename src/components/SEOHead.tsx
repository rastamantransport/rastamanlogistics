import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  robots?: string;
  ogImage?: string;
  ogType?: string;
  ogSiteName?: string;
  twitterCard?: string;
}

const DEFAULT_OG_IMAGE = "https://rastamanlogistics.com/og-default.jpg";

const SEOHead = ({
  title,
  description,
  canonical,
  robots = "index, follow",
  ogImage,
  ogType = "website",
  ogSiteName = "Rastaman Logistics",
  twitterCard = "summary_large_image",
}: SEOHeadProps) => {
  const resolvedOgImage = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={robots} />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />

      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={ogSiteName} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedOgImage} />
      <meta name="twitter:site" content="@RastamanLogist" />
    </Helmet>
  );
};

export default SEOHead;
