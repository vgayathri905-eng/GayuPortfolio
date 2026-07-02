import profile from "../../data/profile";
import Container from "../common/Container";
import SocialLinks from "../common/SocialLinks";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950/90 py-10">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
          <div>
            <h2 className="text-2xl font-black text-white">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {profile.name}
              </span>
            </h2>

            <p className="mt-3 max-w-xl text-slate-400">
              {profile.tagline}
            </p>
          </div>

          <SocialLinks
            github={profile.github}
            linkedin={profile.linkedin}
            email={profile.email}
          />
        </div>

        <div className="mt-8 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © {year} {profile.name}. All Rights Reserved.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;