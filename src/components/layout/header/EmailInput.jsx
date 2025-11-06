import { ArrowRight } from "lucide-react";

const EmailInput = () => {
  return (
    <form className="flex w-full group  mt-3 max-w-md border border-muted  overflow-hidden">
      <input
        type="email"
        placeholder="Enter your e-mail"
        className="flex-1 px-4 py-3 outline-none placeholder-muted text-gray-100"
      />
      <button
        type="submit"
        className="bg-gray-100 px-4 flex border-l  border-l-muted items-center justify-center "
        strong
      >
        <ArrowRight className="w-5 h-5 -rotate-45 group-hover:text-muted transition-all duration-200 ease-linear group-hover:rotate-0 text-gray-700" />
      </button>
    </form>
  );
};

export default EmailInput;
