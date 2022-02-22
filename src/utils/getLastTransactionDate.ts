import { CardListProps } from '../screens/Dashboard';

export function getLastTransactionDate(
	collection: CardListProps[],
	type: 'up' | 'down'
) {
	const collectionFilttred = collection.filter(
		(transaction) => transaction.type === type
	);

	if (collectionFilttred.length === 0) {
		return 0;
	}

	const lastTransactions = new Date(
		Math.max.apply(
			Math,
			collectionFilttred.map((transaction) =>
				new Date(transaction.date).getTime()
			)
		)
	);

	return `${lastTransactions.getDate()} de ${lastTransactions.toLocaleDateString(
		'pt-BR',
		{ month: 'long' }
	)}`;
}
