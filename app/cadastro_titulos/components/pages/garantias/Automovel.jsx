import React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
export default function Automovel({onDataSubmit}) {
  const [formValue, setFormValue] = useState({
    garantia_renavan:'',
    garantia_placa:'',
    garantia_tipo_veiculo:'',
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
      <h2 className="text-xl mb-2 font-bold">Veiculo</h2>
      <div className="flex flex-col md:flex-row justify-evenly gap-2">
      <div>
          <label htmlFor="garantia_renavan" className="block mb-1">
            Renavan do Veiculo
          </label>
          <input
            type="text"
            name="garantia_renavan"
            id="garantia_renavan"
            value={formValue.garantia_renavan}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="">
          <label htmlFor="garantia_placa" className="block mb-1">
            Placa do Veiculo
          </label>
          <input
            type="text"
            name="garantia_placa"
            id="garantia_placa"
            value={formValue.garantia_placa}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="">
          <label htmlFor="garantia_tipo_veiculo" className="block mb-1">
            Tipo do Veiculo
          </label>
          <input
            type="text"
            name="garantia_tipo_veiculo"
            id="garantia_tipo_veiculo"
            value={formValue.garantia_tipo_veiculo}
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