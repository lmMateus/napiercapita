export function formatarParaReal(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function calculaLucro(price, offerPrice) {
    return price - offerPrice;
}