import { SquareUserRound, Building2 } from "lucide-react";

export default function PersonaComponent({onClick, onVoltar}) {
  const handleClick = (id) => {
    onClick(id);
  };

  return (
    <div className="block border-solid border-2 border-gray-100 rounded-2xl shadow-lg mt-10 w-4/5 h-fit p-5">
      <h1 className="text-center text-2xl font-semibold text-slate-800 mb-4">
        Escolha sua persona legal
      </h1>
      <div className="flex justify-center">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div             onClick={() => handleClick("pessoa_fisica")} className="flex flex-col items-center bg-white rounded-lg overflow-hidden pt-3 sm:w-1/2 transition duration-300 ease-in-out transform hover:shadow-xl hover:cursor-pointer border border-gray-300">
            <SquareUserRound size={170} color="#334155" strokeWidth={1.5} />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Pessoa Física</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Você irá negociar títulos como um indivíduo singular, utilizando
                seus próprios recursos e não os recursos de uma empresa ou
                entidade jurídica.
              </p>
            </div>
          </div>

          <div onClick={() => handleClick("pessoa_juridica")}  className="flex flex-col items-center bg-white rounded-lg overflow-hidden pt-3 sm:w-1/2 transition duration-300 ease-in-out transform hover:shadow-xl hover:cursor-pointer border border-gray-300">
            <Building2 size={170} color="#334155" strokeWidth={1.5} />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Pessoa Jurídica</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Você irá negociar títulos em nome de uma empresa ou entidade
                legal, utilizando os recursos e informações associados a essa
                entidade.
              </p>
            </div>
          </div>
        </div>
      </div>
      <button type="button" onClick={onVoltar} className="mt-10 rounded-3xl bg-white p-2 text-slate-700 border-slate-600 border-2 transition duration-300 ease-in-out transform hover:shadow-xl hover:bg-slate-600 hover:text-white">Voltar</button>
    </div>
  );
}
