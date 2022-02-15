import { categories } from '../../utils/categories';
import {
	Container,
	Title,
	Amount,
	Footer,
	Category,
	Icon,
	CategoryName,
	Date,
} from './styles';

export interface TransactionCardData {
	type: 'up' | 'down';
	name: string;
	amount: string;
	category: string;
	date: string;
}

interface TransactionCardProps {
	data: TransactionCardData;
}

export function TransactionCard({ data }: TransactionCardProps) {
	const category = categories.filter((item) => item.key === data.category)[0];

	return (
		<Container>
			<Title>{data.name}</Title>
			<Amount type={data.type}>
				{data.type === 'down' && '- '}
				{data.amount}
			</Amount>

			<Footer>
				<Category>
					<Icon name={category?.icon} />
					<CategoryName>{category?.name}</CategoryName>
				</Category>

				<Date>{data.date}</Date>
			</Footer>
		</Container>
	);
}
