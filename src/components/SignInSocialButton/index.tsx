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
	...rest
}: SignInSocialButtonProps) {
	return (
		<Container {...rest}>
			<ImageContainer>
				<Icon />
			</ImageContainer>

			<Title>{title}</Title>
		</Container>
	);
}
