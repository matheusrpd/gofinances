import { RFValue } from 'react-native-responsive-fontsize';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../contexts/AuthContext';
import { Alert } from 'react-native';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import {
	Container,
	Header,
	TitleWrapper,
	Title,
	SignTitle,
	Footer,
	FooterWrapper,
} from './styles';

export function SignIn() {
	const { signInWithGoogle } = useAuth();

	async function handleSignInWithGoogle() {
		try {
			await signInWithGoogle();
		} catch (error) {
			console.error(error);

			Alert.alert(
				'Erro no login',
				'Erro ao realizar login com o Google, tente novamente.'
			);
		}
	}

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
					<SignInSocialButton
						title="Entrar com Google"
						icon={GoogleSvg}
						onPress={handleSignInWithGoogle}
					/>
					<SignInSocialButton title="Entrar com Apple" icon={AppleSvg} />
				</FooterWrapper>
			</Footer>
		</Container>
	);
}
