import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useSEO } from "../hooks/useSEO";
import { buildCanonicalUrl } from "../constants/seo";
import { caseStudies } from "../data/caseStudies";

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const study = caseStudies.find((cs) => cs.slug === slug);

  useSEO({
    title: study ? study.title : "Case Study",
    description: study
      ? `${study.subtitle} - ${study.problem.slice(0, 120)}`
      : "Codex IT case study detail",
    pathname: `/case-studies/${slug}`,
    schema: study
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          name: study.title,
          url: buildCanonicalUrl(`/case-studies/${slug}`),
          description: study.subtitle,
          author: { "@type": "Organization", name: "Codex IT" },
        }
      : undefined,
  });

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">
            Case Study Not Found
          </h1>
          <Link to="/case-studies" className="text-2c hover:underline">
            View All Case Studies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <h1 className="sr-only">{study.title}</h1>

      {/* Header */}
      <div className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-2c transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Case Studies
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-2c text-sm font-medium uppercase tracking-widest">
              {study.category}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-100 mt-2 mb-4">
              {study.title}
            </h2>
            <p className="text-xl text-gray-300 mb-8">{study.subtitle}</p>

            <div className="flex flex-wrap gap-4 mb-8">
              <span className="px-4 py-2 rounded-full border border-gray-500/30 text-gray-300 text-sm">
                Client: {study.client}
              </span>
              {study.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full bg-2c/10 text-2c text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <section className="pb-24 px-4">
        <div className="container mx-auto max-w-4xl space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="border border-gray-500/30 rounded-xl p-8 bg-card/40"
          >
            <h3 className="text-xl font-bold text-gray-100 mb-4">
              The Challenge
            </h3>
            <p className="text-gray-300 leading-relaxed">{study.problem}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="border border-gray-500/30 rounded-xl p-8 bg-card/40"
          >
            <h3 className="text-xl font-bold text-gray-100 mb-4">
              Our Solution
            </h3>
            <p className="text-gray-300 leading-relaxed">{study.solution}</p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center pt-8"
          >
            <p className="text-gray-400 mb-6">
              Interested in a similar solution for your business?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-2c text-white rounded-full hover:bg-2c/90 transition-colors font-medium"
            >
              Let's Discuss Your Project
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
