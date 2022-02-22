import { ThemeProvider } from 'styled-components';
import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import {
	useFonts,
	Poppins_400Regular,
	Poppins_500Medium,
	Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';

import { AuthProvider, useAuth } from './src/contexts/AuthContext';

import { Routes } from './src/routes';

export default function App() {
	const [fontsLoader] = useFonts({
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_700Bold,
	});

	const { isLoading } = useAuth();

	if (!fontsLoader || isLoading) {
		return <AppLoading />;
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ThemeProvider theme={theme}>
				<AuthProvider>
					<StatusBar
						barStyle="light-content"
						backgroundColor="transparent"
						translucent
					/>
					<Routes />
				</AuthProvider>
			</ThemeProvider>
		</GestureHandlerRootView>
	);
}
