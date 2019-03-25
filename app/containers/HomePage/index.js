import React, { useState, useEffect } from 'react';
import { DatePicker, Button, Row, Col, List, Input, message } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import sql from 'mssql';
import { remote } from 'electron';
import fs, { createReadStream } from 'fs';
import { createInterface } from 'readline';
import path from 'path';

const { dialog } = remote;

const { RangePicker } = DatePicker;

const { Search } = Input;

const ListHeader = styled.div`
  font-weight: bold;
  font-size: 14pt;
`;

const ListItem = styled(List.Item)`
  cursor: pointer;
  transition: color 0.3s ease;
  -webkit-transition: color 0.3s ease;
  &:hover {
    background-color: #40a9ff;
    color: #fff;
  }
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
  margin-top: 30px;
`;

const ImportButton = styled(Button)`
  /* text-align: center; */
`;

const dateFormat = 'YYYY/MM/DD';

const currentTime = new Date();

const today = `${currentTime.getFullYear()}/${currentTime.getMonth() +
  1}/${currentTime.getDate()}`;

const filePattern = /^(.*)+_(\d{8}).(txt)$/;

const HomePage = () => {
  const [directory, setDirectory] = useState('');
  const [listFile, setListFile] = useState([]);

  useEffect(() => {
    if (directory !== '') {
      fs.readdir(directory, (error, files) => {
        const arr = [];
        if (error) {
          message.error(error);
        }
        files.forEach(file => {
          const match = file.match(filePattern);
          if (
            filePattern.test(file) &&
            match.length > 0 &&
            moment(
              `${match[2].slice(0, 4)}-${match[2].slice(4, 6)}-${match[2].slice(6)}`,
            ).isValid()
          ) {
            // const lineReader = createInterface({
            //   input: createReadStream(path.join(directory, file)),
            // });
            // lineReader.on('line', line => {
            //   console.log(line);
            // });
            arr.push(match[1]);
            // console.log(arr);
          }
        });
        setListFile(arr);
      });
    }
  }, [directory]);

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
    const dirs = dialog.showOpenDialog({ properties: ['openDirectory'] });
    if (dirs) {
      setDirectory(dirs[0]);
    }
  };

  return (
    <div>
      <Row>
        <ListWrapper span={12}>
          <List
            size="large"
            header={<ListHeader>List of CDD files</ListHeader>}
            bordered
            loading={listFile.length === 0}
            dataSource={listFile}
            renderItem={item => <ListItem>{item}</ListItem>}
          />
        </ListWrapper>
        <ControlWrapper span={10}>
          <ControlHeader>Select folder</ControlHeader>
          <Search
            value={directory}
            enterButton="Browse"
            readOnly
            onSearch={() => handleBrowseClick()}
          />

          <ControlHeader>Select date range</ControlHeader>
          <StyledRangePicker
            defaultValue={[moment(today, dateFormat), moment(today, dateFormat)]}
            format={dateFormat}
          />
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
  );
};

export default HomePage;
