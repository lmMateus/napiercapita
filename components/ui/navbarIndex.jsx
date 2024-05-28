import { CircleUserRound } from "lucide-react";

const NavbarIndex = () => {
  return (
    <div>
      <nav className="bg-slate-700">
        <div className="flex flex-wrap items-center justify-between p-4 pr-5">
          <a href="/" className="flex items-center space-x-3 text-white">
            <span className="self-center text-2xl font-bold whitespace-nowrap tracking-widest">
              NapierCapital
            </span>
          </a>
          <a href="#" className="group align-middle rounded-2xl inline-flex p-2 w-54 hover:bg-gray-200 text-white transition ease delay-150 hover:-translate-y-1">
            <CircleUserRound size={46} strokeWidth={1.25} className="transition ease delay-150 mr-2 text-white text-4xl group-hover:text-gray-800" />
            <div className="transition ease delay-150 group-hover:text-gray-800 text-left text-sm">
              <p className="font-semibold">Bem-Vindo</p>
              <p>Entre ou Cadastre-se</p>
            </div>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default NavbarIndex;