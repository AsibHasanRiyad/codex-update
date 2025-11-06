const HamburgerIcon = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-16 cursor-pointer flex h-[35px] p-2.5  justify-center items-center gap-4 group"
    >
      <p className=" font-semibold text-strong lg:font-medium">Menu</p>
      <div>
        <span
          className="w-7 bg-strong mt-0 h-[3px] block transition-all duration-800 
      ease-[cubic-bezier(0.355,0.045,0.6451)] group-hover:w-8 ml-auto"
        ></span>
        <span className="w-10 bg-strong mt-2 h-[3px] block transition-all duration-800 ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:w-6 ml-auto"></span>
        <span className="w-4 bg-strong mt-2 h-[3px] block transition-all duration-800 ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:w-10 ml-auto"></span>
      </div>
    </button>
  );
};

export default HamburgerIcon;
