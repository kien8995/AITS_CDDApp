import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal } from 'antd';
import logo from '../../../resources/images/logo_1.png';

const StyledDiv = styled.div`
  text-align: center;
`;

const StyledImage = styled.img`
  margin-left: 75px;
`;

const ModalAbout = ({ visible, onCancel }) => (
  <Modal
    title={null}
    mask={false}
    closable={false}
    visible={visible}
    footer={null}
    onCancel={onCancel}
    width={600}
  >
    <StyledDiv>
      <StyledImage src={logo} alt="logo" />
      <p>® 2019 Copyright by CÔNG TY CỔ PHẦN TIN HỌC VIỄN THÔNG HÀNG KHÔNG</p>
    </StyledDiv>
  </Modal>
);

ModalAbout.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
};

export default ModalAbout;
