import { cn } from "@/shared/lib/utils";

function CircleButton({
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
        "size-8 flex items-center justify-center rounded-full bg-gray-200 p-2 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default CircleButton;
