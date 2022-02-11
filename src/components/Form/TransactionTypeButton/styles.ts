import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface IconProps {
  type: 'up' | 'down';
}

interface ContainerProps {
  isActive: boolean;
  type: 'up' | 'down';
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 48%;
  padding: 16px 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border: 1.5px solid ${({ theme }) => theme.colors.text};
  border-radius: 5px;
  
  ${({ theme, isActive, type }) => isActive && type === 'up' && css`
    background-color: ${theme.colors.sucess_light};
    border: 0;
  `}

  ${({ theme, isActive, type }) => isActive && type === 'down' && css`
    background-color: ${theme.colors.attention_light};
    border: 0;
  `}
`;

export const Icon = styled(Feather)<IconProps>`
  margin-right: 12px;
  font-size: ${RFValue(24)}px;

  color: ${({ theme, type }) => 
    type === 'up' ? theme.colors.sucess : theme.colors.attention
  }
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.text_dark};
    font-family: ${theme.fonts.regular};
  `}

  font-size: ${RFValue(14)}px;
`;