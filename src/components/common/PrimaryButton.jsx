function PrimaryButton({
  href = "#",
  children,
  download = false,
  target,
  rel,
  variant = "solid",
  className = "",
}) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 md:px-7 md:py-4 md:text-base";

  const variants = {
    solid:
      "bg-cyan-500 text-white hover:-translate-y-1 hover:bg-cyan-600 hover:shadow-[0_10px_30px_rgba(34,211,238,0.35)]",
    outline:
      "border border-cyan-400 text-white hover:-translate-y-1 hover:bg-cyan-500 hover:shadow-[0_10px_30px_rgba(34,211,238,0.2)]",
  };

  return (
    <a
      href={href}
      download={download}
      target={target}
      rel={rel}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

export default PrimaryButton;