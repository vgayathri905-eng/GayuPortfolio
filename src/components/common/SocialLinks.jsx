import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function SocialLinks({
  github,
  linkedin,
  email,
  className = "",
  iconClassName = "",
}) {
  const commonClasses = `
    flex h-12 w-12 items-center justify-center rounded-full
    border border-slate-700 bg-slate-900/80 text-xl text-white
    transition-all duration-300
    hover:-translate-y-1 hover:border-cyan-400 hover:bg-cyan-500
    hover:shadow-[0_8px_25px_rgba(34,211,238,0.35)]
    ${iconClassName}
  `;

  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      <a
        href={github}
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className={commonClasses}
      >
        <FaGithub />
      </a>

      <a
        href={linkedin}
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        className={commonClasses}
      >
        <FaLinkedinIn />
      </a>

      <a
        href={`mailto:${email}`}
        aria-label="Email"
        className={commonClasses}
      >
        <MdEmail />
      </a>
    </div>
  );
}

export default SocialLinks;