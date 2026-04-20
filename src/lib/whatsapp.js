import { WHATSAPP_NUMBER } from "../constants";

export function buildWhatsAppLink(packageData) {
  const lines = [
    `Hi, I'm interested in the *${packageData.name}* package.`,
    "",
    `📦 Package: ${packageData.name}`,
  ];

  if (packageData.location) {
    lines.push(`📍 Location: ${packageData.location}`);
  }

  if (packageData.dataCenter) {
    lines.push(`🏢 Data Center: ${packageData.dataCenter}`);
  }

  if (packageData.specs) {
    lines.push("", "📋 Specs:");
    packageData.specs.forEach((spec) => lines.push(`  • ${spec}`));
  }

  if (packageData.price) {
    lines.push("", `💰 Price: ${packageData.price}`);
  }

  lines.push("", "I'd like to know more and proceed with the order.");

  const text = encodeURIComponent(lines.join("\n"));
  const phone = WHATSAPP_NUMBER.replace(/[^0-9+]/g, "");

  return `https://api.whatsapp.com/send/?phone=${encodeURIComponent(phone)}&text=${text}&type=phone_number&app_absent=0`;
}
