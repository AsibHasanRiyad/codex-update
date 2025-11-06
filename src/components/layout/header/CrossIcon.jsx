const CrossIcon = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-10 cursor-pointer h-10 p-2.5 block group relative"
    >
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 bg-white h-[3px] block rotate-45 transition-all duration-800 ease-[cubic-bezier(0.645,0.045,0.355,1)]  group-hover:rotate-135"></span>
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 bg-white h-[3px] block -rotate-45 transition-all duration-800 ease-[cubic-bezier(0.645,0.045,0.355,1)]  group-hover:-rotate-135"></span>
    </button>
  );
};

export default CrossIcon;
