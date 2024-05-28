"use client";
import React, { useState } from "react";
import NavbarHomeComponent from "@/app/components/NavbarHomeComponent";

import DebenturePage from "./components/pages/DebenturePage";
import ChequePage from "./components/pages/ChequePage";
import CreditoTributarioPage from "./components/pages/CreditoTributarioPage";
import FactoringPage from "./components/pages/FactoringPage";
import NotaPromissoriaPage from "./components/pages/NotaPromissoriaPage";
import SelectTitlePage from "./components/pages/SelectTitlePage";
import SuccessPage from "./components/SuccessPage";

export default function Cadastro_Titulos() {
  const [showCards, setShowCards] = useState(true);
  const [showForm, setShowForm] = useState(null);

  const handleTitleChoose = (tipoTitulo) => {
    switch (tipoTitulo) {
      case "cheque":
        setShowForm(1);
        break;
      case "credito_tributario":
        setShowForm(2);
        break;
      case "debenture":
        setShowForm(3);
        break;
      case "factoring":
        setShowForm(4);
        break;
      case "nota_promissoria":
        setShowForm(5);
        break;
      default:
        setShowForm(null);
    }
    setShowCards(false);
  };

  const handleVoltar = () => {
    setShowCards(true);
    setShowForm(null);
  };

  const handleSubmit = () => {
    setShowForm(6)
  }
  return (
    <>
      <NavbarHomeComponent />
      <div className="w-full flex justify-center">
        <div className="block border-solid border-2 border-gray-100 rounded-2xl shadow-lg mt-8 mb-5 w-4/5 h-fit p-5">
          {showCards && <SelectTitlePage onClick={handleTitleChoose} />}
          {showForm === 1 && <ChequePage onVoltar={handleVoltar}/>}
          {showForm === 2 && <CreditoTributarioPage onVoltar={handleVoltar} />}
          {showForm === 3 && <DebenturePage onVoltar={handleVoltar} />}
          {showForm === 4 && <FactoringPage onVoltar={handleVoltar} onSubmit={handleSubmit}/>}
          {showForm === 5 && <NotaPromissoriaPage onVoltar={handleVoltar} />}
          {showForm === 6 && <SuccessPage/>}
        </div>
      </div>
    </>
  );
}
