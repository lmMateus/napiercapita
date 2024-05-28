import { CircleDollarSign, ScrollText, Handshake } from "lucide-react";

export default function PersonaCardComponent({ onClick }) {
  const handleClick = (id) => {
    onClick(id);
  };
  return (
    <div className="block border-solid border-2 border-gray-100 rounded-2xl shadow-lg mt-10 w-4/5 h-fit p-5">
      <h1 className="text-center text-2xl font-semibold text-slate-800 mb-4">
        Escolha seu tipo de perfil
      </h1>
      <div className="flex justify-center">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div
            onClick={() => handleClick("investidor")}
            id="Investidor"
            className="flex flex-col items-center bg-white rounded-lg overflow-hidden pt-3 sm:w-1/3 transition duration-300 ease-in-out transform hover:shadow-xl hover:cursor-pointer border border-gray-300"
          >
            <CircleDollarSign size={170} color="#334155" strokeWidth={1.5} />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Investidor</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Ao escolher a opção investidor, você poderá aplicar seu
                dinheiro em títulos de crédito, como títulos do governo ou
                corporativos, buscando retornos por meio de pagamentos de juros
                e valorização ao longo do tempo.
              </p>
            </div>
          </div>

          <div
            onClick={() => handleClick("credor")}
            id="Credor"
            className="flex flex-col items-center bg-white rounded-lg overflow-hidden pt-3 sm:w-1/3 transition duration-300 ease-in-out transform hover:shadow-xl hover:cursor-pointer border border-gray-300"
          >
            <ScrollText size={170} color="#334155" strokeWidth={1.5} />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Credor</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Ao optar pela opção de vender seus próprios títulos, você poderá
                oferecer os títulos que possui para outros investidores. Isso
                permite que você converta seus títulos em dinheiro, aproveitando
                oportunidades de liquidez ou realizando lucros.
              </p>
            </div>
          </div>

          <div
            onClick={() => handleClick("ambos")}
            id="Ambos"
            className="flex flex-col items-center bg-white rounded-lg overflow-hidden pt-3 sm:w-1/3 transition duration-300 ease-in-out transform hover:shadow-xl hover:cursor-pointer border border-gray-300"
          >
            <Handshake size={170} color="#334155" strokeWidth={1.5} />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Ambos</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Ao selecionar a opção que permite tanto investir em títulos
                quanto vendê-los, você terá a flexibilidade de gerenciar seus
                investimentos de acordo com suas necessidades e objetivos
                financeiros.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
