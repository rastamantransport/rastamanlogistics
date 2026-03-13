import { useParams, Link, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbSeparator, BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { blogPosts } from "@/data/blogPosts";
import { ArrowRight, Clock, ChevronLeft } from "lucide-react";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";

const BASE_URL = "https://rastamanlogistics.com";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return blogPosts
      .filter((p) => p.slug !== post.slug)
      .sort((a, b) => (a.category === post.category ? -1 : 1))
      .slice(0, 3);
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    url: `${BASE_URL}/blog/${post.slug}`,
    author: { "@type": "Organization", name: "Rastaman Logistics LLC" },
    publisher: {
      "@type": "Organization",
      name: "Rastaman Logistics LLC",
      url: BASE_URL,
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={post.metaTitle}
        description={post.metaDescription}
        canonical={`${BASE_URL}/blog/${post.slug}`}
        ogType="article"
      />
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="pt-20 bg-card border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/blog">Blog</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{post.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Article */}
      <article className="container mx-auto px-4 lg:px-8 py-10 max-w-3xl">
        <div className="flex items-center gap-3 mb-4">
          <Badge variant="secondary">{post.category}</Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" /> {post.readTime}
          </span>
          <time className="text-xs text-muted-foreground">
            {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </time>
        </div>

        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-display text-foreground mb-8 leading-tight">
          {post.title}
        </h1>

        <div className="prose prose-neutral max-w-none
          [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:font-bold [&_h2]:font-display [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4
          [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-2
          [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4
          [&_ul]:text-muted-foreground [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6
          [&_ol]:text-muted-foreground [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6
          [&_li]:mb-1
          [&_strong]:text-foreground
          [&_a]:text-primary [&_a]:underline [&_a]:hover:opacity-80
          [&_table]:w-full [&_table]:border-collapse [&_table]:mb-6
          [&_th]:text-left [&_th]:p-2 [&_th]:border-b [&_th]:border-border [&_th]:text-foreground [&_th]:font-semibold [&_th]:text-sm
          [&_td]:p-2 [&_td]:border-b [&_td]:border-border [&_td]:text-muted-foreground [&_td]:text-sm
          [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground
        ">
          <ReactMarkdown
            components={{
              a: ({ href, children }) => {
                if (href?.startsWith("/")) {
                  return <Link to={href} className="text-primary underline hover:opacity-80">{children}</Link>;
                }
                return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Back link */}
        <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-8">
          <ChevronLeft className="w-4 h-4" /> Back to all articles
        </Link>
      </article>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-accent to-primary py-14">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-display text-primary-foreground mb-3">
            Ready to Ship Your Car?
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
            Get a free, instant quote from Rastaman Logistics — licensed, insured, and trusted nationwide.
          </p>
          <Link to="/car-shipping-calculator">
            <Button variant="secondary" className="font-semibold gap-2">
              Get a Free Quote <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Related Posts */}
      <section className="container mx-auto px-4 lg:px-8 py-14">
        <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-6">
          Related Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedPosts.map((rp) => (
            <Link key={rp.slug} to={`/blog/${rp.slug}`} className="group">
              <Card className="h-full transition-shadow hover:shadow-lg hover:border-primary/40">
                <CardHeader className="pb-2">
                  <Badge variant="secondary" className="text-xs w-fit mb-1">{rp.category}</Badge>
                  <CardTitle className="text-base leading-snug group-hover:text-primary transition-colors">
                    {rp.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">{rp.excerpt}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;
