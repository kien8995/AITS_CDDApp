import React, { useState } from 'react';
import PropTypes from 'prop-types';
import sql from 'mssql';
import { Modal, Form, Input, Button } from 'antd';

const ModalDB = ({
  visible,
  onOk,
  serverAddress,
  onServerAddressChange,
  databaseName,
  onDatabaseNameChange,
}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const testConnection = async () => {
    setLoading(true);

    try {
      const dbConfig = {
        user: 'sa',
        password: 'k6sa',
        server: serverAddress,
        database: databaseName,
        options: {
          useUTC: false,
        },
      };

      await sql.connect(dbConfig);
      await sql.query`SELECT 1`;

      setLoading(false);
      setMessage('Successed!');
    } catch (error) {
      setLoading(false);
      setMessage(error);
    }
  };

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };
  const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 4 },
  };

  return (
    <Modal
      title="Database Connection"
      closable={false}
      visible={visible}
      footer={[
        <Button key="ok" type="primary" onClick={onOk} loading={loading}>
          OK
        </Button>,
      ]}
    >
      <Form layout="horizontal">
        <Form.Item label="Server" {...formItemLayout}>
          <Input
            placeholder="10.1.2.3"
            value={serverAddress}
            onChange={onServerAddressChange}
          />
        </Form.Item>
        <Form.Item label="Database" {...formItemLayout}>
          <Input
            placeholder="Database name"
            value={databaseName}
            onChange={onDatabaseNameChange}
          />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" loading={loading}>
            Test connection
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

ModalDB.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  serverAddress: PropTypes.string,
  onServerAddressChange: PropTypes.func,
  databaseName: PropTypes.string,
  onDatabaseNameChange: PropTypes.func,
};

export default ModalDB;
