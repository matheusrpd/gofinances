import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native';

export const Container = styled(TouchableOpacity).attrs({
	activeOpacity: 0.7,
})`
	background-color: ${({ theme }) => theme.colors.shape};
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	border-radius: 5px;
	padding: 18px 16px;
`;

export const Category = styled.Text`
	font-size: ${RFValue(14)}px;

	${({ theme }) => css`
		color: ${theme.colors.text_dark};
		font-family: ${theme.fonts.regular};
	`}
`;

export const Icon = styled(Feather)`
	font-size: ${RFValue(20)}px;
	color: ${({ theme }) => theme.colors.text};
`;
