import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { blogPosts } from "../data/blogs";
import { useSEO } from "../hooks/useSEO";
import { buildCanonicalUrl } from "../constants/seo";

function renderMarkdown(content) {
  const lines = content.trim().split("\n");
  const elements = [];
  let i = 0;
  let tableRows = [];
  let inTable = false;

  while (i < lines.length) {
    const line = lines[i];

    // Table rows
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      const cells = line
        .trim()
        .split("|")
        .filter((c) => c.trim() !== "");

      // Skip separator rows
      if (cells.every((c) => /^[\s-:]+$/.test(c))) {
        inTable = true;
        i++;
        continue;
      }

      if (!inTable && tableRows.length === 0) {
        // Header row
        tableRows.push({ type: "header", cells: cells.map((c) => c.trim()) });
        inTable = true;
        i++;
        continue;
      }

      tableRows.push({ type: "body", cells: cells.map((c) => c.trim()) });
      i++;
      continue;
    }

    // Flush table
    if (inTable && tableRows.length > 0) {
      elements.push(
        <div key={`table-${i}`} className="overflow-x-auto my-6">
          <table className="w-full text-sm text-left text-gray-300 border border-gray-700 rounded-lg">
            {tableRows[0]?.type === "header" && (
              <thead className="text-xs uppercase text-gray-400 bg-card/60">
                <tr>
                  {tableRows[0].cells.map((cell, ci) => (
                    <th key={ci} className="px-4 py-3 border-b border-gray-700">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {tableRows.slice(1).map((row, ri) => (
                <tr key={ri} className="border-b border-gray-700/50">
                  {row.cells.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      tableRows = [];
      inTable = false;
    }

    // Empty lines
    if (line.trim() === "") {
      i++;
      continue;
    }

    // H2
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={`h2-${i}`}
          className="text-2xl md:text-3xl font-bold text-gray-100 mt-10 mb-4"
        >
          {line.slice(3)}
        </h2>,
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={`h3-${i}`}
          className="text-xl font-semibold text-gray-200 mt-6 mb-2"
        >
          {line.slice(4)}
        </h3>,
      );
      i++;
      continue;
    }

    // Unordered list
    if (line.trim().startsWith("- ")) {
      const items = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul
          key={`ul-${i}`}
          className="list-disc list-inside space-y-1.5 my-4 text-gray-300 ml-2"
        >
          {items.map((item, j) => (
            <li key={j}>{formatInline(item)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line.trim())) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol
          key={`ol-${i}`}
          className="list-decimal list-inside space-y-1.5 my-4 text-gray-300 ml-2"
        >
          {items.map((item, j) => (
            <li key={j}>{formatInline(item)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    // Paragraph
    elements.push(
      <p key={`p-${i}`} className="text-gray-300 leading-relaxed my-3">
        {formatInline(line)}
      </p>,
    );
    i++;
  }

  // Flush remaining table
  if (tableRows.length > 0) {
    elements.push(
      <div key="table-end" className="overflow-x-auto my-6">
        <table className="w-full text-sm text-left text-gray-300 border border-gray-700 rounded-lg">
          {tableRows[0]?.type === "header" && (
            <thead className="text-xs uppercase text-gray-400 bg-card/60">
              <tr>
                {tableRows[0].cells.map((cell, ci) => (
                  <th key={ci} className="px-4 py-3 border-b border-gray-700">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {tableRows.slice(1).map((row, ri) => (
              <tr key={ri} className="border-b border-gray-700/50">
                {row.cells.map((cell, ci) => (
                  <td key={ci} className="px-4 py-3">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>,
    );
  }

  return elements;
}

function formatInline(text) {
  // Bold
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-gray-100 font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function BlogDetail() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  const relatedPosts = post
    ? blogPosts
        .filter((p) => p.slug !== slug && p.category === post.category)
        .slice(0, 2)
    : [];

  useSEO({
    title: post ? post.title : "Blog Post",
    description: post ? post.excerpt : "Devola blog post",
    pathname: `/blog/${slug}`,
    schema: post
      ? {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          image: post.coverImage,
          datePublished: post.date,
          author: { "@type": "Organization", name: "Devola" },
          publisher: { "@type": "Organization", name: "Devola" },
          url: buildCanonicalUrl(`/blog/${slug}`),
          keywords: post.tags.join(", "),
        }
      : undefined,
  });

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">
            Post Not Found
          </h1>
          <Link to="/blog" className="text-2c hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <h1 className="sr-only">{post.title}</h1>

      {/* Hero */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        <div className="relative pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-3xl">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-2c transition-colors mb-8 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-2c text-sm font-medium uppercase tracking-widest">
                {post.category}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 mt-3 mb-6 leading-tight">
                {post.title}
              </h2>
              <div className="flex flex-wrap items-center gap-5 text-gray-400 text-sm">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
                <span className="text-gray-500">By {post.author}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="px-4 pb-20">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {renderMarkdown(post.content)}
          </motion.div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mt-12 pt-8 border-t border-gray-700/50">
            <Tag className="w-4 h-4 text-gray-500" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-gray-400 bg-card/50 px-3 py-1.5 rounded-full border border-gray-700/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="px-4 pb-24">
          <div className="container mx-auto max-w-3xl">
            <h3 className="text-2xl font-bold text-gray-100 mb-8">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  to={`/blog/${related.slug}`}
                  className="group block border border-gray-700/50 rounded-xl overflow-hidden hover:border-2c/30 transition-colors"
                >
                  <img
                    src={related.coverImage}
                    alt={related.title}
                    className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <span className="text-2c text-xs font-medium uppercase tracking-wider">
                      {related.category}
                    </span>
                    <h4 className="text-base font-semibold text-gray-100 mt-1 group-hover:text-2c transition-colors line-clamp-2">
                      {related.title}
                    </h4>
                    <p className="text-gray-500 text-sm mt-1">
                      {related.readTime}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-4 pb-24">
        <div className="container mx-auto max-w-3xl text-center border border-gray-700/50 rounded-2xl p-10 bg-card/20">
          <h3 className="text-2xl font-bold text-gray-100 mb-3">
            Ready to Build Something Great?
          </h3>
          <p className="text-gray-400 mb-6">
            Let's discuss how Devola can help bring your digital vision to life.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-2c text-white rounded-full hover:bg-2c/90 transition-colors font-medium"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
