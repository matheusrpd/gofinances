import { FlatList } from 'react-native';
import { categories } from '../../utils/categories';

import { Button } from '../../components/Form/Button';
import {
	Container,
	Header,
	Title,
	CategoryItem,
	Icon,
	Name,
	Separator,
	Footer,
} from './styles';

type Category = {
	key: string;
	name: string;
};

interface CategorySelectProps {
	category: Category;
	setCategory: (category: Category) => void;
	closeSelectCategory: () => void;
}

export function CategorySelect({
	category,
	setCategory,
	closeSelectCategory,
}: CategorySelectProps) {
	function handleCategorySelect(category: Category) {
		setCategory(category);
	}

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
					<CategoryItem
						onPress={() => handleCategorySelect(item)}
						isActive={category.key === item.key}
						activeOpacity={0.6}
					>
						<Icon name={item.icon} />
						<Name>{item.name}</Name>
					</CategoryItem>
				)}
				ItemSeparatorComponent={() => <Separator />}
			/>

			<Footer>
				<Button title="Selecionar" onPress={closeSelectCategory} />
			</Footer>
		</Container>
	);
}
