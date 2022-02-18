import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { categories } from '../../utils/categories';
import { formatNumberCurrency } from '../../utils/formatNumberCurrency';

import { HistoryCard } from '../../components/HistoryCard';
import {
	Container,
	Header,
	Title,
	Content,
	ChartContainer,
	MonthSelect,
	MonthSelectButton,
	MonthSelectIcon,
	Month,
} from './styles';

interface Transaction {
	type: 'up' | 'down';
	name: string;
	amount: string;
	category: string;
	date: string;
}

interface CategoryData {
	key: string;
	name: string;
	total: number;
	totalFormatted: string;
	percent: string;
	color: string;
}

export function Resume() {
	const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
		[]
	);

	async function loadTransactions() {
		const dataKey = '@gofinances:transactions';
		const response = await AsyncStorage.getItem(dataKey);
		const responseFormatted = response ? JSON.parse(response) : [];

		const expensives = responseFormatted.filter(
			(transaction: Transaction) => transaction.type === 'down'
		);

		const expensivesTotal = expensives.reduce(
			(acc: number, expensive: Transaction) => {
				return acc + Number(expensive.amount);
			},
			0
		);

		const totalByCategory: CategoryData[] = [];

		categories.forEach((category) => {
			let categorySum = 0;

			expensives.forEach((expensive: Transaction) => {
				if (expensive.category === category.key) {
					categorySum += Number(expensive.amount);
				}
			});

			const percent = `${((categorySum / expensivesTotal) * 100).toFixed(0)}%`;

			if (categorySum > 0) {
				totalByCategory.push({
					key: category.key,
					name: category.name,
					total: categorySum,
					totalFormatted: formatNumberCurrency(categorySum),
					percent,
					color: category.color,
				});
			}
		});

		setTotalByCategories(totalByCategory);
	}

	useEffect(() => {
		loadTransactions();
	}, []);

	return (
		<Container>
			<Header>
				<Title>Resumo por categoria</Title>
			</Header>

			<Content
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{
					flex: 1,
					paddingHorizontal: 24,
					paddingBottom: useBottomTabBarHeight(),
				}}
			>
				<MonthSelect>
					<MonthSelectButton>
						<MonthSelectIcon name="chevron-left" />
					</MonthSelectButton>

					<Month>Fevereiro</Month>

					<MonthSelectButton>
						<MonthSelectIcon name="chevron-right" />
					</MonthSelectButton>
				</MonthSelect>

				<ChartContainer>
					<VictoryPie
						data={totalByCategories}
						x="percent"
						y="total"
						colorScale={totalByCategories.map((category) => category.color)}
						labelRadius={50}
						style={{
							labels: {
								fontSize: RFValue(18),
								fontWeight: 'bold',
								fill: 'white',
							},
						}}
					/>
				</ChartContainer>

				{totalByCategories.map((item) => (
					<HistoryCard
						key={item.key}
						title={item.name}
						amount={item.totalFormatted}
						color={item.color}
					/>
				))}
			</Content>
		</Container>
	);
}
