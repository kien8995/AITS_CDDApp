import React, { useState, useEffect, useReducer } from 'react';
import { DatePicker, Button, Row, Col, Input, message } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { remote } from 'electron';
import fse from 'fs-extra';
import path from 'path';
import fg from 'fast-glob';
import ListFile from './ListFile';
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

const moveFile = async (src, dest) => {
  try {
    await fse.move(src, dest);
    // console.log('success!');
  } catch (err) {
    // console.error(err);
  }
};

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

  const importCDDFile = async (_tbName, _filePath, _fileDate) => {
    let importResult = false;
    switch (_tbName) {
      case 'Res':
        importResult = await importRes(_filePath, _fileDate);
        return importResult;
      case 'ResFlight':
        importResult = await importResFlight(_filePath, _fileDate);
        return importResult;
      case 'ResFlightFT':
        importResult = await importResFlightFT(_filePath, _fileDate);
        return importResult;
      case 'ResRemarks':
        importResult = await importResRemark(_filePath, _fileDate);
        return importResult;
      case 'PreResSeat':
        importResult = await importResPreReservedSeat(_filePath, _fileDate);
        return importResult;
      case 'ResPaxDoc':
        importResult = await importResPassengerDoc(_filePath, _fileDate);
        return importResult;
      case 'ResSuspDocAgmt':
        importResult = await importResSuspenseDocArrangement(_filePath, _fileDate);
        return importResult;
      case 'ResSuspTimeLmt':
        importResult = await importResSuspenseTimeLimit(_filePath, _fileDate);
        return importResult;
      case 'ResEmergencyCtc':
        importResult = await importResEmergencyContact(_filePath, _fileDate);
        return importResult;
      case 'ResPassenger':
        importResult = await importResPassenger(_filePath, _fileDate);
        return importResult;
      case 'ResSSR':
        importResult = await importResSSR(_filePath, _fileDate);
        return importResult;
      case 'ResTravelArranger':
        importResult = await importResTravelArranger(_filePath, _fileDate);
        return importResult;
      case 'ResPassengerEmail':
        importResult = await importResPassengerEmail(_filePath, _fileDate);
        return importResult;
      case 'ResPassengerPhone':
        importResult = await importResPassengerPhone(_filePath, _fileDate);
        return importResult;
      case 'ResODFlight':
        importResult = await importResODFlight(_filePath, _fileDate);
        return importResult;
      case 'ResAddress':
        importResult = await importResAddress(_filePath, _fileDate);
        return importResult;
      case 'TktDocument':
        importResult = await importTktDocument(_filePath, _fileDate);
        return importResult;
      case 'TktCoupon':
        importResult = await importTktCoupon(_filePath, _fileDate);
        return importResult;
      case 'TktTax':
        importResult = await importTktTax(_filePath, _fileDate);
        return importResult;
      case 'TktTaxDetail':
        importResult = await importTktTaxDetail(_filePath, _fileDate);
        return importResult;
      case 'TktPayment':
        importResult = await importTktPayment(_filePath, _fileDate);
        return importResult;
      case 'TktRemark':
        importResult = await importTktRemark(_filePath, _fileDate);
        return importResult;
      case 'TktAddress':
        importResult = await importTktAddress(_filePath, _fileDate);
        return importResult;
      case 'TktDocumentHistory':
        importResult = await importTktDocumentHistory(_filePath, _fileDate);
        return importResult;
      case 'TktCouponHistory':
        importResult = await importTktCouponHistory(_filePath, _fileDate);
        return importResult;
      case 'TktEndorsement':
        importResult = await importTktEndorsement(_filePath, _fileDate);
        return importResult;
      case 'ResDataIndex':
        importResult = await importResDataIndex(_filePath, _fileDate);
        return importResult;
      case 'TktProRation':
        importResult = await importTktProration(_filePath, _fileDate);
        return importResult;
      default:
        return importResult;
    }
  };

  const importCDDFiles = async () => {
    if (data.length === 0) {
      message.error('File not found !');
      return;
    }

    dispatch(actionLoading());
    try {
      let importResult = true;
      for (let index = 0; index < data.length; index += 1) {
        // eslint-disable-next-line no-await-in-loop
        importResult = await importCDDFile(
          data[index].name,
          path.join(directory, data[index].file),
          data[index].fileDate,
        );

        if (!importResult) {
          moveFile(
            path.join(directory, data[index].file),
            path.join(directory, 'Error', data[index].file),
          );
        } else {
          moveFile(
            path.join(directory, data[index].file),
            path.join(directory, 'Processed', data[index].file),
          );
        }
      }
      dispatch(importData());
      message.success('Completed !');
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
      <Row type="flex" justify="space-around">
        <ControlWrapper span={6}>
          <ControlHeader>Select folder</ControlHeader>
          <Search
            value={directory}
            enterButton="Browse"
            readOnly
            onSearch={handleBrowseClick}
            disabled={loading}
          />

          <ControlHeader>Select date range</ControlHeader>
          <StyledRangePicker
            defaultValue={defaultDateRange}
            format={dateFormat}
            onChange={handleDateRangeChange}
            disabled={loading}
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
        <ListWrapper span={12}>
          <ListFile loading={loading} dataSource={data} />
        </ListWrapper>
      </Row>
    </div>
  );
};

export default HomePage;
