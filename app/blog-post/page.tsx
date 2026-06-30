import { useEffect } from "react";
import { Link, useParams } from "wouter";
import joincloudLogo from "/joincloud-logo.png";
import { getBlogPost, blogPosts, type BlogSection } from "@/lib/blog-posts";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function RenderSection({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "h2":
      return (
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 mt-10">
            {section.heading}
          </h2>
          {section.text && (
            <p className="text-muted-foreground leading-relaxed">{section.text}</p>
          )}
        </section>
      );
    case "h3":
      return (
        <section>
          <h3 className="text-xl font-semibold text-foreground mb-3 mt-8">
            {section.heading}
          </h3>
          {section.text && (
            <p className="text-muted-foreground leading-relaxed">{section.text}</p>
          )}
        </section>
      );
    case "p":
      return <p className="text-muted-foreground leading-relaxed">{section.text}</p>;
    case "ul":
      return (
        <ul className="space-y-2">
          {section.items?.map((item, i) => (
            <li key={i} className="flex gap-3 text-muted-foreground">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" aria-hidden="true" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="space-y-2 list-decimal list-inside">
          {section.items?.map((item, i) => (
            <li key={i} className="text-muted-foreground leading-relaxed">
              {item}
            </li>
          ))}
        </ol>
      );
    case "blockquote":
      return (
        <blockquote className="border-l-4 border-primary pl-5 py-1 text-muted-foreground italic text-lg">
          {section.text}
        </blockquote>
      );
    case "steps":
      return (
        <ol className="space-y-6" aria-label="Steps">
          {section.steps?.map((step, i) => (
            <li key={i} className="flex gap-4">
              <div
                className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-sm font-semibold"
                aria-hidden="true"
              >
                {i + 1}
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">{step.title}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      );
    default:
      return null;
  }
}

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const post = getBlogPost(params.slug ?? "");

  useEffect(() => {
    if (!post) return;

    document.title = `${post.ogTitle} — JoinCloud Blog`;

    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', "content", post.metaDescription);
    setMeta('link[rel="canonical"]', "href", `https://joincloud.in/blog/${post.slug}`);
    setMeta('meta[property="og:title"]', "content", post.ogTitle);
    setMeta('meta[property="og:description"]', "content", post.metaDescription);
    setMeta('meta[property="og:url"]', "content", `https://joincloud.in/blog/${post.slug}`);
    setMeta('meta[property="og:type"]', "content", "article");
    setMeta('meta[name="twitter:title"]', "content", post.ogTitle);
    setMeta('meta[name="twitter:description"]', "content", post.metaDescription);

    // Remove old scripts
    ["post-article-jsonld", "post-breadcrumb-jsonld", "post-faq-jsonld"].forEach((id) => {
      document.getElementById(id)?.remove();
    });

    // Article JSON-LD
    const articleScript = document.createElement("script");
    articleScript.id = "post-article-jsonld";
    articleScript.type = "application/ld+json";
    articleScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.metaDescription,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      author: {
        "@type": "Person",
        name: post.author,
        jobTitle: post.authorTitle,
      },
      publisher: {
        "@type": "Organization",
        name: "JoinCloud",
        url: "https://joincloud.in",
        logo: {
          "@type": "ImageObject",
          url: "https://joincloud.in/joincloud-logo.png",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://joincloud.in/blog/${post.slug}`,
      },
      keywords: post.tags.join(", "),
      articleSection: post.category,
      timeRequired: `PT${post.readingTime}M`,
    });
    document.head.appendChild(articleScript);

    // Breadcrumb JSON-LD
    const breadcrumbScript = document.createElement("script");
    breadcrumbScript.id = "post-breadcrumb-jsonld";
    breadcrumbScript.type = "application/ld+json";
    breadcrumbScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://joincloud.in/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: "https://joincloud.in/blog",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: `https://joincloud.in/blog/${post.slug}`,
        },
      ],
    });
    document.head.appendChild(breadcrumbScript);

    // FAQ JSON-LD (AEO)
    if (post.faqs.length > 0) {
      const faqScript = document.createElement("script");
      faqScript.id = "post-faq-jsonld";
      faqScript.type = "application/ld+json";
      faqScript.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      });
      document.head.appendChild(faqScript);
    }

    return () => {
      ["post-article-jsonld", "post-breadcrumb-jsonld", "post-faq-jsonld"].forEach((id) => {
        document.getElementById(id)?.remove();
      });
    };
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src={joincloudLogo} alt="JoinCloud" className="h-8 w-auto object-contain" />
              <span className="text-xl font-semibold text-foreground">JoinCloud</span>
            </a>
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              ← Back to Blog
            </Link>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-foreground mb-4">Post not found</h1>
            <p className="text-muted-foreground mb-8">
              This post doesn't exist or may have been moved.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium"
            >
              ← View all posts
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src={joincloudLogo} alt="JoinCloud" className="h-8 w-auto object-contain" />
            <span className="text-xl font-semibold text-foreground">JoinCloud</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href="/blog"
              className="text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              Blog
            </Link>
            <a
              href="/#features"
              className="text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              Features
            </a>
            <a
              href="/#download"
              className="text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              Download
            </a>
          </nav>
          <Link
            href="/blog"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            ← Back to Blog
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <li>
              <a href="/" className="hover:text-foreground transition-colors duration-150">
                Home
              </a>
            </li>
            <li aria-hidden="true" className="select-none">/</li>
            <li>
              <Link href="/blog" className="hover:text-foreground transition-colors duration-150">
                Blog
              </Link>
            </li>
            <li aria-hidden="true" className="select-none">/</li>
            <li className="text-foreground truncate max-w-xs" aria-current="page">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* Post Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium text-primary uppercase tracking-widest">
              {post.category}
            </span>
            <span className="text-muted-foreground/40" aria-hidden="true">·</span>
            <span className="text-xs text-muted-foreground">{post.readingTime} min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed mb-8">{post.excerpt}</p>

          <div className="flex items-center gap-4 pb-8 border-b border-border">
            <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-sm font-semibold flex-shrink-0">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{post.author}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{post.authorTitle}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </div>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="space-y-6">
          {post.content.map((section, i) => (
            <RenderSection key={i} section={section} />
          ))}
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground mb-3 uppercase tracking-widest">Tags</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full bg-card border border-border text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* FAQ Section (AEO) */}
        {post.faqs.length > 0 && (
          <section aria-label="Frequently Asked Questions" className="mt-12">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-5">
              {post.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-lg bg-card border border-border p-5"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <h3
                    className="text-base font-medium text-foreground mb-2"
                    itemProp="name"
                  >
                    {faq.question}
                  </h3>
                  <div
                    itemScope
                    itemType="https://schema.org/Answer"
                    itemProp="acceptedAnswer"
                  >
                    <p className="text-sm text-muted-foreground leading-relaxed" itemProp="text">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="mt-12 rounded-lg bg-card border border-primary/20 p-8 text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Try JoinCloud for free
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Turn your device into a personal cloud. No subscriptions. No uploads. Just direct
            file sharing.
          </p>
          <a
            href="/#download"
            className="inline-flex items-center gap-2 bg-primary text-background font-medium text-sm px-6 py-2.5 rounded-md hover:bg-primary/90 transition-colors duration-150"
          >
            Download JoinCloud
          </a>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-14" aria-label="Related articles">
            <h2 className="text-xl font-semibold text-foreground mb-6">Related Articles</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {relatedPosts.map((related) => (
                <article
                  key={related.slug}
                  className="group rounded-lg bg-card border border-border p-5 hover:border-primary/40 transition-colors duration-200"
                >
                  <span className="text-xs font-medium text-primary uppercase tracking-widest">
                    {related.category}
                  </span>
                  <h3 className="text-sm font-medium text-foreground mt-2 mb-2 leading-snug group-hover:text-primary transition-colors duration-150">
                    <Link href={`/blog/${related.slug}`} className="focus:outline-none focus:underline">
                      {related.title}
                    </Link>
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <time dateTime={related.publishedAt}>{formatDate(related.publishedAt)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{related.readingTime} min read</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 py-12 px-6 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <img src={joincloudLogo} alt="JoinCloud" className="h-6 w-auto object-contain" />
              <span className="text-lg font-semibold text-foreground">JoinCloud</span>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <Link
                href="/blog"
                className="text-muted-foreground hover:text-foreground transition-colors duration-150"
              >
                Blog
              </Link>
              <a
                href="/privacy"
                className="text-muted-foreground hover:text-foreground transition-colors duration-150"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-muted-foreground hover:text-foreground transition-colors duration-150"
              >
                Terms
              </a>
              <a
                href="/#download"
                className="text-muted-foreground hover:text-foreground transition-colors duration-150"
              >
                Download
              </a>
            </nav>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} JoinCloud. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
