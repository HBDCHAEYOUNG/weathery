import { cn } from "@/shared/lib/utils";
import { Link, useLocation } from "react-router-dom";

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const { pathname } = useLocation();
  const isActive = pathname.startsWith(to);

  return (
    <Link
      to={to}
      className={cn(
        "text-xl flex-1 text-center",
        isActive && "font-bold underline underline-offset-8"
      )}
    >
      {children}
    </Link>
  );
}

export default NavLink;
