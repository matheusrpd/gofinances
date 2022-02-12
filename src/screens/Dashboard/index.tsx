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
} from './styles';

export interface CardListProps extends TransactionCardData {
	id: string;
}

export function Dashboard() {
	const data: CardListProps[] = [
		{
			id: '1',
			type: 'positive',
			title: 'Desenvolvimento de site',
			amount: 'R$ 12.000,00',
			date: '10/02/2022',
			category: { name: 'Vendas', icon: 'dollar-sign' },
		},
		{
			id: '2',
			type: 'negative',
			title: 'Hambugueria Pizzy',
			amount: 'R$ 59,00',
			date: '07/02/2022',
			category: { name: 'Alimentação', icon: 'coffee' },
		},
		{
			id: '3',
			type: 'negative',
			title: 'Aluguel do apartamento',
			amount: 'R$ 1.200,00',
			date: '05/02/2022',
			category: { name: 'Casa', icon: 'shopping-bag' },
		},
	];

	return (
		<Container>
			<Header>
				<UserWrapper>
					<UserInfo>
						<Photo source={{ uri: 'https://github.com/matheusrpd.png' }} />
						<User>
							<UserGreeting>Olá,</UserGreeting>
							<UserName>Matheus</UserName>
						</User>
					</UserInfo>

					<LogouButton>
						<Icon name="power" />
					</LogouButton>
				</UserWrapper>
			</Header>

			<HighlightCards>
				<HighlightCard
					type="up"
					title="Entradas"
					amount="R$ 17.400,00"
					lastTransaction="Última entrada dia 10 de fevereiro"
				/>
				<HighlightCard
					type="down"
					title="Saídas"
					amount="R$ 17.400,00"
					lastTransaction="Última entrada dia 10 de fevereiro"
				/>
				<HighlightCard
					type="total"
					title="Total"
					amount="R$ 17.400,00"
					lastTransaction="Última entrada dia 10 de fevereiro"
				/>
			</HighlightCards>

			<Transactions>
				<Title>Listagem</Title>

				<TransactionsList
					data={data}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <TransactionCard data={item} />}
				/>
			</Transactions>
		</Container>
	);
}
