import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Spin } from 'antd';

const Wrapper = styled.div`
  margin: 2em auto;
  width: 40px;
  height: 40px;
  position: relative;
`;

const LoadingIndicator = ({ isLoading, error }) => {
  if (error && !isLoading) {
    throw new Error(error);
  }

  return (
    <Wrapper>
      <Spin size="large" />
    </Wrapper>
  );
};

LoadingIndicator.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

export default LoadingIndicator;
