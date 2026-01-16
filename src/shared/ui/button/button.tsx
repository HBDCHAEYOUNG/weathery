import { cn } from "@/shared/lib/utils";

function Button({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      className={cn(
        "size-8 flex items-center justify-center rounded-full bg-gray-200 p-2",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
