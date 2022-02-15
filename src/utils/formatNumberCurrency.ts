export function formatNumberCurrency(number: number) {
  let amount = Number(number).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  amount = amount.replace('R$', 'R$ ');

  return amount;
}