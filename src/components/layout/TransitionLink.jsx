import { usePageTransition } from "./PageTransition";

export function TransitionLink({ to, children, className, onClick }) {
  const { handleNavigation } = usePageTransition();

  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        handleNavigation(to);
        if (onClick) onClick();
      }}
    >
      {children}
    </a>
  );
}
