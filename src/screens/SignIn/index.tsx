import { useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';

import { useAuth } from '../../contexts/AuthContext';

import { SignInSocialButton } from '../../components/SignInSocialButton';

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
	const { signInWithGoogle, signInWithApple } = useAuth();
	const [isLoading, setIsLoading] = useState(false);

	const theme = useTheme();

	async function handleSignInWithGoogle() {
		try {
			setIsLoading(true);
			return await signInWithGoogle();
		} catch (error) {
			console.error(error);

			Alert.alert(
				'Erro no login',
				'Erro ao realizar login com o Google, tente novamente.'
			);

			setIsLoading(false);
		}
	}

	async function handleSignInWithGApple() {
		try {
			setIsLoading(true);
			return await signInWithApple();
		} catch (error) {
			console.error(error);

			Alert.alert(
				'Erro no login',
				'Erro ao realizar login com a Apple, tente novamente.'
			);

			setIsLoading(false);
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
					{Platform.OS === 'ios' && (
						<SignInSocialButton
							title="Entrar com Apple"
							icon={AppleSvg}
							onPress={handleSignInWithGApple}
						/>
					)}
				</FooterWrapper>

				{isLoading && (
					<ActivityIndicator
						color={theme.colors.shape}
						style={{ marginTop: 16 }}
					/>
				)}
			</Footer>
		</Container>
	);
}
