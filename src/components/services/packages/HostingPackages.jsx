import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../lib/utils";
import hostingData from "../../../data/hostingPackages.json";
import PackageCard from "./PackageCard";

const BillingToggle = ({ billingCycle, setBillingCycle }) => (
  <div className="flex items-center justify-center gap-3">
    <span
      className={cn(
        "text-sm transition-colors",
        billingCycle === "monthly" ? "text-white" : "text-white/40",
      )}
    >
      Monthly
    </span>
    <button
      onClick={() =>
        setBillingCycle((c) => (c === "monthly" ? "yearly" : "monthly"))
      }
      className="relative h-7 w-14 rounded-full bg-white/10 transition-colors hover:bg-white/15"
      aria-label="Toggle billing cycle"
    >
      <motion.div
        className="absolute top-0.5 h-6 w-6 rounded-full bg-devola-mid"
        animate={{ left: billingCycle === "monthly" ? 2 : 30 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
    <span
      className={cn(
        "text-sm transition-colors",
        billingCycle === "yearly" ? "text-white" : "text-white/40",
      )}
    >
      Yearly
      <span className="ml-1.5 rounded bg-devola-mid/20 px-1.5 py-0.5 text-[10px] font-semibold text-devola-mid">
        SAVE
      </span>
    </span>
  </div>
);

const HostingPackages = () => {
  const [activeLocation, setActiveLocation] = useState("bdix");
  const [billingCycle, setBillingCycle] = useState("yearly");

  const locations = hostingData.locations;
  const activeLocationData = locations.find((l) => l.id === activeLocation);
  const packages = hostingData.packages.filter(
    (p) => p.location === activeLocation,
  );

  return (
    <section className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 text-sm font-medium uppercase tracking-widest text-devola-mid"
          >
            Shared cPanel Hosting
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
          >
            Choose Your Hosting Package
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base text-white/50 max-w-2xl mx-auto"
          >
            Select your preferred server location and pick the plan that matches
            your needs. All plans include free SSL, backups, and cPanel access.
          </motion.p>
        </div>

        {/* Location Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {locations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setActiveLocation(loc.id)}
              className={cn(
                "relative rounded-xl px-4 sm:px-6 py-2.5 text-sm font-medium transition-all duration-300",
                activeLocation === loc.id
                  ? "bg-devola-mid text-primary"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white",
              )}
            >
              <span className="mr-1.5">{loc.flag}</span>
              {loc.name}
            </button>
          ))}
        </motion.div>

        {/* Location description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={activeLocation}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mb-6 text-center text-sm text-white/40"
          >
            {activeLocationData?.description}
          </motion.p>
        </AnimatePresence>

        {/* Billing Toggle */}
        <div className="mb-10">
          <BillingToggle
            billingCycle={billingCycle}
            setBillingCycle={setBillingCycle}
          />
        </div>

        {/* Package Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeLocation}-${billingCycle}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {packages.map((pkg, i) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                billingCycle={billingCycle}
                locationName={activeLocationData?.name}
                index={i}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center text-xs text-white/30"
        >
          All prices are in BDT (৳). Lifetime free domain applies to .com TLD
          only on Grower & Rewarder plans.
        </motion.p>
      </div>
    </section>
  );
};

export default HostingPackages;
