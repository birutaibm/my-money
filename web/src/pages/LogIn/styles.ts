import styled from 'styled-components';

import background from '../../assets/countries-money.jpg';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: url(${background}) no-repeat center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: #123;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5em;
  border-radius: 1em;
  box-shadow: 10px 10px 2px rgba(0, 0, 0, 0.5);
  margin-top: 200px;

  img {
    max-width: 400px;
    max-height: 400px;
    margin-top: -50%;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
      background-color: #102;
      border: 0;
      height: 4em;
      width: 16em;
      margin: 1em auto;
      border-radius: 10px;
      font-size: 1.25em;
      font-weight: bold;
      color: #efd;
    }
  }
`;

export const Title = styled.h1`
  color: #eff;
  text-align: center;
  margin: 0.5em auto;
`;
