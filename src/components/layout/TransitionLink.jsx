import { Link } from "react-router-dom";
import { usePageTransition } from "./PageTransition";

export function TransitionLink({ to, children, className, onClick }) {
  const { handleNavigation } = usePageTransition();

  return (
    <Link
      to={to}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        handleNavigation(to);
        if (onClick) onClick();
      }}
    >
      {children}
    </Link>
  );
}
