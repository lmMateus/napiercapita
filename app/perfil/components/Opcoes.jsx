import { useState, useEffect } from "react";
import { X } from 'lucide-react';


const Opcoes = ({ option, setOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(false);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const changeOption = (o) => {
    setOption(o)
  }
  return (
    <>
      <div>
        <nav className={`lg:hidden start-0 bg-white absolute w-full p-2 z-20`}>
          <button className={`flex gap-x-2 bg-slate-100 rounded-lg p-1 px-2 `} onClick={toggleSidebar} >
            <span className='font-semibold'>
              Menu
            </span>
          </button>
        </nav>
        <div className={`w-64 fixed md:absolute start-0 h-full lg:h-auto bg-gray-50 z-30
        text-slate-900/90 p-4 shadow-lg lg:m-10
        ${isOpen ? 'bloc overflow-hidden overscroll-none' : '-translate-x-full'} lg:translate-x-0`}>
          <nav>
            <button className={`block lg:hidden absolute p-2 top-0 right-0 m-2`} onClick={toggleSidebar} >
              <X className="hover:text-slate-400" size={22} />
            </button>
            <div>
              <div className="pt-3">
                <div className='flex items-center'>
                  <div className='p-2 text-sm space-y-5 font-semibold'>
                    <div>
                      <button className={`focus:outline-none p-1 rounded-lg
                        ${option === 'dados' ? 'bg-gray-200/50' : ''}`}
                        onClick={() => changeOption('dados')}>Dados Cadastrais</button>
                    </div>
                    <div>
                      <button className={`focus:outline-none p-1 rounded-lg
                        ${option === 'contato' ? 'bg-gray-200/50' : ''}`}
                        onClick={() => changeOption('contato')}>Contato</button>
                    </div>
                    <div>
                      <button className={`focus:outline-none p-1 rounded-lg
                        ${option === 'senha' ? 'bg-gray-200/50' : ''}`}
                        onClick={() => changeOption('senha')}>Redefinir senha</button>
                    </div>
                    <div>
                      <button className={`focus:outline-none p-1 rounded-lg
                        ${option === 'excluir' ? 'bg-gray-200/50' : ''}`}
                        onClick={() => changeOption('excluir')}>Excluir conta</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
export default Opcoes