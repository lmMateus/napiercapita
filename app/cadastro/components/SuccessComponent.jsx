import React from 'react';
import { UserRoundCheck } from 'lucide-react';

const SucessoCadastro = ({ user }) => {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <div className="mb-4 flex justify-center">
            <UserRoundCheck size={90} strokeWidth={1.75} />
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-center">Cadastro realizado com sucesso!</h2>
          <p className="text-lg text-center">Bem-vindo a plataforma {user}</p>
          <p className="text-lg text-center">Você recebera uma confirmação de e-mail no endereço cadastrado</p>
        </div>
      </div>
    );
  }
  
export default SucessoCadastro;
  



