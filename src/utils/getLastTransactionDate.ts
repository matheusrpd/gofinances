import { CardListProps } from "../screens/Dashboard";

export function getLastTransactionDate(collection: CardListProps[], type: 'up' | 'down') {
  const lastTransactions = new Date(Math.max.apply(
    Math,
    collection
      .filter(transaction => transaction.type === type)
      .map(transaction => new Date(transaction.date).getTime())
  ));

  return `${lastTransactions.getDate()} de ${lastTransactions.toLocaleDateString('pt-BR', { month: 'long' })}`;
}