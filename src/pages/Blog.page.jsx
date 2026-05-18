import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, Search } from "lucide-react";
import { blogPosts } from "../data/blogs";
import PageHeader from "../components/shared/PageHeader";
import { useSEO } from "../hooks/useSEO";
import { buildCanonicalUrl } from "../constants/seo";

const categories = ["All", ...new Set(blogPosts.map((post) => post.category))];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  useSEO({
    title: "Blog",
    description:
      "Insights, guides, and resources on software development, web development, cloud hosting, SEO, and digital transformation from the Codex IT team.",
    pathname: "/blog",
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Codex IT Blog",
      url: buildCanonicalUrl("/blog"),
      description:
        "Expert articles on software development, web development, ecommerce, cloud hosting, and digital marketing.",
      publisher: {
        "@type": "Organization",
        name: "Codex IT",
      },
    },
  });

  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <h1 className="sr-only">Codex IT Blog</h1>
      <PageHeader
        title="Blog"
        subtitle="Insights, guides, and resources on software development and digital growth."
      />

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-6 mb-12">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-card/50 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-2c transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-2c text-white"
                      : "bg-card/50 text-gray-400 hover:text-gray-200 border border-gray-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Post */}
          {filteredPosts.length > 0 &&
            activeCategory === "All" &&
            !searchQuery && (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-16"
              >
                <Link
                  to={`/blog/${filteredPosts[0].slug}`}
                  className="group grid grid-cols-1 lg:grid-cols-2 gap-8 border border-gray-700/50 rounded-2xl overflow-hidden hover:border-2c/30 transition-colors"
                >
                  <div className="overflow-hidden">
                    <img
                      src={filteredPosts[0].coverImage}
                      alt={filteredPosts[0].title}
                      className="w-full h-64 lg:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <span className="text-2c text-xs font-medium uppercase tracking-wider">
                      {filteredPosts[0].category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mt-2 mb-4 group-hover:text-2c transition-colors">
                      {filteredPosts[0].title}
                    </h2>
                    <p className="text-gray-400 mb-6 line-clamp-3">
                      {filteredPosts[0].excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-gray-500 text-sm">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(filteredPosts[0].date).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" },
                        )}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {filteredPosts[0].readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            )}

          {/* Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(activeCategory === "All" && !searchQuery
              ? filteredPosts.slice(1)
              : filteredPosts
            ).map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link to={`/blog/${post.slug}`} className="block">
                  <div className="overflow-hidden rounded-xl mb-5">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex items-center gap-4 text-gray-500 text-sm mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  <span className="text-2c text-xs font-medium uppercase tracking-wider">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-100 mt-1 mb-2 group-hover:text-2c transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-gray-500 bg-card/50 px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                No articles found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 text-2c hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
