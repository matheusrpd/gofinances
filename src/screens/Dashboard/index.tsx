import { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';

import { HighlightCard } from '../../components/HighlightCard';
import {
	TransactionCard,
	TransactionCardData,
} from '../../components/TransactionCard';

import {
	Container,
	Header,
	UserWrapper,
	UserInfo,
	Photo,
	User,
	UserGreeting,
	UserName,
	LogouButton,
	Icon,
	HighlightCards,
	Transactions,
	Title,
	TransactionsList,
	LoadContainer,
} from './styles';
import { formatNumberCurrency } from '../../utils/formatNumberCurrency';
import { getLastTransactionDate } from '../../utils/getLastTransactionDate';

export interface CardListProps extends TransactionCardData {
	id: string;
}

type HighlightData = {
	amount: string;
	lastTransaction: string;
};

type HighlightCardData = {
	entries: HighlightData;
	expensive: HighlightData;
	total: HighlightData;
};

export function Dashboard() {
	const [transactions, setTransactions] = useState<CardListProps[]>([]);
	const [highlightCardData, setHighlightCardData] = useState<HighlightCardData>(
		{} as HighlightCardData
	);
	const [isLoading, setIsLoading] = useState(true);
	const theme = useTheme();

	const { user, signOut } = useAuth();

	const dataKey = `@gofinances:transactions_user:${user?.id}`;

	async function loadTransactions() {
		const response = await AsyncStorage.getItem(dataKey);
		const transactions = response ? JSON.parse(response) : [];

		let entriesTotal = 0;
		let expensiveTotal = 0;

		const transactionsFormatted: CardListProps[] = transactions.map(
			(transaction: CardListProps) => {
				if (transaction.type === 'up') {
					entriesTotal += Number(transaction.amount);
				} else {
					expensiveTotal += Number(transaction.amount);
				}

				let amount = formatNumberCurrency(Number(transaction.amount));

				const date = Intl.DateTimeFormat('pt-BR', {
					day: '2-digit',
					month: '2-digit',
					year: '2-digit',
				}).format(new Date(transaction.date));

				return {
					...transaction,
					amount,
					date,
				};
			}
		);

		setTransactions(transactionsFormatted);

		const lastTransactionsEntries = getLastTransactionDate(transactions, 'up');
		const lastTransactionsExpensives = getLastTransactionDate(
			transactions,
			'down'
		);
		const totalInterval =
			lastTransactionsExpensives === 0
				? 'N??o h?? transa????es'
				: `01 ?? ${lastTransactionsExpensives}`;

		const total = entriesTotal - expensiveTotal;

		setHighlightCardData({
			entries: {
				amount: formatNumberCurrency(entriesTotal),
				lastTransaction:
					lastTransactionsEntries === 0
						? 'N??o h?? transa????es'
						: `??ltima entrada dia ${lastTransactionsEntries}`,
			},
			expensive: {
				amount: formatNumberCurrency(expensiveTotal),
				lastTransaction:
					lastTransactionsExpensives === 0
						? 'N??o h?? transa????es'
						: `??ltima sa??da dia ${lastTransactionsExpensives}`,
			},
			total: {
				amount: formatNumberCurrency(total),
				lastTransaction: totalInterval,
			},
		});

		setIsLoading(false);
	}

	async function removeAll() {
		await AsyncStorage.removeItem(dataKey);
	}

	useFocusEffect(
		useCallback(() => {
			loadTransactions();
		}, [])
	);

	return (
		<Container>
			{isLoading ? (
				<LoadContainer>
					<ActivityIndicator color={theme.colors.primary} size="large" />
				</LoadContainer>
			) : (
				<>
					<Header>
						<UserWrapper>
							<UserInfo>
								<Photo source={{ uri: user?.photo }} />
								<User>
									<UserGreeting>Ol??,</UserGreeting>
									<UserName>{user?.name}</UserName>
								</User>
							</UserInfo>

							<LogouButton onPress={signOut}>
								<Icon name="power" />
							</LogouButton>
						</UserWrapper>
					</Header>

					<HighlightCards>
						<HighlightCard
							type="up"
							title="Entradas"
							amount={highlightCardData.entries.amount}
							lastTransaction={highlightCardData.entries.lastTransaction}
						/>
						<HighlightCard
							type="down"
							title="Sa??das"
							amount={highlightCardData.expensive.amount}
							lastTransaction={highlightCardData.expensive.lastTransaction}
						/>
						<HighlightCard
							type="total"
							title="Total"
							amount={highlightCardData.total.amount}
							lastTransaction={highlightCardData.total.lastTransaction}
						/>
					</HighlightCards>

					<Transactions>
						<Title>Listagem</Title>

						<TransactionsList
							data={transactions}
							keyExtractor={(item) => item.id}
							renderItem={({ item }) => <TransactionCard data={item} />}
						/>
					</Transactions>
				</>
			)}
		</Container>
	);
}
