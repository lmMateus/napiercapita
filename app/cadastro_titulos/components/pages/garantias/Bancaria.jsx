import React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Bancaria({onDataSubmit }) {


  const [formValue, setFormValue] = useState({
    garantia_num_banco:'',
    garantia_num_conta:'',
    garantia_tipo_conta:'',
    valor_garantia:''
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onDataSubmit(formValue)
  };

  return (
    <div className="border-2 rounded-lg p-2">
      <h2 className="text-xl mb-2 font-bold">Bancária</h2>
      <div className="flex flex-col md:flex-row justify-evenly gap-2">
      <div>
          <label htmlFor="garantia_num_banco" className="block mb-1">
            Número do Banco
          </label>
          <input
            type="text"
            name="garantia_num_banco"
            id="garantia_num_banco"
            value={formValue.garantia_num_banco}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="">
          <label htmlFor="garantia_num_conta" className="block mb-1">
            Número da Conta
          </label>
          <input
            type="text"
            name="garantia_num_conta"
            id="garantia_num_conta"
            value={formValue.garantia_num_conta}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="">
          <label htmlFor="garantia_tipo_conta" className="block mb-1">
            Tipo de Conta
          </label>
          <input
            type="text"
            name="garantia_tipo_conta"
            id="garantia_tipo_conta"
            value={formValue.garantia_tipo_conta}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="">
          <label htmlFor="valor_garantia" className="block mb-1">
            Valor
          </label>
          <input
            type="text"
            name="valor_garantia"
            id="valor_garantia"
            value={formValue.valor_garantia}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <Button type="button" onClick={handleSubmit} className="self-end">
          Salvar
        </Button>
      </div>
    </div>
  );
}
