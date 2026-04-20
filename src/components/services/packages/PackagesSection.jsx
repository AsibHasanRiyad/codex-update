import HostingPackages from "./HostingPackages";
import VpsPackages from "./VpsPackages";

const PACKAGE_SLUGS = {
  "cloud-hosting": HostingPackages,
  "vps-solutions": VpsPackages,
};

const PackagesSection = ({ slug }) => {
  const Component = PACKAGE_SLUGS[slug];
  if (!Component) return null;
  return <Component />;
};

export default PackagesSection;
