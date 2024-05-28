export function formatarTelefone(event) {
    // Obtém o valor atual do input
    let input = event.target.value;
    
    // Remove todos os caracteres não numéricos do valor
    input = input.replace(/\D/g, '');

    // Verifica o tamanho do valor para aplicar a máscara correta
    if (input.length === 11) {
      // Formata como celular (DD) 9XXXX-XXXX
      input = input.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else {
      // Formata como telefone (DD) XXXX-XXXX
      input = input.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }

    // Limita a quantidade máxima de caracteres
    const maxLength = 15; // (XX) XXXXX-XXXX ou (XX) 9XXXX-XXXX
    if (input.length > maxLength) {
      input = input.slice(0, maxLength);
    }

    // Atualiza o valor do input
    event.target.value = input;
  }

export function formatarNumeroTelefoneCNPJ(numero) {
    // Remove todos os caracteres não numéricos do número
    const digitsOnly = numero.replace(/\D/g, '');

    // Verifica se o número tem exatamente 11 dígitos
    if (digitsOnly.length === 11) {
        // Formata o número como (XX) 9XXXX-XXXX para celular
        return `(${digitsOnly.slice(0, 2)}) ${digitsOnly[2]} ${digitsOnly.slice(3, 7)}-${digitsOnly.slice(7)}`;
    } else if (digitsOnly.length === 10) {
        // Formata o número como (XX) XXXX-XXXX para telefone fixo
        return `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 6)}-${digitsOnly.slice(6)}`;
    } else {
        // Se não tiver 10 ou 11 dígitos, retorna o número original
        return numero;
    }
}

export function formatarCapitalSocialCNPJ(valor) {

    // Remove todos os caracteres não numéricos do valor e converte para número
    const digitsOnly = parseFloat(valor);

    // Formata o valor como uma representação monetária
    const formattedValue = digitsOnly.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

    return formattedValue;
}

export function aplicarMascaraMoedaReal(event) {
    // Obtém o valor atual do input
    let valor = event.target.value;

    // Remove todos os caracteres não numéricos do valor
    const digitsOnly = parseFloat(valor.replace(",","."));

    // Formata o valor como uma representação monetária
    const formattedValue = digitsOnly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // Atualiza o valor do input
    event.target.value = formattedValue;
}

export function formatarNumeroCEP(numero) {
    // Remove todos os caracteres não numéricos do número
    const digitsOnly = numero.replace(/\D/g, '');

    // Verifica se o número tem exatamente 8 dígitos
    if (digitsOnly.length === 8) {
        // Formata o número como XXXXX-XXX
        return `${digitsOnly.slice(0, 5)}-${digitsOnly.slice(5)}`;
    } else {
        // Se não tiver 8 dígitos, retorna o número original
        return numero;
    }
}

export function formatarCEP(event) {
    // Obtém o valor atual do input
    let input = event.target.value;
    
    // Remove todos os caracteres não numéricos do valor
    input = input.replace(/\D/g, '');

    // Formata como XXXXX-XXX
    input = input.replace(/^(\d{5})(\d{3})/, '$1-$2');

    // Limita a quantidade máxima de caracteres
    const maxLength = 9; // XXXXX-XXX
    if (input.length > maxLength) {
      input = input.slice(0, maxLength);
    }

    // Atualiza o valor do input
    event.target.value = input;
}
