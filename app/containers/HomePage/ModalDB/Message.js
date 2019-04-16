import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ type, message }) => (
  <p style={{ color: type === 'success' ? 'green' : 'red' }}>{message}</p>
);

Message.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
};

export default Message;
