import { FlatList } from 'react-native';
import { categories } from '../../utils/categories';

import { Button } from '../../components/Form/Button';
import {
	Container,
	Header,
	Title,
	Category,
	Icon,
	Name,
	Separator,
	Footer,
} from './styles';

type Category = {
	key: string;
	name: string;
};

interface CategorySelectModalProps {
	category: string;
	setCategory: (category: Category) => void;
	closeSelect: () => void;
}

export function CategorySelectModal({ category }: CategorySelectModalProps) {
	return (
		<Container>
			<Header>
				<Title>Categorias</Title>
			</Header>

			<FlatList
				data={categories}
				style={{ flex: 1, width: '100%' }}
				keyExtractor={(item) => item.key}
				renderItem={({ item }) => (
					<Category>
						<Icon name={item.icon} />
						<Name>{item.name}</Name>
					</Category>
				)}
				ItemSeparatorComponent={() => <Separator />}
			/>

			<Footer>
				<Button title="Selecionar" />
			</Footer>
		</Container>
	);
}
