// import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LogoNapierCapital from "@/public/logo_transparente.png"
import Image from "next/image";
import Link from "next/link";

import { Menu, CircleUserRound, Settings, LayoutDashboard, LogOut, FileText  } from 'lucide-react';
const NavbarMarketplace = () => {
  return (
    <div className="sticky top-0 right-0  md:left-0 z-40">
      <nav className="bg-slate-800 ">
        <div className="flex flex-wrap items-center justify-between py-3 px-2">
          <Link href="/titulos" className="flex items-center space-x-3 text-white">
            <span className="self-center font-bold whitespace-nowrap tracking-widest">
                <Image src={LogoNapierCapital} className='w-32' />
            </span>
          </Link>
          <div className="items-center justify-between flex sm:w-auto">
            <div className=" block md:mt-0 md:order-none">
              <DropdownMenu className="z-40">
                <DropdownMenuTrigger>
                  <span className="flex justify-center rounded-lg p-1">
                    <Menu className="text-white" size={32}/>
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 rounded-xl mr-5">
                  <DropdownMenuGroup className="space-y-1 p-2">
                    <DropdownMenuItem className="group relative flex gap-x-6 rounded-lg p-2 hover:bg-gray-100">
                      <Link href="/perfil" className="group relative flex gap-x-6 
                      rounded-lg w-full h-full">
                        <div
                          className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg">
                          <CircleUserRound />
                        </div>
                        <div className="flex items-center justify-center">
                          <p className="font-semibold text-gray-900">
                            Perfil
                          </p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="group relative flex gap-x-6 rounded-lg p-2 hover:bg-gray-100">
                      <Link href="/gerenciar-titulos" className="group relative flex gap-x-6 
                      rounded-lg w-full h-full">
                        <div
                          className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg">
                          <Settings />
                        </div>
                        <div className="flex items-center justify-center">
                          <p className="font-semibold text-gray-900">
                            Meus Títulos
                          </p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="group relative flex gap-x-6 rounded-lg p-2 hover:bg-gray-100">
                      <Link href="/dashboard" className="group relative flex gap-x-6 
                      rounded-lg w-full h-full">
                        <div
                          className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg">
                          <LayoutDashboard />
                        </div>
                        <div className="flex items-center justify-center">
                          <p href="#" className="font-semibold text-gray-900">
                            Dashboard
                          </p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="group relative flex gap-x-6 rounded-lg p-2 hover:bg-gray-100">
                      <Link href="/relatorio" className="group relative flex gap-x-6 
                      rounded-lg w-full h-full">
                        <div
                          className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg">
                          <FileText  />
                        </div>
                        <div className="flex items-center justify-center">
                          <p href="#" className="font-semibold text-gray-900">
                            Relatório
                          </p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="group relative flex gap-x-6 rounded-lg p-2 hover:bg-gray-100">
                      <Link href="/" className="group relative flex gap-x-6
                       rounded-lg w-full h-full">
                        <div
                          className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg">
                          <LogOut />
                        </div>
                        <div className="flex items-center justify-center">
                          <p className="font-semibold text-gray-900">
                            Encerrar Seção
                          </p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavbarMarketplace;