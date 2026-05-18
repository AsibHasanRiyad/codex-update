import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageHeader from "../components/shared/PageHeader";
import { useSEO } from "../hooks/useSEO";
import { buildCanonicalUrl } from "../constants/seo";
import { products } from "../data/products";

export default function Products() {
  useSEO({
    title: "Products",
    description:
      "Explore Codex IT's ready-to-deploy software products including CRM, Inventory Management, E-Commerce, News Portal, POS, and HRM solutions.",
    pathname: "/products",
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Codex IT Products",
      url: buildCanonicalUrl("/products"),
      description: "Ready-to-deploy software products by Codex IT.",
    },
  });

  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <h1 className="sr-only">Codex IT Products</h1>
      <PageHeader
        title="Our Products"
        subtitle="Ready-to-deploy software solutions designed for real business needs. Each product is built with scalability, security, and user experience in mind."
      />

      <section className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group border border-gray-500/30 rounded-xl p-8 bg-card/40 backdrop-blur-sm hover:border-2c/50 transition-all duration-300"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-100 mb-3 group-hover:text-2c transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="space-y-2 mb-6">
                  <h4 className="text-xs uppercase tracking-widest text-gray-400">
                    Key Features
                  </h4>
                  <ul className="space-y-1">
                    {product.features.slice(0, 4).map((feature, i) => (
                      <li
                        key={i}
                        className="text-gray-300 text-sm flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-2c shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-sm text-2c hover:underline font-medium"
                >
                  Get a Demo
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
