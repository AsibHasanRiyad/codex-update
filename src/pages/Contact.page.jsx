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

export default function Contact() {
  // Dummy Data
  const phone_one = "01700000000";
  const phone_two = "01800000000";
  const email_one = "example@gmail.com";
  const email_two = "info@example.com";
  const business_hour = "Mon - Fri: 10am - 6pm";
  const location = "Gulshan, Dhaka";

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
      secondary: "Weekend by appointment",
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
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      <p className="text-sm">{formState.message}</p>
                    </motion.div>
                  )}
                  {formState.status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 text-red-400 mb-6 rounded-lg"
                    >
                      <XCircle className="w-5 h-5 flex-shrink-0" />
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
              className="h-96 md:h-full min-h-[500px] rounded-lg overflow-hidden border border-gray-500 bg-card/40 backdrop-blur-sm shadow-xl"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9033652888277!2d90.41234!3d23.81061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7215c03e66b%3A0x4c12c4e0e7c8e5d!2sGulshan!5e0!3m2!1sen!2sbd!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
