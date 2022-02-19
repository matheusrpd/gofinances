import { SvgProps } from 'react-native-svg';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, ImageContainer, Title } from './styles';

interface SignInSocialButtonProps extends RectButtonProps {
	title: string;
	icon: React.FC<SvgProps>;
}

export function SignInSocialButton({
	title,
	icon: Icon,
}: SignInSocialButtonProps) {
	return (
		<Container>
			<ImageContainer>
				<Icon />
			</ImageContainer>

			<Title>{title}</Title>
		</Container>
	);
}
