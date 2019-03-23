import styled from 'styled-components';

const ErrorWall = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  text-align: center;

  &.load-error {
    background-color: #f3785e;
  }
  &.matinence {
    background-color: #a473b1;
  }
  &.missing-page {
    background-color: #00bbc6;
  }
  & .error-container {
    display: block;
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
  }
  & .error-container h1 {
    color: #fff;
    font-size: 80px;
    margin: 0;
  }
  @media (max-width: 850px) {
    & .error-container h1 {
      font-size: 65px;
    }
  }
  & .error-container h3 {
    color: #464444;
    font-size: 34px;
    margin: 0;
  }
  @media (max-width: 850px) {
    & .error-container h3 {
      font-size: 25px;
    }
  }
  & .error-container h4 {
    margin: 0;
    color: #fff;
    font-size: 40px;
  }
  @media (max-width: 850px) {
    & .error-container h4 {
      font-size: 35px;
    }
  }
  & .error-container p {
    font-size: 15px;
  }
  & .error-container p:first-of-type {
    color: #464444;
    font-weight: lighter;
  }
  & .error-container p:nth-of-type(2) {
    color: #464444;
    font-weight: bold;
  }
  & .error-container p.type-white {
    color: #fff;
  }
  @media (max-width: 850px) {
    & .error-container p {
      font-size: 12px;
    }
  }
  @media (max-width: 390px) {
    & .error-container p {
      font-size: 10px;
    }
  }
`;

export default ErrorWall;
