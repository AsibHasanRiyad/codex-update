import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageHeader from "../components/shared/PageHeader";
import { useSEO } from "../hooks/useSEO";
import { buildCanonicalUrl } from "../constants/seo";
import { caseStudies } from "../data/caseStudies";

export default function CaseStudies() {
  useSEO({
    title: "Case Studies",
    description:
      "Explore Devola's portfolio of successful software development and IT infrastructure projects across various industries.",
    pathname: "/case-studies",
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Devola Case Studies",
      url: buildCanonicalUrl("/case-studies"),
      description:
        "Portfolio of software and IT infrastructure projects by Devola.",
    },
  });

  const categories = [...new Set(caseStudies.map((cs) => cs.category))];

  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <h1 className="sr-only">Devola Case Studies</h1>
      <PageHeader
        title="Case Studies"
        subtitle="Real projects, real results. Explore how we've helped businesses transform through technology and infrastructure."
      />

      <section className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          {categories.map((category) => (
            <div key={category} className="mb-16">
              <h2 className="text-2xl font-bold text-gray-100 mb-8 uppercase tracking-wider border-b border-gray-500/30 pb-4">
                {category}
              </h2>
              <div className="grid gap-8 md:grid-cols-2">
                {caseStudies
                  .filter((cs) => cs.category === category)
                  .map((study, index) => (
                    <motion.div
                      key={study.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Link
                        to={`/case-studies/${study.slug}`}
                        className="group block border border-gray-500/30 rounded-xl p-8 bg-card/40 backdrop-blur-sm hover:border-2c/50 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-100 group-hover:text-2c transition-colors mb-1">
                              {study.title}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              {study.subtitle}
                            </p>
                          </div>
                          <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-2c group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0 mt-1" />
                        </div>

                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                          {study.problem}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span className="px-2 py-1 rounded bg-gray-500/20">
                            {study.client}
                          </span>
                          <div className="flex gap-2 flex-wrap">
                            {study.techStack.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 rounded bg-2c/10 text-2c"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
