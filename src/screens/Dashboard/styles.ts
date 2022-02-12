import styled from 'styled-components/native';
import { FlatList, FlatListProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';

import { CardListProps } from './index';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  justify-content: flex-start;
  height: ${RFPercentage(42)}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const UserWrapper = styled.View`
  width: 100%;

  padding: 0 ${RFValue(24)}px;
  margin-top: ${getStatusBarHeight() + RFValue(28)}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 10px;
`;

export const User = styled.View`
  margin-left: 16px;
`;

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(18)}px;
`;

export const LogouButton = styled(BorderlessButton)``;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`;

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingLeft: 24, paddingRight: 8 } // 8 na direita pois já tem 16 do card
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(20)}px; 
`; 

export const Transactions = styled.View`
  flex: 1;
  padding: 0 ${RFValue(24)}px;
  margin-top: ${RFPercentage(12)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  margin-bottom: 16px;
`;  

export const TransactionsList = styled(
  FlatList as new (props: FlatListProps<CardListProps>) => FlatList<CardListProps>)
  .attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
      paddingBottom: getBottomSpace(),
    }
})``;