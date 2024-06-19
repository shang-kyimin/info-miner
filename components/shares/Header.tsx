import Image from "next/image";
import Logo from "./Logo";


export default function Header() {
  return (
    <header className="pt-6 mx-4 md:mx-8 flex justify-between items-center border-b rounded-none pb-3 px-2 gap-1">
      <Logo />

      <div className="p-1">
        <a href="https://brave.com/search/api/" target="_blank" className="flex justify-center items-center gap-2">
          <div className="text-[0.69rem] md:text-sm flex flex-col leading-3 md:leading-4 items-end">
            <span>Powered by</span>
            <span className="text-sm md:font-medium">Brave Search Api</span>
          </div>
          <Image
            src="/icons/brave.icon.svg"
            alt="Brave icon svg"
            width={22}
            height={22}
            className="rounded-none"
          />
        </a>
      </div>
    </header>
  );
}


