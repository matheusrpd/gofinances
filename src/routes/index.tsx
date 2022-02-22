import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../contexts/AuthContext';

import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

export function Routes() {
	const { isAuthenticated } = useAuth();

	return (
		<NavigationContainer>
			{isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
		</NavigationContainer>
	);
}
