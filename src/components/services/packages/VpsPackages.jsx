import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../lib/utils";
import vpsData from "../../../data/vpsPackages.json";
import PackageCard from "./PackageCard";

const tierIcons = {
  academic: (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
      />
    </svg>
  ),
  code: (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
      />
    </svg>
  ),
  rocket: (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
      />
    </svg>
  ),
  building: (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
      />
    </svg>
  ),
};

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

const VpsPackages = () => {
  const [activeTier, setActiveTier] = useState("student");
  const [billingCycle, setBillingCycle] = useState("monthly");

  const tiers = vpsData.tiers;
  const activeTierData = tiers.find((t) => t.id === activeTier);
  const packages = activeTierData?.packages || [];

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
            BDIX VPS Hosting
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
          >
            VPS Packages
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base text-white/50 max-w-2xl mx-auto"
          >
            Dedicated resources with full root access from our{" "}
            {vpsData.dataCenter} data center. BDIX routing ensures the fastest
            local speed for Bangladesh.
          </motion.p>

          {/* Data center badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/60"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-devola-mid animate-pulse" />
            {vpsData.dataCenter} · {vpsData.location}
          </motion.div>
        </div>

        {/* Tier Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {tiers.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setActiveTier(tier.id)}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 sm:px-6 py-2.5 text-sm font-medium transition-all duration-300",
                activeTier === tier.id
                  ? "bg-devola-mid text-primary"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white",
              )}
            >
              <span
                className={cn(
                  activeTier === tier.id ? "text-primary" : "text-white/40",
                )}
              >
                {tierIcons[tier.icon]}
              </span>
              {tier.name}
            </button>
          ))}
        </motion.div>

        {/* Tier description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={activeTier}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mb-6 text-center text-sm text-white/40"
          >
            {activeTierData?.description}
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
            key={`${activeTier}-${billingCycle}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "grid gap-6",
              packages.length === 2
                ? "sm:grid-cols-2 max-w-4xl mx-auto"
                : "sm:grid-cols-2 lg:grid-cols-3",
            )}
          >
            {packages.map((pkg, i) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                billingCycle={billingCycle}
                locationName={vpsData.location}
                dataCenter={vpsData.dataCenter}
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
          All prices are in BDT (৳). All VPS plans include full root access,
          free setup, and 24/7 monitoring. Custom configurations available on
          request.
        </motion.p>
      </div>
    </section>
  );
};

export default VpsPackages;
