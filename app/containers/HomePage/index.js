import React, { useState, useEffect, useReducer } from 'react';
import { DatePicker, Button, Row, Col, List, Input, message } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import sql from 'mssql';
import { remote } from 'electron';
import path from 'path';
import fg from 'fast-glob';
import { actionLoading, actionError, loadFile, importData } from './actions';
import cddReducer, { initialState } from './reducer';
import {
  importRes,
  importResFlight,
  importResFlightFT,
  importResRemark,
  importResPreReservedSeat,
  importResPassengerDoc,
  importResSuspenseDocArrangement,
  importResSuspenseTimeLimit,
  importResEmergencyContact,
  importResPassenger,
  importResSSR,
  importResTravelArranger,
  importResPassengerEmail,
  importResPassengerPhone,
  importResODFlight,
  importResAddress,
  importTktDocument,
  importTktCoupon,
  importTktTax,
  importTktTaxDetail,
  importTktPayment,
  importTktRemark,
  importTktAddress,
  importTktDocumentHistory,
  importTktCouponHistory,
  importTktEndorsement,
  importResDataIndex,
  importTktProration,
} from './importCDD';

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

const defaultDateRange = [moment(today, dateFormat), moment(today, dateFormat)];

const filePattern = /^(.*)+_(\d{8}).(txt)$/;

const HomePage = () => {
  const [state, dispatch] = useReducer(cddReducer, initialState);
  const { loading, data } = state;
  const [directory, setDirectory] = useState('');
  const [dateRange, setDateRange] = useState(defaultDateRange);

  useEffect(() => {
    if (directory !== '') {
      getCDDFiles();
    }
  }, [directory, dateRange]);

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

  const getCDDFiles = async () => {
    dispatch(actionLoading());
    try {
      const files = await fg([`${directory}/*.txt`], { deep: 0 });
      const arr = [];
      files.forEach(fileDir => {
        const file = path.basename(fileDir);
        const match = file.match(filePattern);
        if (filePattern.test(file) && match.length > 0) {
          const fileDate = `${match[2].slice(0, 4)}-${match[2].slice(
            4,
            6,
          )}-${match[2].slice(6)}`;
          if (
            moment(fileDate).isValid() &&
            (moment(fileDate).isBetween(dateRange[0], dateRange[1]) ||
              moment(fileDate).isSame(dateRange[0]) ||
              moment(fileDate).isSame(dateRange[1]))
          ) {
            arr.push({
              name: match[1],
              file,
              fileDate,
            });
          }
        }
      });
      arr.sort((a, b) => {
        if (moment(a.fileDate).isBefore(b.fileDate)) {
          return -1;
        }
        if (moment(b.fileDate).isBefore(a.fileDate)) {
          return 1;
        }
        return 0;
      });
      dispatch(loadFile(arr));
    } catch (error) {
      dispatch(actionError(error));
      message.error(error);
    }
  };

  const importCDDFile = async (_tbName, _directory, _file, _fileDate) => {
    let importResult = false;
    switch (_tbName) {
      case 'Res':
        importResult = await importRes(_directory, _file, _fileDate);
        return importResult;
      case 'ResFlight':
        importResult = await importResFlight(_directory, _file, _fileDate);
        return importResult;
      case 'ResFlightFT':
        importResult = await importResFlightFT(_directory, _file, _fileDate);
        return importResult;
      case 'ResRemarks':
        importResult = await importResRemark(_directory, _file, _fileDate);
        return importResult;
      case 'PreResSeat':
        importResult = await importResPreReservedSeat(_directory, _file, _fileDate);
        return importResult;
      case 'ResPaxDoc':
        importResult = await importResPassengerDoc(_directory, _file, _fileDate);
        return importResult;
      case 'ResSuspDocAgmt':
        importResult = await importResSuspenseDocArrangement(
          _directory,
          _file,
          _fileDate,
        );
        return importResult;
      case 'ResSuspTimeLmt':
        importResult = await importResSuspenseTimeLimit(_directory, _file, _fileDate);
        return importResult;
      case 'ResEmergencyCtc':
        importResult = await importResEmergencyContact(_directory, _file, _fileDate);
        return importResult;
      case 'ResPassenger':
        importResult = await importResPassenger(_directory, _file, _fileDate);
        return importResult;
      case 'ResSSR':
        importResult = await importResSSR(_directory, _file, _fileDate);
        return importResult;
      case 'ResTravelArranger':
        importResult = await importResTravelArranger(_directory, _file, _fileDate);
        return importResult;
      case 'ResPassengerEmail':
        importResult = await importResPassengerEmail(_directory, _file, _fileDate);
        return importResult;
      case 'ResPassengerPhone':
        importResult = await importResPassengerPhone(_directory, _file, _fileDate);
        return importResult;
      case 'ResODFlight':
        importResult = await importResODFlight(_directory, _file, _fileDate);
        return importResult;
      case 'ResAddress':
        importResult = await importResAddress(_directory, _file, _fileDate);
        return importResult;
      case 'TktDocument':
        importResult = await importTktDocument(_directory, _file, _fileDate);
        return importResult;
      case 'TktCoupon':
        importResult = await importTktCoupon(_directory, _file, _fileDate);
        return importResult;
      case 'TktTax':
        importResult = await importTktTax(_directory, _file, _fileDate);
        return importResult;
      case 'TktTaxDetail':
        importResult = await importTktTaxDetail(_directory, _file, _fileDate);
        return importResult;
      case 'TktPayment':
        importResult = await importTktPayment(_directory, _file, _fileDate);
        return importResult;
      case 'TktRemark':
        importResult = await importTktRemark(_directory, _file, _fileDate);
        return importResult;
      case 'TktAddress':
        importResult = await importTktAddress(_directory, _file, _fileDate);
        return importResult;
      case 'TktDocumentHistory':
        importResult = await importTktDocumentHistory(_directory, _file, _fileDate);
        return importResult;
      case 'TktCouponHistory':
        importResult = await importTktCouponHistory(_directory, _file, _fileDate);
        return importResult;
      case 'TktEndorsement':
        importResult = await importTktEndorsement(_directory, _file, _fileDate);
        return importResult;
      case 'ResDataIndex':
        importResult = await importResDataIndex(_directory, _file, _fileDate);
        return importResult;
      case 'TktProRation':
        importResult = await importTktProration(_directory, _file, _fileDate);
        return importResult;
      default:
        return importResult;
    }
  };

  const importCDDFiles = async () => {
    if (data.length === 0) return;
    dispatch(actionLoading());
    try {
      let importResult = true;
      for (let index = 0; index < data.length; index += 1) {
        // eslint-disable-next-line no-await-in-loop
        importResult = await importCDDFile(
          data[index].name,
          directory,
          data[index].file,
          data[index].fileDate,
        );

        if (!importResult) {
          // move file to error folder
        } else {
          // move file to processed folder
        }
      }
      dispatch(importData());
      message.success('Completed!');
    } catch (error) {
      dispatch(actionError(error));
      message.error(error);
    }
  };

  const handleBrowseClick = () => {
    const dirs = dialog.showOpenDialog({ properties: ['openDirectory'] });
    if (dirs) {
      setDirectory(dirs[0]);
    }
  };

  const handleDateRangeChange = dates => {
    setDateRange(dates);
  };

  return (
    <div>
      <Row>
        <ListWrapper span={12}>
          <List
            size="large"
            header={<ListHeader>List of CDD files</ListHeader>}
            bordered
            loading={loading}
            dataSource={data}
            renderItem={item => <ListItem>{item.file}</ListItem>}
          />
        </ListWrapper>
        <ControlWrapper span={10}>
          <ControlHeader>Select folder</ControlHeader>
          <Search
            value={directory}
            enterButton="Browse"
            readOnly
            onSearch={handleBrowseClick}
          />

          <ControlHeader>Select date range</ControlHeader>
          <StyledRangePicker
            defaultValue={defaultDateRange}
            format={dateFormat}
            onChange={handleDateRangeChange}
          />
          <Row>
            <ButtonWrapper span={24}>
              <ImportButton
                type="primary"
                icon="download"
                onClick={importCDDFiles}
                loading={loading}
              >
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
