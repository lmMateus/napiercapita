"use client";

import React, { useState } from "react";
import ProgressionBarComponent from "./components/ProgressionBarComponent";
import PerfilTypeComponent from "./components/PerfilTypeComponent";
import PersonaComponent from "./components/PersonaComponent";
import CadastroPFComponent from "./components/CadastroPFComponent";
import CadastroPJComponent from "./components/CadastroPJComponent";
import SucessoCadastro from "./components/SuccessComponent";
import { postPerfil } from "./api/post-perfil";
import NavbarHomeComponent from "@/app/components/NavbarHomeComponent";

export default function Cadastro() {
  const [etapa, etapaAtual] = useState(1);
  const [tipoPerfil, tipoAtual] = useState("");
  const [tipoPersona, personaAtual] = useState("");
  const [name, setName] = useState("")

  function voltarEstado() {
    etapaAtual(etapa - 1);
  }

  function definirTipoPerfil(tipo) {
    tipoAtual(tipo);
    etapaAtual(etapa + 1);
  }

  function definirPersonaPerfil(tipoPersona) {
     personaAtual(tipoPersona);
     etapaAtual(etapa + 1);
  }

  async function handleDataSubmitPF(formData) {
    const { email, repetir_email, senha, repetir_senha, ...rest } = formData; // Desestruture o objeto formData
    try {
      await postPerfil(email, senha, tipoPerfil, tipoPersona, {rest});
      console.log("Dados enviados com sucesso");
      setName(rest.nome)
      etapaAtual(etapa + 1);
      // Faça algo após o sucesso, como redirecionar o usuário ou exibir uma mensagem de sucesso
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      // Trate o erro de acordo com sua lógica de frontend
    }
  }

  async function handleDataSubmitPJ(formData) {
    const { email, repetir_email, senha, repetir_senha, ...rest } = formData; // Desestruture o objeto formData
    try {
      await postPerfil(email, senha, tipoPerfil, tipoPersona, {rest});
      console.log("Dados enviados com sucesso");
      setName(rest.nome)
      etapaAtual(etapa + 1);
      // Faça algo após o sucesso, como redirecionar o usuário ou exibir uma mensagem de sucesso
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      // Trate o erro de acordo com sua lógica de frontend
    }
  }

  let componente;
  switch (etapa) {
    case 1:
      componente = <PerfilTypeComponent onClick={definirTipoPerfil} />;
      break;
    case 2:
      componente = (
        <PersonaComponent
          onVoltar={voltarEstado}
          onClick={definirPersonaPerfil}
        />
      );
      break;
    case 3:
      if (tipoPersona == "pessoa_fisica") {
        componente = (
          <CadastroPFComponent
            onVoltar={voltarEstado}
            onDataSubmit={handleDataSubmitPF}
          />
        );
      } else {
        componente = (
          <CadastroPJComponent
            onVoltar={voltarEstado}
            onDataSubmit={handleDataSubmitPJ}
          />
        );
      }

      break;
      case 4:
        componente = <SucessoCadastro user={name}/>
        break;
    default:
      componente = null;
  }

  return (
    <>
      <NavbarHomeComponent/>
      {etapa < 4 && (
        <ProgressionBarComponent etapa={etapa} />
      )}
      <div className="flex h-full w-full place-content-center mb-6">
        {componente}
      </div>
    </>
  );
}
