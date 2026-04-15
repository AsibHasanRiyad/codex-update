"use client";

import { useInView, motion } from "framer-motion";
import { useRef, useState } from "react";
import {
  PhoneCall,
  Mail,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  Send,
} from "lucide-react";
import PageHeader from "../components/shared/PageHeader";
import { TextMaskReveal } from "../hooks/TextMaskReveal";
import { useSEO } from "../hooks/useSEO";
import { buildCanonicalUrl } from "../constants/seo";

export default function Contact() {
  useSEO({
    title: "Contact",
    description:
      "Contact Devola in Dhaka for web development, custom software, ecommerce, mobile apps, cloud hosting, and IT infrastructure solutions.",
    pathname: "/contact",
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact Devola",
      url: buildCanonicalUrl("/contact"),
      description:
        "Get in touch with Devola at 278/3, Manikdi, Sheikh Tamim Road, Dhaka Cantonment, Dhaka.",
    },
  });

  // Dummy Data
  const phone_one = "+880 1703 300440";
  const phone_two = "+880 1703 300440";
  const email_one = "hello@mydevola.com";
  const email_two = "hello@mydevola.com";
  const business_hour = "Sat - Thu: 10am - 6pm";
  const location =
    "278/3, Manikdi, Sheikh Tamim Road, Dhaka Cantonment, Dhaka - 1206";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [formState, setFormState] = useState({
    status: "idle",
    message: "",
  });

  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true, margin: "-100px" });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: PhoneCall,
      label: "Phone",
      value: phone_one,
      secondary: phone_two,
    },
    {
      icon: Mail,
      label: "Email",
      value: email_one,
      secondary: email_two,
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: business_hour,
      secondary: "Friday closed",
    },
    {
      icon: MapPin,
      label: "Address",
      value: location,
      secondary: "Dhaka, Bangladesh",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState({ status: "success", message: "Message sent successfully!" });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <h1 className="sr-only">Contact Devola</h1>
      <PageHeader />

      <section className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16 space-y-2">
            <p className="text-gray-300 text-sm tracking-widest uppercase">
              Get in touch
            </p>

            <TextMaskReveal
              splitByWord
              text="Let's Connect"
              className=" text-gray-100 uppercase text-4xl md:text-5xl lg:text-6xl  font-semibold"
            />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-20">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group border border-gray-500 rounded-lg p-6 bg-card/40 backdrop-blur-sm hover:border-foreground/20 transition-colors duration-300"
              >
                <div className="mb-4 inline-flex p-3 rounded-lg bg-muted text-gray-300 group-hover:bg-strong transition-colors group-hover:text-primary gro duration-300">
                  <item.icon className="w-6 h-6 text-foreground" />
                </div>

                <TextMaskReveal
                  splitByWord
                  text={item.label}
                  className=" text-gray-100 uppercase text-lg md:text-xl lg:text-2xl  font-semibold"
                />
                <p className="text-gray-300 text-sm leading-relaxed">
                  {item.value}
                </p>
                {item.secondary && (
                  <p className="text-gray-300 text-xs mt-2">{item.secondary}</p>
                )}
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, y: 30 }}
              animate={isFormInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-gray-300 text-sm tracking-widest uppercase">
                    Send us a message
                  </p>

                  <TextMaskReveal
                    splitByWord
                    text=" We're here to help"
                    className=" text-gray-100 uppercase text-3xl lg:-ml-2 md:text-4xl lg:text-5xl  font-semibold"
                  />
                  <p className="text-gray-300 text-sm pt-2">
                    Reach out with any questions or feedback. We'll get back to
                    you as soon as possible.
                  </p>
                </div>

                <div className="bg-card/50 border border-gray-500 rounded-lg p-8 backdrop-blur-sm">
                  {formState.status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 text-green-400 mb-6 rounded-lg"
                    >
                      <CheckCircle className="w-5 h-5 shrink-0" />
                      <p className="text-sm">{formState.message}</p>
                    </motion.div>
                  )}
                  {formState.status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 text-red-400 mb-6 rounded-lg"
                    >
                      <XCircle className="w-5 h-5 shrink-0" />
                      <p className="text-sm">{formState.message}</p>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-background/50 border border-gray-500 rounded-lg px-4 py-3 text-foreground placeholder-gray-400 focus:outline-none focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10 transition-all duration-200 text-sm"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-background/50 border border-gray-500 rounded-lg px-4 py-3 text-foreground placeholder-gray-400 focus:outline-none focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10 transition-all duration-200 text-sm"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-background/50 border border-gray-500 rounded-lg px-4 py-3 text-foreground placeholder-gray-400 focus:outline-none focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10 transition-all duration-200 text-sm"
                      />
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="bg-background/50 border border-gray-500 rounded-lg px-4 py-3 text-foreground placeholder-gray-400 focus:outline-none focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10 transition-all duration-200 text-sm"
                      />
                    </div>

                    <textarea
                      name="message"
                      rows={5}
                      required
                      placeholder="Your message..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-background/50 border border-gray-500 rounded-lg px-4 py-3 text-foreground placeholder-gray-400 focus:outline-none focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10 transition-all duration-200 text-sm resize-none"
                    />

                    <button
                      type="submit"
                      className="w-full bg-muted text-strong cursor-pointer py-3 px-6 rounded-lg font-semibold hover:bg-foreground/90 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group text-sm"
                    >
                      <span>Send Message</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-96 md:h-full min-h-[500px] rounded-lg overflow-hidden border border-gray-500 bg-card/40 backdrop-blur-sm shadow-xl flex flex-col items-center justify-center p-12 text-center"
            >
              <MapPin className="w-16 h-16 text-2c mb-6" />
              <h3 className="text-2xl font-bold text-gray-100 mb-4">
                Visit Our Office
              </h3>
              <p className="text-gray-300 text-lg mb-2">
                278/3, Manikdi, Sheikh Tamim Road
              </p>
              <p className="text-gray-300 text-lg mb-2">
                Dhaka Cantonment, Dhaka - 1206
              </p>
              <p className="text-gray-300 text-lg mb-6">Bangladesh</p>
              <div className="space-y-2">
                <p className="text-gray-400 text-sm">Sat - Thu: 10am - 6pm</p>
                <p className="text-gray-400 text-sm">Friday: Closed</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
