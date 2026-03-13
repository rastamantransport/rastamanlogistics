import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { blogPosts, blogCategories } from "@/data/blogPosts";
import { Clock, ArrowRight } from "lucide-react";

const BASE_URL = "https://rastamanlogistics.com";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Rastaman Logistics Blog",
    description: "Auto transport tips, guides, and industry insights from Rastaman Logistics.",
    url: `${BASE_URL}/blog`,
    publisher: {
      "@type": "Organization",
      name: "Rastaman Logistics LLC",
      url: BASE_URL,
    },
    blogPost: blogPosts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      datePublished: p.date,
      url: `${BASE_URL}/blog/${p.slug}`,
      author: { "@type": "Organization", name: "Rastaman Logistics LLC" },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Auto Transport Blog — Tips & Guides | Rastaman Logistics"
        description="Expert auto transport tips, shipping guides, and industry insights to help you ship your vehicle with confidence."
        canonical={`${BASE_URL}/blog`}
      />
      <Navbar />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-foreground mb-4">
            Auto Transport Tips & Guides
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about shipping your vehicle — from preparation checklists to cost breakdowns and seasonal advice.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="container mx-auto px-4 lg:px-8 py-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {blogCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="container mx-auto px-4 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="group">
              <Card className="h-full transition-shadow hover:shadow-lg hover:border-primary/40">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-lg leading-snug group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{post.excerpt}</p>
                  <time className="text-xs text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </time>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-card border-t border-border py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-4">
            Ready to Ship Your Vehicle?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Get a free, no-obligation quote in under 60 seconds.
          </p>
          <Link to="/car-shipping-calculator">
            <Button className="bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90 gap-2">
              Get a Free Quote <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
