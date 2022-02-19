import {
	Container,
	Header,
	TitleWrapper,
	Title,
	SignTitle,
	Footer,
	FooterWrapper,
} from './styles';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { SignInSocialButton } from '../../components/SignInSocialButton';

export function SignIn() {
	return (
		<Container>
			<Header>
				<TitleWrapper>
					<LogoSvg width={RFValue(120)} height={RFValue(68)} />

					<Title>
						Controle suas {'\n'} finanças de forma {'\n'} muito simples
					</Title>
				</TitleWrapper>

				<SignTitle>Faça seu login com {'\n'} uma das contas abaixo</SignTitle>
			</Header>

			<Footer>
				<FooterWrapper>
					<SignInSocialButton title="Entrar com Google" icon={GoogleSvg} />
					<SignInSocialButton title="Entrar com Apple" icon={AppleSvg} />
				</FooterWrapper>
			</Footer>
		</Container>
	);
}