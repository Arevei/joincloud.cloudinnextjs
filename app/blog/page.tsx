import { useEffect } from "react";
import { Link } from "wouter";
import joincloudLogo from "/joincloud-logo.png";
import { blogPosts } from "@/lib/blog-posts";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Blog() {
  useEffect(() => {
    document.title = "Blog — JoinCloud | File Sharing Tips, Guides & Updates";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Explore the JoinCloud blog for guides on file sharing, cloud storage comparisons, privacy tips, and product updates. Learn how to share files without uploading to third-party servers."
      );
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://joincloud.in/blog");

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", "Blog — JoinCloud | File Sharing Tips & Guides");

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc)
      ogDesc.setAttribute(
        "content",
        "Guides, comparisons, and updates from the JoinCloud team. Learn how to share files securely without cloud storage."
      );

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", "https://joincloud.in/blog");

    // JSON-LD: Blog structured data
    const existingScript = document.getElementById("blog-jsonld");
    if (existingScript) existingScript.remove();

    const script = document.createElement("script");
    script.id = "blog-jsonld";
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "JoinCloud Blog",
      description:
        "File sharing guides, cloud storage comparisons, and product updates from JoinCloud.",
      url: "https://joincloud.in/blog",
      publisher: {
        "@type": "Organization",
        name: "JoinCloud",
        url: "https://joincloud.in",
        logo: {
          "@type": "ImageObject",
          url: "https://joincloud.in/joincloud-logo.png",
        },
      },
      blogPost: blogPosts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        url: `https://joincloud.in/blog/${post.slug}`,
        author: {
          "@type": "Person",
          name: post.author,
        },
      })),
    });
    document.head.appendChild(script);

    return () => {
      document.getElementById("blog-jsonld")?.remove();
    };
  }, []);

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
              className="text-foreground font-medium transition-colors duration-150"
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
          <a
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            Back to Home
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <a href="/" className="hover:text-foreground transition-colors duration-150">
                Home
              </a>
            </li>
            <li aria-hidden="true" className="select-none">
              /
            </li>
            <li className="text-foreground" aria-current="page">
              Blog
            </li>
          </ol>
        </nav>

        <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-4">
          The JoinCloud Blog
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Guides on file sharing, cloud storage comparisons, privacy tips, and updates
          from the JoinCloud team.
        </p>
      </section>

      {/* Post Grid */}
      <main className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col bg-card border border-border rounded-lg overflow-hidden hover:border-primary/40 transition-colors duration-200"
            >
              {/* Category bar */}
              <div className="px-6 pt-5 pb-0">
                <span className="inline-block text-xs font-medium text-primary uppercase tracking-widest mb-3">
                  {post.category}
                </span>
              </div>

              <div className="flex flex-col flex-1 px-6 pb-6">
                <h2 className="text-lg font-semibold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors duration-150">
                  <Link href={`/blog/${post.slug}`} className="focus:outline-none focus:underline">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-sm text-muted-foreground flex-1 leading-relaxed mb-5">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-medium text-foreground">{post.author}</span>
                    <time
                      dateTime={post.publishedAt}
                      className="text-xs text-muted-foreground"
                    >
                      {formatDate(post.publishedAt)}
                    </time>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {post.readingTime} min read
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 bg-card border-t border-border">
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
