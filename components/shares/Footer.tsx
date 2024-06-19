import Logo from "./Logo";


export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between md:items-center px-8 pt-8 pb-16 md:pb-20 border-t">
      <Logo />
      <div className="flex flex-col items-start md:items-end md:scale-100 leading-4">
        <span className="text-[0.9rem] md:text-base">
          <a target="_blank" href="https://github.com/shang-kyimin/info-miner" className="font-medium">Source Code</a> | <a target="_blank" href="https://kyiminkhine.vercel.app" className="font-medium">About Me</a>
        </span>
        <span className="text-[0.69rem] md:text-[0.85rem]">&copy; 2024 - {new Date().getFullYear() === 2024 ? "" : new Date().getFullYear()} Kyi Min Khine, Personal Project | All rights reserved</span>
      </div>
    </footer>
  );
}


