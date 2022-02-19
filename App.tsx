import { ThemeProvider } from 'styled-components';
import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
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

import { AppRoutes } from './src/Routes/app.routes';
import { SignIn } from './src/screens/SignIn';

export default function App() {
	const [fontsLoader] = useFonts({
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_700Bold,
	});

	if (!fontsLoader) {
		return <AppLoading />;
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ThemeProvider theme={theme}>
				<NavigationContainer>
					<StatusBar
						barStyle="light-content"
						backgroundColor="transparent"
						translucent
					/>
					<SignIn />
				</NavigationContainer>
			</ThemeProvider>
		</GestureHandlerRootView>
	);
}
