import React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
export default function Imobiliaria({onDataSubmit}) {
  const [formValue, setFormValue] = useState({
    garantia_matricula:'',
    garantia_cartorio:'',
    garantia_comarca:'',
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
      <h2 className="text-xl mb-2 font-bold">Imobiliária</h2>
      <div className="flex flex-col md:flex-row justify-evenly gap-2">
      <div>
          <label htmlFor="garantia_matricula" className="block mb-1">
            Matricula do Imóvel
          </label>
          <input
            type="text"
            name="garantia_matricula"
            id="garantia_matricula"
            value={formValue.garantia_matricula}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="">
          <label htmlFor="garantia_cartorio" className="block mb-1">
            Registro do Cartório
          </label>
          <input
            type="text"
            name="garantia_cartorio"
            id="garantia_cartorio"
            value={formValue.garantia_cartorio}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="">
          <label htmlFor="garantia_comarca" className="block mb-1">
            Comarca do Imóvel
          </label>
          <input
            type="text"
            name="garantia_comarca"
            id="garantia_comarca"
            value={formValue.garantia_comarca}
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
