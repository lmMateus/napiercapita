export async function getCNPJ(cnpj) {
  const url = `https://publica.cnpj.ws/cnpj/${cnpj}`;

  try {
    const response = await fetch(url);
    
    if (response.status === 400) {
      throw new Error('CNPJ Inválido');
    }
    if (!response.ok) {
      throw new Error("Erro ao obter os dados do CNPJ");
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return null
  }
}
