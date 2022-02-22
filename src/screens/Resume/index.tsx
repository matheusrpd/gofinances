import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useTheme } from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';

import { useAuth } from '../../contexts/AuthContext';

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
	LoadContainer,
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
	const [isLoading, setIsLoading] = useState(false);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
		[]
	);

	const theme = useTheme();

	const { user } = useAuth();

	function handleDateChange(action: 'next' | 'prev') {
		if (action === 'next') {
			setSelectedDate(addMonths(selectedDate, 1));
		} else {
			setSelectedDate(subMonths(selectedDate, 1));
		}
	}

	async function loadTransactions() {
		setIsLoading(true);

		const dataKey = `@gofinances:transactions_user:${user?.id}`;
		const response = await AsyncStorage.getItem(dataKey);
		const responseFormatted = response ? JSON.parse(response) : [];

		const expensives = responseFormatted.filter(
			(transaction: Transaction) =>
				transaction.type === 'down' &&
				new Date(transaction.date).getMonth() === selectedDate.getMonth() &&
				new Date(transaction.date).getFullYear() === selectedDate.getFullYear()
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
		setIsLoading(false);
	}

	useFocusEffect(
		useCallback(() => {
			loadTransactions();
		}, [selectedDate])
	);

	return (
		<Container>
			<Header>
				<Title>Resumo por categoria</Title>
			</Header>

			{isLoading ? (
				<LoadContainer>
					<ActivityIndicator color={theme.colors.primary} size="large" />
				</LoadContainer>
			) : (
				<Content
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{
						paddingHorizontal: 24,
						paddingBottom: useBottomTabBarHeight(),
					}}
				>
					<MonthSelect>
						<MonthSelectButton onPress={() => handleDateChange('prev')}>
							<MonthSelectIcon name="chevron-left" />
						</MonthSelectButton>

						<Month>
							{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}
						</Month>

						<MonthSelectButton onPress={() => handleDateChange('next')}>
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
			)}
		</Container>
	);
}
