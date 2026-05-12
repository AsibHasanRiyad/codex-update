import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_LINK =
  "https://wa.me/966504183004?text=Hello%202%20Creative%2C%20I%20would%20like%20to%20connect.";

const WhatsAppFloatingButton = () => {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-6 right-6 z-999 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_16px_30px_rgba(37,211,102,0.38)] transition-transform duration-200 hover:scale-105 focus-visible:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#25D366]"
    >
      <FaWhatsapp size={30} />
    </a>
  );
};

export default WhatsAppFloatingButton;
