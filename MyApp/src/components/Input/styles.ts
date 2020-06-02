import styled, {css} from 'styled-components/native';

interface Props {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<Props>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #012;
  border-radius: 10px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.isErrored &&
    css`
      border-width: 2px;
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-width: 2px;
      border-color: #ff9000;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;
