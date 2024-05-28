import React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Outro({onDataSubmit}) {
  const [formValue, setFormValue] = useState({
    garantia_descricao:'',
    garantia_tipo_outro:'',
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
      <h2 className="text-xl mb-2 font-bold">Outro</h2>
      <div className="flex flex-col md:flex-row justify-evenly gap-2">
      <div>
          <label htmlFor="garantia_descricao" className="block mb-1">
            Descrição
          </label>
          <input
            type="text"
            name="garantia_descricao"
            id="garantia_descricao"
            value={formValue.garantia_descricao}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="">
          <label htmlFor="garantia_tipo_outro" className="block mb-1">
            Tipo
          </label>
          <input
            type="text"
            name="garantia_tipo_outro"
            id="garantia_tipo_outro"
            value={formValue.garantia_tipo_outro}
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