'use client'
import { useState, useEffect } from "react";
import NavbarMarketplace from "../components/Navbar";
import Opcoes from './components/Opcoes'
import PerfilPF from "./components/PerfilPF";
import Contato from "./components/Contato";
import RedefinirSenha from "./components/RedefinirSenha";
import ExcluirConta from "./components/ExcluirConta";
import { getPerfil } from "./api/get-perfil";
import PerfilPj from "./components/PerfilPJ";
import { Toaster } from "@/components/ui/toaster"
const Perfil = () => {
  const [option, setOption] = useState('dados');
  const [perfil , setPerfil] = useState(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const p = await getPerfil('contato@nubank.com');
        // const p = await getPerfil('email@glob.com');
        setPerfil(p);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };
    fetchPerfil();
  }, []); 
   

  const render = ()=>{
    if (!perfil || perfil.length === 0) {
      return <div></div>;
    }
    return (
      <>
        <div>
          <NavbarMarketplace />
          {/* <EditarPFComponent
            onDataSubmit={handleDataSubmitPF}/> */}
          <div>
            <main className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
              <section >
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  <Opcoes
                    option={option}
                    setOption={setOption}
                  />
                  <div className="lg:col-span-3">
                    <div>
                      <div className="bg-white p-5 flex">
                        <div className="mx-auto py-3 w-full rounded-xl shadow">
                          <div className={` ${option === 'dados' ? '' : 'hidden'}`}>  
                          {/* <PerfilPF onDataSubmit={handleDataSubmitPF}/>                         */}
                          {perfil.tipo_persona == 'pessoa_fisica' ? 
                            <PerfilPF perfil={perfil}  /> :
                            <PerfilPj perfil={perfil}/>
                          }
                          </div>
                          <div className={` ${option === 'contato' ? '' : 'hidden'}`}>
                            <Contato perfil={perfil}/>
                          </div>
                          <div className={` ${option === 'senha' ? '' : 'hidden'}`}>
                            <RedefinirSenha perfil={perfil}/>
                          </div>
                          <div className={` ${option === 'excluir' ? '' : 'hidden'}`}>
                            <ExcluirConta perfil={perfil}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
        <Toaster />
      </>
    )
  }
  return (
    <>
      {render()}
    </>);
}

export default Perfil;