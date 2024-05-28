export async function consultarCEP(cep) {
  const url = `http://viacep.com.br/ws/${cep}/json/`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erro ao obter os dados do CEP");
    }

    const data = await response.json();

    // Verifica se a resposta contém a palavra "erro"
    if (data && data.erro) {
      throw new Error("CEP não encontrado");
    }

    return { data };
  } catch (error) {
    return "900"
  }
}

