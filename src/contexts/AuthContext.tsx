import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { CLIENT_ID } = process.env;
const { REDIRECT_URL } = process.env;

type User = {
	id: string;
	name: string;
	email: string;
	photo?: string;
};

interface AuthContextData {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	signInWithGoogle: () => Promise<void>;
	signInWithApple: () => Promise<void>;
	signOut: () => Promise<void>;
}

interface AuthProviderProps {
	children: ReactNode;
}

interface AuthorizationResponse {
	params: {
		access_token: string;
	};
	type: string;
}

const userStoragedKey = '@gofinances:user';

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const isAuthenticated = !!user;

	useEffect(() => {
		async function loadStoragedUser() {
			const data = await AsyncStorage.getItem(userStoragedKey);

			if (data) {
				const userLogged = JSON.parse(data) as User;

				setUser(userLogged);
			}

			setIsLoading(false);
		}

		loadStoragedUser();
	}, []);

	async function signInWithGoogle() {
		try {
			const RESPONSE_TYPE = 'token';
			const SCOPE = encodeURI('profile email');

			const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

			const { type, params } = (await AuthSession.startAsync({
				authUrl,
			})) as AuthorizationResponse;

			if (type === 'success') {
				const response = await fetch(
					`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
				);
				const userInfo = await response.json();

				const userLogged = {
					id: userInfo.id,
					email: userInfo.email,
					name: userInfo.given_name,
					photo: userInfo.picture,
				};

				setUser(userLogged);

				await AsyncStorage.setItem(userStoragedKey, JSON.stringify(userLogged));
			}
		} catch (error) {
			throw new Error(error as string);
		}
	}

	async function signInWithApple() {
		try {
			const credential = await AppleAuthentication.signInAsync({
				requestedScopes: [
					AppleAuthentication.AppleAuthenticationScope.EMAIL,
					AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
				],
			});

			if (credential) {
				const name = credential.fullName?.givenName!;
				const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;

				const userLogged = {
					id: String(credential.user),
					email: credential.email!,
					name,
					photo,
				};

				setUser(userLogged);

				await AsyncStorage.setItem(userStoragedKey, JSON.stringify(userLogged));
			}
		} catch (error) {
			throw new Error(error as string);
		}
	}

	async function signOut() {
		setUser(null);
		await AsyncStorage.removeItem(userStoragedKey);
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated,
				isLoading,
				signInWithGoogle,
				signInWithApple,
				signOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
