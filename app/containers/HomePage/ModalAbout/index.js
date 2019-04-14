import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

const ModalAbout = ({ visible }) => (
  <Modal
    title={null}
    maskClosable={false}
    mask={false}
    closable={false}
    visible={visible}
    footer={null}
  />
);

ModalAbout.propTypes = {
  visible: PropTypes.bool,
};

export default ModalAbout;
