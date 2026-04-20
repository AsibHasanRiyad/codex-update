import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { buildWhatsAppLink } from "../../../lib/whatsapp";

const PackageCard = ({
  pkg,
  billingCycle,
  locationName,
  dataCenter,
  index = 0,
}) => {
  const price = billingCycle === "yearly" ? pkg.priceYearly : pkg.priceMonthly;
  const period = billingCycle === "yearly" ? "/yr" : "/mo";

  const specs = pkg.features?.slice(0, 4) || [];

  const whatsappData = {
    name: pkg.name,
    location: locationName,
    dataCenter: dataCenter,
    specs: [
      pkg.storage && `Storage: ${pkg.storage}`,
      pkg.bandwidth && `Bandwidth: ${pkg.bandwidth}`,
      pkg.ram && `RAM: ${pkg.ram}`,
      pkg.cpu && `CPU: ${pkg.cpu}`,
      pkg.cores && `vCPU: ${pkg.cores} Core${pkg.cores > 1 ? "s" : ""}`,
      pkg.ssd && `SSD: ${pkg.ssd} GB`,
      pkg.ips && `IPs: ${pkg.ips}`,
    ].filter(Boolean),
    price: `৳${price.toLocaleString()}${period}`,
  };

  const whatsappUrl = buildWhatsAppLink(whatsappData);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "relative flex flex-col rounded-2xl border p-6 sm:p-8 transition-all duration-300",
        pkg.popular
          ? "border-devola-mid/50 bg-devola-mid/5"
          : "border-white/10 bg-white/2 hover:border-white/20",
      )}
    >
      {pkg.popular && (
        <div className="absolute -top-3 left-6 rounded-full bg-devola-mid px-4 py-1 text-xs font-semibold text-primary">
          POPULAR
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white">{pkg.name}</h3>
        {pkg.bestFor && (
          <p className="mt-1 text-sm text-white/50">{pkg.bestFor}</p>
        )}
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl sm:text-4xl font-bold text-white">
            ৳{price.toLocaleString()}
          </span>
          <span className="text-white/40 text-sm">{period}</span>
        </div>
        {billingCycle === "yearly" && pkg.priceMonthly && (
          <p className="mt-1 text-xs text-white/30">
            ≈ ৳{pkg.priceMonthly.toLocaleString()}/mo
          </p>
        )}
      </div>

      <div className="mb-6 space-y-3 flex-1">
        {(pkg.features || []).map((feature, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <svg
              className="mt-0.5 h-4 w-4 shrink-0 text-devola-mid"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm text-white/70">{feature}</span>
          </div>
        ))}
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "mt-auto flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300",
          pkg.popular
            ? "bg-devola-mid text-primary hover:bg-devola-light"
            : "bg-white/10 text-white hover:bg-white/20",
        )}
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Book Now
      </a>
    </motion.div>
  );
};

export default PackageCard;
