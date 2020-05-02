import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface Props {
  isFocused?: boolean;
  isFilled?: boolean;
  hasError?: boolean;
}

export const Container = styled.div<Props>`
  background-color: #012;
  color: #999;
  height: 4em;
  padding: 10px;
  margin: 0.5em auto;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    flex: 1;
    background-color: transparent;
    margin: 0 1em;
    border: 0;
    color: #ddd;
    font-size: 1.25em;

    &::placeholder {
      color: #999;
    }
  }

  ${({ isFocused }) =>
    isFocused &&
    css`
      border: 2px solid #5af;
      color: #5af;
    `}

  ${({ isFilled }) =>
    isFilled &&
    css`
      color: #5af;
    `}

  ${({ hasError }) =>
    hasError &&
    css`
      border: 2px solid #c53030;
      color: #c53030;
    `}
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
    color: #c53030;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
