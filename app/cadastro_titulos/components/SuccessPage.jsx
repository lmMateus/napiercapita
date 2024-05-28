import React from 'react';
import { Landmark } from 'lucide-react';

const SuccessPage = ({ user }) => {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <div className="mb-4 flex justify-center">
            <Landmark size={90} strokeWidth={1.75} />
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-center">Titulo cadastrado com sucesso!</h2>
          <p className="text-lg text-center">Você poderá verificar seus títulos cadastrados no seu perfil.</p>
        </div>
      </div>
    );
  }
  
export default SuccessPage;