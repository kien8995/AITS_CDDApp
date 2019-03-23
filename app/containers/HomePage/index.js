import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { DatePicker, Button, Row, Col, List, Input } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import sql from 'mssql';
import { remote } from 'electron';

const { dialog } = remote;

const { RangePicker } = DatePicker;

const { Search } = Input;

const ListHeader = styled.div`
  font-weight: bold;
  font-size: 14pt;
`;

const ControlHeader = styled.div`
  font-weight: bold;
  font-size: 14pt;
  margin-top: 20px;
`;

const StyledRangePicker = styled(RangePicker)`
  cursor: pointer;
  /* border: 1px black solid; */
`;

const ListWrapper = styled(Col)`
  margin: 10px;
`;

const ControlWrapper = styled(Col)`
  margin-left: 50px;
  && {
    width: 300px;
  }
`;

const ButtonWrapper = styled(Col)`
  text-align: center;
  margin-top: 50px;
`;

const ImportButton = styled(Button)`
  /* text-align: center; */
`;

const dateFormat = 'YYYY/MM/DD';

const data = ['tbRes', 'tblataCode'];

const currentTime = new Date();

const today = `${currentTime.getFullYear()}/${currentTime.getMonth() +
  1}/${currentTime.getDate()}`;

const HomePage = () => {
  const [directory, setDirectory] = useState('');
  const callSql = async () => {
    try {
      await sql.connect('mssql://sa:k6sa@10.125.0.6/CDDData');
      const result = await sql.query`select top 10 * from tbRes`;
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      sql.close();
    }
  };

  const handleBrowseClick = () => {
    setDirectory(dialog.showOpenDialog({ properties: ['openDirectory'] }));
  };

  return (
    <div>
      <Helmet>
        <title>CDD App v1.0</title>
        <meta name="description" content="CDD App" />
      </Helmet>
      <div>
        <Row>
          <ListWrapper span={12}>
            <List
              size="large"
              header={<ListHeader>Danh sách các file CDD</ListHeader>}
              bordered
              dataSource={data}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </ListWrapper>
          <ControlWrapper span={10}>
            <ControlHeader>Chọn folder</ControlHeader>
            <Search
              value={directory}
              enterButton="Browse"
              readOnly
              onSearch={handleBrowseClick}
            />

            <ControlHeader>Chọn ngày</ControlHeader>
            <StyledRangePicker
              defaultValue={[moment(today, dateFormat), moment(today, dateFormat)]}
              format={dateFormat}
            />
            <br />
            <Row>
              <ButtonWrapper span={24}>
                <ImportButton type="primary" icon="download" onClick={callSql} loading>
                  Import Data
                </ImportButton>
              </ButtonWrapper>
            </Row>
          </ControlWrapper>
        </Row>
      </div>
    </div>
  );
};

export default HomePage;
