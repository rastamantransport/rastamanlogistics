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

const SEOHead = ({
  title,
  description,
  canonical,
  robots = "index, follow",
  ogImage,
  ogType = "website",
  ogSiteName = "Rastaman Logistics LLC",
  twitterCard = "summary_large_image",
}: SEOHeadProps) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <meta name="robots" content={robots} />
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />

    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content={ogType} />
    <meta property="og:site_name" content={ogSiteName} />
    {ogImage && <meta property="og:image" content={ogImage} />}

    <meta name="twitter:card" content={twitterCard} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    {ogImage && <meta name="twitter:image" content={ogImage} />}
  </Helmet>
);

export default SEOHead;
