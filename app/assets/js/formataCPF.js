export function formatarCPF(cpf) {
    // Remover todos os caracteres não numéricos
    const numeros = cpf.replace(/\D/g, '');
    
    // Dividir o CPF em tokens
    const tokens = [
        numeros.slice(0, 3),
        numeros.slice(3, 6),
        numeros.slice(6, 9),
        numeros.slice(9, 11)
    ];
    
    // Formatar os tokens
    const cpfFormatado = tokens.join('.') + '-' + numeros.slice(9);

    return cpfFormatado;
}