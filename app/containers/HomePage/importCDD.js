/* eslint-disable prefer-destructuring */
/* eslint-disable new-cap */
import { createInterface } from 'readline';
import fs, { createReadStream } from 'fs';
import sql from 'mssql';
import moment from 'moment';
// import dbConfig from 'config/db.config';
import tbRes from './entities/tbRes';
import tbResFlight from './entities/tbResFlight';
import tbResFlightFT from './entities/tbResFlightFT';
import tbResRemark from './entities/tbResRemark';
import tbResPreReservedSeat from './entities/tbResPreReservedSeat';
import tbResPassengerDoc from './entities/tbResPassengerDoc';
import tbResSuspenseDocArrangement from './entities/tbResSuspenseDocArrangement';
import tbResSuspenseTimeLimit from './entities/tbResSuspenseTimeLimit';
import tbResEmergencyContact from './entities/tbResEmergencyContact';
import tbResPassenger from './entities/tbResPassenger';
import tbResSSR from './entities/tbResSSR';
import tbResTravelArranger from './entities/tbResTravelArranger';
import tbResPassengerEmail from './entities/tbResPassengerEmail';
import tbResPassengerPhone from './entities/tbResPassengerPhone';
import tbResODFlight from './entities/tbResODFlight';
import tbResAddress from './entities/tbResAddress';
import tbTktDocument from './entities/tbTktDocument';
import tbTktCoupon from './entities/tbTktCoupon';
import tbTktTax from './entities/tbTktTax';
import tbTktTaxDetail from './entities/tbTktTaxDetail';
import tbTktPayment from './entities/tbTktPayment';
import tbTktRemark from './entities/tbTktRemark';
import tbTktAddress from './entities/tbTktAddress';
import tbTktDocumentHistory from './entities/tbTktDocumentHistory';
import tbTktCouponHistory from './entities/tbTktCouponHistory';
import tbTktEndorsement from './entities/tbTktEndorsement';
import tbResDataIndex from './entities/tbResDataIndex';
import tbTktProration from './entities/tbTktProration';

const formatDate = 'YYYY-MM-DD';
const formatDateTime = 'YYYY-MM-DD HH:mm:ss';

const getFilesizeInBytes = filePath => {
  const stats = fs.statSync(filePath);
  const fileSizeInBytes = stats.size;
  return fileSizeInBytes;
};

export const importRes = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  const lineReader = createInterface({
    input: createReadStream(filePath),
  });

  const values = [];
  lineReader.on('line', line => {
    const data = line.split('|').map(item => (item !== '' ? item.trim() : null));
    const res = new tbRes();
    res.ImportDate = new Date(moment(fileDate).format(formatDateTime));
    res.BookingCode = data[1];
    res.CreateDate =
      data[2] !== null ? new Date(moment(data[2]).format(formatDate)) : null;
    res.FromDateTime =
      data[3] !== null ? new Date(moment(data[3]).format(formatDateTime)) : null;
    res.CreateCityCode = data[4];
    res.CreateCountryCode = data[5];
    res.GrpBookingInd = data[6];
    res.CorporateInd = data[7];
    res.NbrinParty = data[8];
    res.TTYAirlineCode = data[9];
    res.TTYRecordLocator = data[10];
    res.TTYPosInformation = data[11];
    res.SeatCount = data[12];
    res.SourceSysId = data[13];
    res.PRNCreateTime =
      data[14] !== null
        ? new Date(
            moment(`${fileDate} ${data[14]}`)
              .add(1, 'd')
              .format(formatDateTime),
          )
        : null;
    res.CreateAgentSine = data[15];
    res.NumberOfInfants = data[16];
    res.ClaimIndicator = data[17];
    res.CreateIATANr = data[18];
    res.PurgeDate =
      data[19] !== null ? new Date(moment(data[19]).format(formatDate)) : null;
    res.MaxIntraPNRSetNbr = data[20];
    res.DivideOrigPNRLocator = data[21];
    res.OrigPNRCreateDate =
      data[22] !== null ? new Date(moment(data[22]).format(formatDate)) : null;
    res.OrigPNRCreateTime =
      data[23] !== null
        ? new Date(
            moment(`${fileDate} ${data[23]}`)
              .add(1, 'd')
              .format(formatDateTime),
          )
        : null;
    res.DivideImagePNRInd = data[24];
    res.Unknow = data[25];
    res.Unknow1 = data[26];
    res.Unknow2 = data[27];
    res.Unknow3 = data[28];
    res.Unknow4 = data[29];
    res.Unknow5 = data[30];
    res.Unknow6 = data[31];
    res.Unknow7 = data[32];
    res.Unknow8 = data[33];
    values.push(res);
  });

  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();

    const table = new sql.Table('tbRes');
    table.create = true;
    table.columns.add('ImportDate', sql.DateTime, { nullable: true });
    table.columns.add('BookingCode', sql.NVarChar(6), { nullable: true });
    table.columns.add('CreateDate', sql.Date, { nullable: true });
    table.columns.add('FromDateTime', sql.DateTime, { nullable: true });
    table.columns.add('CreateCityCode', sql.NVarChar(5), { nullable: true });
    table.columns.add('CreateCountryCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('GrpBookingInd', sql.NVarChar(1), { nullable: true });
    table.columns.add('CorporateInd', sql.NVarChar(1), { nullable: true });
    table.columns.add('NbrinParty', sql.Int, { nullable: true });
    table.columns.add('TTYAirlineCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('TTYRecordLocator', sql.NVarChar(8), { nullable: true });
    table.columns.add('TTYPosInformation', sql.NVarChar(250), { nullable: true });
    table.columns.add('SeatCount', sql.Int, { nullable: true });
    table.columns.add('SourceSysId', sql.NVarChar(2), { nullable: true });
    table.columns.add('PRNCreateTime', sql.DateTime, { nullable: true });
    table.columns.add('CreateAgentSine', sql.NVarChar(3), { nullable: true });
    table.columns.add('NumberOfInfants', sql.Int, { nullable: true });
    table.columns.add('ClaimIndicator', sql.NVarChar(1), { nullable: true });
    table.columns.add('CreateIATANr', sql.NVarChar(11), { nullable: true });
    table.columns.add('PurgeDate', sql.Date, { nullable: true });
    table.columns.add('MaxIntraPNRSetNbr', sql.Int, { nullable: true });
    table.columns.add('DivideOrigPNRLocator', sql.NVarChar(6), { nullable: true });
    table.columns.add('OrigPNRCreateDate', sql.Date, { nullable: true });
    table.columns.add('OrigPNRCreateTime', sql.DateTime, { nullable: true });
    table.columns.add('DivideImagePNRInd', sql.NVarChar(1), { nullable: true });
    table.columns.add('Unknow', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow1', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow2', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow3', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow4', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow5', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow6', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow7', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow8', sql.NVarChar(50), { nullable: true });

    values.forEach(value => {
      table.rows.add(
        value.ImportDate,
        value.BookingCode,
        value.CreateDate,
        value.FromDateTime,
        value.CreateCityCode,
        value.CreateCountryCode,
        value.GrpBookingInd,
        value.CorporateInd,
        value.NbrinParty,
        value.TTYAirlineCode,
        value.TTYRecordLocator,
        value.TTYPosInformation,
        value.SeatCount,
        value.SourceSysId,
        value.PRNCreateTime,
        value.CreateAgentSine,
        value.NumberOfInfants,
        value.ClaimIndicator,
        value.CreateIATANr,
        value.PurgeDate,
        value.MaxIntraPNRSetNbr,
        value.DivideOrigPNRLocator,
        value.OrigPNRCreateDate,
        value.OrigPNRCreateTime,
        value.DivideImagePNRInd,
        value.Unknow,
        value.Unknow1,
        value.Unknow2,
        value.Unknow3,
        value.Unknow4,
        value.Unknow5,
        value.Unknow6,
        value.Unknow7,
        value.Unknow8,
      );
    });

    const transaction = new sql.Transaction(pool);

    transaction.begin(errorTransaction => {
      if (errorTransaction) throw errorTransaction;

      let rollBack = false;

      transaction.on('rollback', () => {
        rollBack = true;
      });

      const request = new sql.Request(transaction);

      request
        .bulk(table)
        .then(() => {
          // console.log(result.rowsAffected);
          transaction.commit(errorCommit => {
            if (errorCommit) {
              throw errorCommit;
            }
          });
        })
        .catch(error => {
          if (!rollBack) {
            transaction.rollback();
          }
          throw error;
        });
    });

    return true;
  } catch (error) {
    // console.log(error);
    return false;
  }
};

export const importResFlight = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  const lineReader = createInterface({
    input: createReadStream(filePath),
  });

  const values = [];
  lineReader.on('line', line => {
    const data = line.split('|').map(item => (item !== '' ? item.trim() : null));
    const resFlight = new tbResFlight();
    resFlight.ImportDate = new Date(moment(fileDate).format(formatDateTime));
    resFlight.BookingCode = data[1];
    resFlight.CreateDate =
      data[2] !== null ? new Date(moment(data[2]).format(formatDate)) : null;
    resFlight.FromDateTime =
      data[3] !== null ? new Date(moment(data[3]).format(formatDateTime)) : null;
    resFlight.SegmentNbr = data[4];
    resFlight.ActiveSegmentInd = data[5];
    resFlight.CdshrLegInd = data[6];
    resFlight.ClassOfService = data[7];
    resFlight.ConnectivityCode = data[8];
    resFlight.NbrlnParty = data[9];
    resFlight.CurrentSeamentStatusCode = data[10];
    resFlight.PreviousSegmentStatusCode = data[11];
    resFlight.SegmentTypeCode = data[12];
    resFlight.ChangeSegmentStatusIndicator = data[13];
    resFlight.EquipmentCode = data[14];
    resFlight.MarketingFlightNbr = data[15];
    resFlight.FlightNbr = data[16];
    resFlight.MarketingAirlineCode = data[17];
    resFlight.OperatingFlightNbr = data[18];
    resFlight.OperatingAirlineCode = data[19];
    resFlight.AirlineCode = data[20];
    resFlight.InboundFlightConnectionInd = data[21];
    resFlight.MarriedConxInboundFlightInd = data[22];
    resFlight.OutboundFlightConnectionInd = data[23];
    resFlight.MarriedConxOutboundFlightInd = data[24];
    resFlight.ServiceStartCity = data[25];
    resFlight.ServiceStartDate =
      data[26] !== null ? new Date(moment(data[26]).format(formatDate)) : null;
    resFlight.ServiceStartTime =
      data[27] !== null
        ? new Date(
            moment(`${fileDate} ${data[27]}`)
              .add(1, 'd')
              .format(formatDateTime),
          )
        : null;
    resFlight.ServiceEndCity = data[28];
    resFlight.ServiceEndDate =
      data[29] !== null ? new Date(moment(data[29]).format(formatDate)) : null;
    resFlight.ServiceEndTime =
      data[30] !== null
        ? new Date(
            moment(`${fileDate} ${data[30]}`)
              .add(1, 'd')
              .format(formatDateTime),
          )
        : null;
    resFlight.POSAgencyActualCityCode = data[31];
    resFlight.EquipmentCodeDescription = data[32];
    resFlight.PreReservedSeatIndicator = data[33];
    resFlight.ConfirmationNbr = data[34];
    resFlight.FlightPOSAgentlATANbr = data[35];
    resFlight.HistorvActionCodeld = data[36];
    resFlight.RecordUpdateDate =
      data[37] !== null ? new Date(moment(data[37]).format(formatDate)) : null;
    resFlight.RecordUpdateTime =
      data[38] !== null
        ? new Date(
            moment(`${fileDate} ${data[38]}`)
              .add(1, 'd')
              .format(formatDateTime),
          )
        : null;
    resFlight.IntraPNRSetNbr = data[39];
    resFlight.SegmentBookedDate =
      data[40] !== null ? new Date(moment(data[40]).format(formatDate)) : null;
    resFlight.SegmentBookedTime =
      data[41] !== null
        ? new Date(
            moment(`${fileDate} ${data[41]}`)
              .add(1, 'd')
              .format(formatDateTime),
          )
        : null;
    resFlight.OpenFlightSegmentIndicator = data[42];
    resFlight.SegmentActivityCode = data[43];
    resFlight.Unknow = data[44];
    resFlight.Unknow1 = data[45];
    resFlight.Unknow2 = data[46];
    resFlight.Unknow3 = data[47];
    resFlight.Unknow4 = data[48];
    resFlight.Unknow5 = data[49];
    resFlight.Unknow6 = data[50];
    resFlight.AircraftCode = data[51];
    resFlight.Aircraft = data[52];

    values.push(resFlight);
  });

  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();

    const table = new sql.Table('tbResFlight');
    table.create = true;
    table.columns.add('ImportDate', sql.DateTime, { nullable: true });
    table.columns.add('BookingCode', sql.NVarChar(6), { nullable: true });
    table.columns.add('CreateDate', sql.Date, { nullable: true });
    table.columns.add('FromDateTime', sql.DateTime, { nullable: true });
    table.columns.add('SegmentNbr', sql.Int, { nullable: true });
    table.columns.add('ActiveSegmentInd', sql.NVarChar(1), { nullable: true });
    table.columns.add('CdshrLegInd', sql.NVarChar(1), { nullable: true });
    table.columns.add('ClassOfService', sql.NVarChar(2), { nullable: true });
    table.columns.add('ConnectivityCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('NbrlnParty', sql.Int, { nullable: true });
    table.columns.add('CurrentSeamentStatusCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('PreviousSegmentStatusCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('SegmentTypeCode', sql.Int, { nullable: true });
    table.columns.add('ChangeSegmentStatusIndicator', sql.NVarChar(1), {
      nullable: true,
    });
    table.columns.add('EquipmentCode', sql.Int, { nullable: true });
    table.columns.add('MarketingFlightNbr', sql.NVarChar(10), { nullable: true });
    table.columns.add('FlightNbr', sql.NVarChar(10), { nullable: true });
    table.columns.add('MarketingAirlineCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('OperatingFlightNbr', sql.NVarChar(10), { nullable: true });
    table.columns.add('OperatingAirlineCode', sql.NVarChar(10), { nullable: true });
    table.columns.add('AirlineCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('InboundFlightConnectionInd', sql.NVarChar(1), { nullable: true });
    table.columns.add('MarriedConxInboundFlightInd', sql.NVarChar(1), { nullable: true });
    table.columns.add('OutboundFlightConnectionInd', sql.NVarChar(1), { nullable: true });
    table.columns.add('MarriedConxOutboundFlightInd', sql.NVarChar(1), {
      nullable: true,
    });
    table.columns.add('ServiceStartCity', sql.NVarChar(3), { nullable: true });
    table.columns.add('ServiceStartDate', sql.Date, { nullable: true });
    table.columns.add('ServiceStartTime', sql.DateTime, { nullable: true });
    table.columns.add('ServiceEndCity', sql.NVarChar(3), { nullable: true });
    table.columns.add('ServiceEndDate', sql.Date, { nullable: true });
    table.columns.add('ServiceEndTime', sql.DateTime, { nullable: true });
    table.columns.add('POSAgencyActualCityCode', sql.NVarChar(10), { nullable: true });
    table.columns.add('EquipmentCodeDescription', sql.NVarChar(25), { nullable: true });
    table.columns.add('PreReservedSeatIndicator', sql.NVarChar(1), { nullable: true });
    table.columns.add('ConfirmationNbr', sql.NVarChar(25), { nullable: true });
    table.columns.add('FlightPOSAgentlATANbr', sql.NVarChar(11), { nullable: true });
    table.columns.add('HistorvActionCodeld', sql.NVarChar(4), { nullable: true });
    table.columns.add('RecordUpdateDate', sql.Date, { nullable: true });
    table.columns.add('RecordUpdateTime', sql.DateTime, { nullable: true });
    table.columns.add('IntraPNRSetNbr', sql.Int, { nullable: true });
    table.columns.add('SegmentBookedDate', sql.Date, { nullable: true });
    table.columns.add('SegmentBookedTime', sql.DateTime, { nullable: true });
    table.columns.add('OpenFlightSegmentIndicator', sql.Int, { nullable: true });
    table.columns.add('SegmentActivityCode', sql.NVarChar(1), { nullable: true });
    table.columns.add('Unknow', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow1', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow2', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow3', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow4', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow5', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow6', sql.NVarChar(50), { nullable: true });
    table.columns.add('AircraftCode', sql.NVarChar(50), { nullable: true });
    table.columns.add('Aircraft', sql.NVarChar(50), { nullable: true });

    values.forEach(value => {
      table.rows.add(
        value.ImportDate,
        value.BookingCode,
        value.CreateDate,
        value.FromDateTime,
        value.SegmentNbr,
        value.ActiveSegmentInd,
        value.CdshrLegInd,
        value.ClassOfService,
        value.ConnectivityCode,
        value.NbrlnParty,
        value.CurrentSeamentStatusCode,
        value.PreviousSegmentStatusCode,
        value.SegmentTypeCode,
        value.ChangeSegmentStatusIndicator,
        value.EquipmentCode,
        value.MarketingFlightNbr,
        value.FlightNbr,
        value.MarketingAirlineCode,
        value.OperatingFlightNbr,
        value.OperatingAirlineCode,
        value.AirlineCode,
        value.InboundFlightConnectionInd,
        value.MarriedConxInboundFlightInd,
        value.OutboundFlightConnectionInd,
        value.MarriedConxOutboundFlightInd,
        value.ServiceStartCity,
        value.ServiceStartDate,
        value.ServiceStartTime,
        value.ServiceEndCity,
        value.ServiceEndDate,
        value.ServiceEndTime,
        value.POSAgencyActualCityCode,
        value.EquipmentCodeDescription,
        value.PreReservedSeatIndicator,
        value.ConfirmationNbr,
        value.FlightPOSAgentlATANbr,
        value.HistorvActionCodeld,
        value.RecordUpdateDate,
        value.RecordUpdateTime,
        value.IntraPNRSetNbr,
        value.SegmentBookedDate,
        value.SegmentBookedTime,
        value.OpenFlightSegmentIndicator,
        value.SegmentActivityCode,
        value.Unknow,
        value.Unknow1,
        value.Unknow2,
        value.Unknow3,
        value.Unknow4,
        value.Unknow5,
        value.Unknow6,
        value.AircraftCode,
        value.Aircraft,
      );
    });

    const transaction = new sql.Transaction(pool);

    transaction.begin(errorTransaction => {
      if (errorTransaction) throw errorTransaction;

      let rollBack = false;

      transaction.on('rollback', () => {
        rollBack = true;
      });

      const request = new sql.Request(transaction);

      request
        .bulk(table)
        .then(() => {
          // console.log(result.rowsAffected);
          transaction.commit(errorCommit => {
            if (errorCommit) {
              throw errorCommit;
            }
          });
        })
        .catch(error => {
          if (!rollBack) {
            transaction.rollback();
          }
          throw error;
        });
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const importResFlightFT = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  const lineReader = createInterface({
    input: createReadStream(filePath),
  });

  const values = [];
  lineReader.on('line', line => {
    const data = line.split('|').map(item => (item !== '' ? item.trim() : null));
    const resFlightFT = new tbResFlightFT();

    resFlightFT.ImportDate = new Date(moment(fileDate).format(formatDateTime));
    resFlightFT.BookingCode = data[1];
    resFlightFT.CreateDate =
      data[2] !== null ? new Date(moment(data[2]).format(formatDate)) : null;
    resFlightFT.FromDateTime =
      data[3] !== null ? new Date(moment(data[3]).format(formatDateTime)) : null;
    resFlightFT.PNRPassengerFTSeqId = data[4];
    resFlightFT.PNRPassengerSeqId = data[5];
    resFlightFT.SourceTypeCode = data[6];
    resFlightFT.ClassOfService = data[7];
    resFlightFT.FrequentTravelerNbr = data[8];
    resFlightFT.FTText = data[9];
    resFlightFT.FTCurrentStatusCode = data[10];
    resFlightFT.FTFlightNumber = data[11];
    resFlightFT.ReceivingCarrierCode = data[12];
    resFlightFT.ServiceStartCityCode = data[13];
    resFlightFT.ServiceEndCityCode = data[14];
    resFlightFT.SSRCode = data[15];
    resFlightFT.SSRIdTypeCode = data[16];
    resFlightFT.SSRNbrlnParty = data[17];
    resFlightFT.VendorCode = data[18];
    resFlightFT.HistoryActionCodeId = data[19];
    resFlightFT.RecordUpdateDate =
      data[20] !== null ? new Date(moment(data[20]).format(formatDate)) : null;
    resFlightFT.RecordUpdateTime =
      data[21] !== null
        ? new Date(
            moment(`${fileDate} ${data[21]}`)
              .add(1, 'd')
              .format(formatDateTime),
          )
        : null;
    resFlightFT.IntraPNRSetNbr = data[22];

    values.push(resFlightFT);
  });

  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();

    const table = new sql.Table('tbResFlightFT');
    table.create = true;
    table.columns.add('ImportDate', sql.DateTime, { nullable: true });
    table.columns.add('BookingCode', sql.NVarChar(6), { nullable: true });
    table.columns.add('CreateDate', sql.Date, { nullable: true });
    table.columns.add('FromDateTime', sql.DateTime, { nullable: true });
    table.columns.add('PNRPassengerFTSeqId', sql.Int, { nullable: true });
    table.columns.add('PNRPassengerSeqId', sql.Int, { nullable: true });
    table.columns.add('SourceTypeCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('ClassOfService', sql.NVarChar(2), { nullable: true });
    table.columns.add('FrequentTravelerNbr', sql.NVarChar(25), { nullable: true });
    table.columns.add('FTText', sql.NVarChar(128), { nullable: true });
    table.columns.add('FTCurrentStatusCode', sql.NVarChar(2), { nullable: true });
    table.columns.add('FTFlightNumber', sql.NVarChar(10), { nullable: true });
    table.columns.add('ReceivingCarrierCode', sql.NVarChar(10), { nullable: true });
    table.columns.add('ServiceStartCityCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('ServiceEndCityCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('SSRCode', sql.NVarChar(10), { nullable: true });
    table.columns.add('SSRIdTypeCode', sql.NVarChar(1), { nullable: true });
    table.columns.add('SSRNbrlnParty', sql.Int, { nullable: true });
    table.columns.add('VendorCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('HistoryActionCodeId', sql.NVarChar(4), { nullable: true });
    table.columns.add('RecordUpdateDate', sql.Date, { nullable: true });
    table.columns.add('RecordUpdateTime', sql.DateTime, { nullable: true });
    table.columns.add('IntraPNRSetNbr', sql.Int, { nullable: true });

    values.forEach(value => {
      table.rows.add(
        value.ImportDate,
        value.BookingCode,
        value.CreateDate,
        value.FromDateTime,
        value.PNRPassengerFTSeqId,
        value.PNRPassengerSeqId,
        value.SourceTypeCode,
        value.ClassOfService,
        value.FrequentTravelerNbr,
        value.FTText,
        value.FTCurrentStatusCode,
        value.FTFlightNumber,
        value.ReceivingCarrierCode,
        value.ServiceStartCityCode,
        value.ServiceEndCityCode,
        value.SSRCode,
        value.SSRIdTypeCode,
        value.SSRNbrlnParty,
        value.VendorCode,
        value.HistoryActionCodeId,
        value.RecordUpdateDate,
        value.RecordUpdateTime,
        value.IntraPNRSetNbr,
      );
    });

    const transaction = new sql.Transaction(pool);

    transaction.begin(errorTransaction => {
      if (errorTransaction) throw errorTransaction;

      let rollBack = false;

      transaction.on('rollback', () => {
        rollBack = true;
      });

      const request = new sql.Request(transaction);

      request
        .bulk(table)
        .then(() => {
          // console.log(result.rowsAffected);
          transaction.commit(errorCommit => {
            if (errorCommit) {
              throw errorCommit;
            }
          });
        })
        .catch(error => {
          if (!rollBack) {
            transaction.rollback();
          }
          throw error;
        });
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const importResRemark = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  const lineReader = createInterface({
    input: createReadStream(filePath),
  });

  const values = [];
  lineReader.on('line', line => {
    const data = line.split('|').map(item => (item !== '' ? item.trim() : null));
    const resRemark = new tbResRemark();

    resRemark.ImportDate = new Date(moment(fileDate).format(formatDateTime));
    resRemark.BookingCode = data[1];
    resRemark.CreateDate =
      data[2] !== null ? new Date(moment(data[2]).format(formatDate)) : null;
    resRemark.FromDateTime =
      data[3] !== null ? new Date(moment(data[3]).format(formatDateTime)) : null;
    resRemark.ResRemarkSeqId = data[4];
    resRemark.RemarkText = data[5];
    resRemark.RemarkType = data[6];
    resRemark.HistorvActionCodeld = data[7];
    resRemark.RecordUpdateDate =
      data[8] !== null ? new Date(moment(data[8]).format(formatDate)) : null;
    resRemark.RecordUpdateTime =
      data[9] !== null
        ? new Date(
            moment(`${fileDate} ${data[9]}`)
              .add(1, 'd')
              .format(formatDateTime),
          )
        : null;
    resRemark.IntraPNRSetNbr = data[10];

    values.push(resRemark);
  });

  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();

    const table = new sql.Table('tbResRemark');
    table.create = true;
    table.columns.add('ImportDate', sql.DateTime, { nullable: true });
    table.columns.add('BookingCode', sql.NVarChar(6), { nullable: true });
    table.columns.add('CreateDate', sql.Date, { nullable: true });
    table.columns.add('FromDateTime', sql.DateTime, { nullable: true });
    table.columns.add('ResRemarkSeqId', sql.Int, { nullable: true });
    table.columns.add('RemarkText', sql.NVarChar(255), { nullable: true });
    table.columns.add('RemarkType', sql.Int, { nullable: true });
    table.columns.add('HistorvActionCodeld', sql.NVarChar(4), { nullable: true });
    table.columns.add('RecordUpdateDate', sql.Date, { nullable: true });
    table.columns.add('RecordUpdateTime', sql.DateTime, { nullable: true });
    table.columns.add('IntraPNRSetNbr', sql.Int, { nullable: true });

    values.forEach(value => {
      table.rows.add(
        value.ImportDate,
        value.BookingCode,
        value.CreateDate,
        value.FromDateTime,
        value.ResRemarkSeqId,
        value.RemarkText,
        value.RemarkType,
        value.HistorvActionCodeld,
        value.RecordUpdateDate,
        value.RecordUpdateTime,
        value.IntraPNRSetNbr,
      );
    });

    const transaction = new sql.Transaction(pool);

    transaction.begin(errorTransaction => {
      if (errorTransaction) throw errorTransaction;

      let rollBack = false;

      transaction.on('rollback', () => {
        rollBack = true;
      });

      const request = new sql.Request(transaction);

      request
        .bulk(table)
        .then(() => {
          // console.log(result.rowsAffected);
          transaction.commit(errorCommit => {
            if (errorCommit) {
              throw errorCommit;
            }
          });
        })
        .catch(error => {
          if (!rollBack) {
            transaction.rollback();
          }
          throw error;
        });
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const importResPreReservedSeat = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  const lineReader = createInterface({
    input: createReadStream(filePath),
  });

  const values = [];
  lineReader.on('line', line => {
    const data = line.split('|').map(item => (item !== '' ? item.trim() : null));
    const resPreReservedSeat = new tbResPreReservedSeat();

    resPreReservedSeat.ImportDate = new Date(moment(fileDate).format(formatDateTime));
    resPreReservedSeat.BookingCode = data[1];
    resPreReservedSeat.CreateDate =
      data[2] !== null ? new Date(moment(data[2]).format(formatDate)) : null;
    resPreReservedSeat.FromDateTime =
      data[3] !== null ? new Date(moment(data[3]).format(formatDateTime)) : null;
    resPreReservedSeat.PNRPassengerSeqId = data[4];
    resPreReservedSeat.PRSSeqNbr = data[5];
    resPreReservedSeat.VendorCode = data[6];
    resPreReservedSeat.PRSFlightNumber = data[7];
    resPreReservedSeat.PRSCompartmentNbr = data[8];
    resPreReservedSeat.PRSRowNbr = data[9];
    resPreReservedSeat.PRSLetter = data[10];
    resPreReservedSeat.PRSCurrentStatusCode = data[11];
    resPreReservedSeat.SmokingSeatIndicator = data[12];
    resPreReservedSeat.NonSmokingSeatIndicator = data[13];
    resPreReservedSeat.WindowSeatIndicator = data[14];
    resPreReservedSeat.AisleSeatIndicator = data[15];
    resPreReservedSeat.LeftSideSeatIndicator = data[16];
    resPreReservedSeat.ExitSeatIndicator = data[17];
    resPreReservedSeat.RightSideSeatIndicator = data[18];
    resPreReservedSeat.BulkheadSeatIndicator = data[19];
    resPreReservedSeat.UpperCompartmentSeatIndicator = data[20];
    resPreReservedSeat.OverWingSeatIndicator = data[21];
    resPreReservedSeat.HistoryActionCodeId = data[22];
    resPreReservedSeat.RecordUpdateDate =
      data[23] !== null ? new Date(moment(data[23]).format(formatDate)) : null;
    resPreReservedSeat.RecordUpdateTime =
      data[24] !== null
        ? new Date(
            moment(`${fileDate} ${data[24]}`)
              .add(1, 'd')
              .format(formatDateTime),
          )
        : null;
    resPreReservedSeat.IntraPNRSetNbr = data[25];

    values.push(resPreReservedSeat);
  });

  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();

    const table = new sql.Table('tbResPreReservedSeat');
    table.create = true;
    table.columns.add('ImportDate', sql.DateTime, { nullable: true });
    table.columns.add('BookingCode', sql.NVarChar(6), { nullable: true });
    table.columns.add('CreateDate', sql.Date, { nullable: true });
    table.columns.add('FromDateTime', sql.DateTime, { nullable: true });
    table.columns.add('PNRPassengerSeqId', sql.Int, { nullable: true });
    table.columns.add('PRSSeqNbr', sql.Int, { nullable: true });
    table.columns.add('VendorCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('PRSFlightNumber', sql.NVarChar(5), { nullable: true });
    table.columns.add('PRSCompartmentNbr', sql.Int, { nullable: true });
    table.columns.add('PRSRowNbr', sql.Int, { nullable: true });
    table.columns.add('PRSLetter', sql.NVarChar(1), { nullable: true });
    table.columns.add('PRSCurrentStatusCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('SmokingSeatIndicator', sql.NVarChar(1), { nullable: true });
    table.columns.add('NonSmokingSeatIndicator', sql.NVarChar(1), { nullable: true });
    table.columns.add('WindowSeatIndicator', sql.NVarChar(1), { nullable: true });
    table.columns.add('AisleSeatIndicator', sql.NVarChar(1), { nullable: true });
    table.columns.add('LeftSideSeatIndicator', sql.NVarChar(1), { nullable: true });
    table.columns.add('ExitSeatIndicator', sql.NVarChar(1), { nullable: true });
    table.columns.add('RightSideSeatIndicator', sql.NVarChar(1), { nullable: true });
    table.columns.add('BulkheadSeatIndicator', sql.NVarChar(1), { nullable: true });
    table.columns.add('UpperCompartmentSeatIndicator', sql.NVarChar(1), {
      nullable: true,
    });
    table.columns.add('OverWingSeatIndicator', sql.NVarChar(1), { nullable: true });
    table.columns.add('HistoryActionCodeId', sql.NVarChar(4), { nullable: true });
    table.columns.add('RecordUpdateDate', sql.Date, { nullable: true });
    table.columns.add('RecordUpdateTime', sql.DateTime, { nullable: true });
    table.columns.add('IntraPNRSetNbr', sql.Int, { nullable: true });

    values.forEach(value => {
      table.rows.add(
        value.ImportDate,
        value.BookingCode,
        value.CreateDate,
        value.FromDateTime,
        value.PNRPassengerSeqId,
        value.PRSSeqNbr,
        value.VendorCode,
        value.PRSFlightNumber,
        value.PRSCompartmentNbr,
        value.PRSRowNbr,
        value.PRSLetter,
        value.PRSCurrentStatusCode,
        value.SmokingSeatIndicator,
        value.NonSmokingSeatIndicator,
        value.WindowSeatIndicator,
        value.AisleSeatIndicator,
        value.LeftSideSeatIndicator,
        value.ExitSeatIndicator,
        value.RightSideSeatIndicator,
        value.BulkheadSeatIndicator,
        value.UpperCompartmentSeatIndicator,
        value.OverWingSeatIndicator,
        value.HistoryActionCodeId,
        value.RecordUpdateDate,
        value.RecordUpdateTime,
        value.IntraPNRSetNbr,
      );
    });

    const transaction = new sql.Transaction(pool);

    transaction.begin(errorTransaction => {
      if (errorTransaction) throw errorTransaction;

      let rollBack = false;

      transaction.on('rollback', () => {
        rollBack = true;
      });

      const request = new sql.Request(transaction);

      request
        .bulk(table)
        .then(() => {
          // console.log(result.rowsAffected);
          transaction.commit(errorCommit => {
            if (errorCommit) {
              throw errorCommit;
            }
          });
        })
        .catch(error => {
          if (!rollBack) {
            transaction.rollback();
          }
          throw error;
        });
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const importResPassengerDoc = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  const lineReader = createInterface({
    input: createReadStream(filePath),
  });

  const values = [];
  lineReader.on('line', line => {
    const data = line.split('|').map(item => (item !== '' ? item.trim() : null));
    const resPassengerDoc = new tbResPassengerDoc();

    resPassengerDoc.ImportDate = new Date(moment(fileDate).format(formatDateTime));
    resPassengerDoc.BookingCode = data[1];
    resPassengerDoc.CreateDate =
      data[2] !== null ? new Date(moment(data[2]).format(formatDate)) : null;
    resPassengerDoc.FromDateTime =
      data[3] !== null ? new Date(moment(data[3]).format(formatDateTime)) : null;
    resPassengerDoc.PassengerDocSeqId = data[4];
    resPassengerDoc.PNRPassengerSeqId = data[5];
    resPassengerDoc.DocBirthdate =
      data[6] !== null ? new Date(moment(data[6]).format(formatDate)) : null;
    resPassengerDoc.DocNumber = data[7];
    resPassengerDoc.DocTypeCode = data[8];
    resPassengerDoc.GenderCode = data[9];
    resPassengerDoc.InfantInd = data[10];
    resPassengerDoc.IssueCountryCode = data[11];
    resPassengerDoc.PassengerFirstName = data[12];
    resPassengerDoc.PassengerSecondName = data[13];
    resPassengerDoc.PassengerLastName = data[14];
    resPassengerDoc.PrimaryDocHolderInd = data[15];
    resPassengerDoc.PrimaryDocHolderFirstName = data[16];
    resPassengerDoc.PrimaryDocHolderLastName = data[17];
    resPassengerDoc.SourceTypeCode = data[18];
    resPassengerDoc.SSRCode = data[19];
    resPassengerDoc.SSRIdTypeCode = data[20];
    resPassengerDoc.SSRNumberInParty = data[21];
    resPassengerDoc.SSRStatusCode = data[22];
    resPassengerDoc.SSRText = data[23];
    resPassengerDoc.VendorCode = data[24];
    resPassengerDoc.HistoryActionCodeId = data[25];
    resPassengerDoc.RecordUpdateDate =
      data[26] !== null ? new Date(moment(data[26]).format(formatDate)) : null;
    resPassengerDoc.RecordUpdateTime =
      data[27] !== null
        ? new Date(
            moment(`${fileDate} ${data[27]}`)
              .add(1, 'd')
              .format(formatDateTime),
          )
        : null;
    resPassengerDoc.IntraPNRSetNbr = data[28];
    resPassengerDoc.DocIssueDate =
      data[29] !== null ? new Date(moment(data[29]).format(formatDate)) : null;
    resPassengerDoc.DocExpDate =
      data[30] !== null ? new Date(moment(data[30]).format(formatDate)) : null;

    values.push(resPassengerDoc);
  });

  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();

    const table = new sql.Table('tbResPassengerDoc');
    table.create = true;
    table.columns.add('ImportDate', sql.DateTime, { nullable: true });
    table.columns.add('BookingCode', sql.NVarChar(6), { nullable: true });
    table.columns.add('CreateDate', sql.Date, { nullable: true });
    table.columns.add('FromDateTime', sql.DateTime, { nullable: true });
    table.columns.add('PassengerDocSeqId', sql.Int, { nullable: true });
    table.columns.add('PNRPassengerSeqId', sql.Int, { nullable: true });
    table.columns.add('DocBirthdate', sql.Date, { nullable: true });
    table.columns.add('DocNumber', sql.NVarChar(20), { nullable: true });
    table.columns.add('DocTypeCode', sql.NVarChar(2), { nullable: true });
    table.columns.add('GenderCode', sql.NVarChar(1), { nullable: true });
    table.columns.add('InfantInd', sql.NVarChar(1), { nullable: true });
    table.columns.add('IssueCountryCode', sql.NVarChar(4), { nullable: true });
    table.columns.add('PassengerFirstName', sql.NVarChar(50), { nullable: true });
    table.columns.add('PassengerSecondName', sql.NVarChar(50), { nullable: true });
    table.columns.add('PassengerLastName', sql.NVarChar(50), { nullable: true });
    table.columns.add('PrimaryDocHolderInd', sql.NVarChar(1), { nullable: true });
    table.columns.add('PrimaryDocHolderFirstName', sql.NVarChar(50), { nullable: true });
    table.columns.add('PrimaryDocHolderLastName', sql.NVarChar(50), { nullable: true });
    table.columns.add('SourceTypeCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('SSRCode', sql.NVarChar(4), { nullable: true });
    table.columns.add('SSRIdTypeCode', sql.NVarChar(1), { nullable: true });
    table.columns.add('SSRNumberInParty', sql.Int, { nullable: true });
    table.columns.add('SSRStatusCode', sql.NVarChar(2), { nullable: true });
    table.columns.add('SSRText', sql.NVarChar(128), { nullable: true });
    table.columns.add('VendorCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('HistoryActionCodeId', sql.NVarChar(4), { nullable: true });
    table.columns.add('RecordUpdateDate', sql.Date, { nullable: true });
    table.columns.add('RecordUpdateTime', sql.DateTime, { nullable: true });
    table.columns.add('IntraPNRSetNbr', sql.Int, { nullable: true });
    table.columns.add('DocIssueDate', sql.Date, { nullable: true });
    table.columns.add('DocExpDate', sql.Date, { nullable: true });

    values.forEach(value => {
      table.rows.add(
        value.ImportDate,
        value.BookingCode,
        value.CreateDate,
        value.FromDateTime,
        value.PassengerDocSeqId,
        value.PNRPassengerSeqId,
        value.DocBirthdate,
        value.DocNumber,
        value.DocTypeCode,
        value.GenderCode,
        value.InfantInd,
        value.IssueCountryCode,
        value.PassengerFirstName,
        value.PassengerSecondName,
        value.PassengerLastName,
        value.PrimaryDocHolderInd,
        value.PrimaryDocHolderFirstName,
        value.PrimaryDocHolderLastName,
        value.SourceTypeCode,
        value.SSRCode,
        value.SSRIdTypeCode,
        value.SSRNumberInParty,
        value.SSRStatusCode,
        value.SSRText,
        value.VendorCode,
        value.HistoryActionCodeId,
        value.RecordUpdateDate,
        value.RecordUpdateTime,
        value.IntraPNRSetNbr,
        value.DocIssueDate,
        value.DocExpDate,
      );
    });

    const transaction = new sql.Transaction(pool);

    transaction.begin(errorTransaction => {
      if (errorTransaction) throw errorTransaction;

      let rollBack = false;

      transaction.on('rollback', () => {
        rollBack = true;
      });

      const request = new sql.Request(transaction);

      request
        .bulk(table)
        .then(() => {
          // console.log(result.rowsAffected);
          transaction.commit(errorCommit => {
            if (errorCommit) {
              throw errorCommit;
            }
          });
        })
        .catch(error => {
          if (!rollBack) {
            transaction.rollback();
          }
          throw error;
        });
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const importResSuspenseDocArrangement = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  const lineReader = createInterface({
    input: createReadStream(filePath),
  });

  const values = [];
  lineReader.on('line', line => {
    const data = line.split('|').map(item => (item !== '' ? item.trim() : null));
    const resSuspenseDocArrangement = new tbResSuspenseDocArrangement();

    resSuspenseDocArrangement.ImportDate = new Date(
      moment(fileDate).format(formatDateTime),
    );
    resSuspenseDocArrangement.BookingCode = data[1];
    resSuspenseDocArrangement.CreateDate =
      data[2] !== null ? new Date(moment(data[2]).format(formatDate)) : null;
    resSuspenseDocArrangement.FromDateTime =
      data[3] !== null ? new Date(moment(data[3]).format(formatDateTime)) : null;
    resSuspenseDocArrangement.PNRPassengerSeqID = data[4];
    resSuspenseDocArrangement.ResArrSequenceId = data[5];
    resSuspenseDocArrangement.ResArrQueuePlaceDate =
      data[6] !== null ? new Date(moment(data[6]).format(formatDate)) : null;
    resSuspenseDocArrangement.ResArrQueueName = data[7];
    resSuspenseDocArrangement.ResArrangementLocationCode = data[8];
    resSuspenseDocArrangement.ArrPassengerReferenceName = data[9];
    resSuspenseDocArrangement.ArrActivityDate =
      data[10] !== null ? new Date(moment(data[10]).format(formatDate)) : null;
    resSuspenseDocArrangement.ArrActivityTime =
      data[11] !== null
        ? new Date(
            moment(`${fileDate} ${data[11]}`)
              .add(1, 'd')
              .format(formatDateTime),
          )
        : null;
    resSuspenseDocArrangement.ArrDutyCode = data[12];
    resSuspenseDocArrangement.ArrSine = data[13];
    resSuspenseDocArrangement.SSRText = data[14];
    resSuspenseDocArrangement.SSRCode = data[15];
    resSuspenseDocArrangement.SourceTypeCode = data[16];
    resSuspenseDocArrangement.SSRIdTypeCode = data[17];
    resSuspenseDocArrangement.ResArrActionCode = data[18];
    resSuspenseDocArrangement.ServiceStartCityCode = data[19];
    resSuspenseDocArrangement.ServiceEndCityCode = data[20];
    resSuspenseDocArrangement.TicketNbr = data[21];
    resSuspenseDocArrangement.SSRNbrInParty = data[22];
    resSuspenseDocArrangement.SSRStartDate =
      data[23] !== null ? new Date(moment(data[23]).format(formatDate)) : null;
    resSuspenseDocArrangement.SSRFlightNumber = data[24];
    resSuspenseDocArrangement.ClassOfService = data[25];
    resSuspenseDocArrangement.VendorCode = data[26];
    resSuspenseDocArrangement.SSRStatusCode = data[27];
    resSuspenseDocArrangement.HistorvActionCodeld = data[28];
    resSuspenseDocArrangement.RecordUpdateDate =
      data[29] !== null ? new Date(moment(data[29]).format(formatDate)) : null;
    resSuspenseDocArrangement.RecordUpdateTime =
      data[30] !== null
        ? new Date(
            moment(`${fileDate} ${data[30]}`)
              .add(1, 'd')
              .format(formatDateTime),
          )
        : null;
    resSuspenseDocArrangement.IntraPNRSetNbr = data[31];

    values.push(resSuspenseDocArrangement);
  });

  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();

    const table = new sql.Table('tbResSuspenseDocArrangement');
    table.create = true;
    table.columns.add('ImportDate', sql.DateTime, { nullable: true });
    table.columns.add('BookingCode', sql.NVarChar(6), { nullable: true });
    table.columns.add('CreateDate', sql.Date, { nullable: true });
    table.columns.add('FromDateTime', sql.DateTime, { nullable: true });
    table.columns.add('PNRPassengerSeqID', sql.Int, { nullable: true });
    table.columns.add('ResArrSequenceId', sql.Int, { nullable: true });
    table.columns.add('ResArrQueuePlaceDate', sql.Date, { nullable: true });
    table.columns.add('ResArrQueueName', sql.NVarChar(3), { nullable: true });
    table.columns.add('ResArrangementLocationCode', sql.NVarChar(5), { nullable: true });
    table.columns.add('ArrPassengerReferenceName', sql.NVarChar(7), { nullable: true });
    table.columns.add('ArrActivityDate', sql.Date, { nullable: true });
    table.columns.add('ArrActivityTime', sql.DateTime, { nullable: true });
    table.columns.add('ArrDutyCode', sql.NVarChar(1), { nullable: true });
    table.columns.add('ArrSine', sql.NVarChar(3), { nullable: true });
    table.columns.add('SSRText', sql.NVarChar(128), { nullable: true });
    table.columns.add('SSRCode', sql.NVarChar(4), { nullable: true });
    table.columns.add('SourceTypeCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('SSRIdTypeCode', sql.NVarChar(1), { nullable: true });
    table.columns.add('ResArrActionCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('ServiceStartCityCode', sql.NVarChar(5), { nullable: true });
    table.columns.add('ServiceEndCityCode', sql.NVarChar(5), { nullable: true });
    table.columns.add('TicketNbr', sql.NVarChar(70), { nullable: true });
    table.columns.add('SSRNbrInParty', sql.Int, { nullable: true });
    table.columns.add('SSRStartDate', sql.Date, { nullable: true });
    table.columns.add('SSRFlightNumber', sql.NVarChar(10), { nullable: true });
    table.columns.add('ClassOfService', sql.NVarChar(2), { nullable: true });
    table.columns.add('VendorCode', sql.NVarChar(2), { nullable: true });
    table.columns.add('SSRStatusCode', sql.NVarChar(2), { nullable: true });
    table.columns.add('HistorvActionCodeld', sql.NVarChar(4), { nullable: true });
    table.columns.add('RecordUpdateDate', sql.Date, { nullable: true });
    table.columns.add('RecordUpdateTime', sql.DateTime, { nullable: true });
    table.columns.add('IntraPNRSetNbr', sql.Int, { nullable: true });

    values.forEach(value => {
      table.rows.add(
        value.ImportDate,
        value.BookingCode,
        value.CreateDate,
        value.FromDateTime,
        value.PNRPassengerSeqID,
        value.ResArrSequenceId,
        value.ResArrQueuePlaceDate,
        value.ResArrQueueName,
        value.ResArrangementLocationCode,
        value.ArrPassengerReferenceName,
        value.ArrActivityDate,
        value.ArrActivityTime,
        value.ArrDutyCode,
        value.ArrSine,
        value.SSRText,
        value.SSRCode,
        value.SourceTypeCode,
        value.SSRIdTypeCode,
        value.ResArrActionCode,
        value.ServiceStartCityCode,
        value.ServiceEndCityCode,
        value.TicketNbr,
        value.SSRNbrInParty,
        value.SSRStartDate,
        value.SSRFlightNumber,
        value.ClassOfService,
        value.VendorCode,
        value.SSRStatusCode,
        value.HistorvActionCodeld,
        value.RecordUpdateDate,
        value.RecordUpdateTime,
        value.IntraPNRSetNbr,
      );
    });

    const transaction = new sql.Transaction(pool);

    transaction.begin(errorTransaction => {
      if (errorTransaction) throw errorTransaction;

      let rollBack = false;

      transaction.on('rollback', () => {
        rollBack = true;
      });

      const request = new sql.Request(transaction);

      request
        .bulk(table)
        .then(() => {
          // console.log(result.rowsAffected);
          transaction.commit(errorCommit => {
            if (errorCommit) {
              throw errorCommit;
            }
          });
        })
        .catch(error => {
          if (!rollBack) {
            transaction.rollback();
          }
          throw error;
        });
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const importResSuspenseTimeLimit = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  const lineReader = createInterface({
    input: createReadStream(filePath),
  });

  const values = [];
  lineReader.on('line', line => {
    const data = line.split('|').map(item => (item !== '' ? item.trim() : null));
    const resSuspenseTimeLimit = new tbResSuspenseTimeLimit();

    resSuspenseTimeLimit.ImportDate = new Date(moment(fileDate).format(formatDateTime));
    resSuspenseTimeLimit.BookingCode = data[1];
    resSuspenseTimeLimit.CreateDate =
      data[2] !== null ? new Date(moment(data[2]).format(formatDate)) : null;
    resSuspenseTimeLimit.FromDateTime =
      data[3] !== null ? new Date(moment(data[3]).format(formatDateTime)) : null;
    resSuspenseTimeLimit.SuspenseSequenceId = data[4];
    resSuspenseTimeLimit.TimeLimitActionTime = data[5];
    resSuspenseTimeLimit.TimeLimitActionDate =
      data[6] !== null ? new Date(moment(data[6]).format(formatDate)) : null;
    resSuspenseTimeLimit.TimeLimitLocationCode =
      data[7] !== null
        ? new Date(
            moment(`${fileDate} ${data[7]}`)
              .add(1, 'd')
              .format(formatDateTime),
          )
        : null;
    resSuspenseTimeLimit.TimeLimitVendorCode = data[8];
    resSuspenseTimeLimit.HistoryActionCodeId = data[9];
    resSuspenseTimeLimit.RecordUpdateDate =
      data[10] !== null ? new Date(moment(data[10]).format(formatDate)) : null;
    resSuspenseTimeLimit.RecordUpdateTime =
      data[11] !== null
        ? new Date(
            moment(`${fileDate} ${data[11]}`)
              .add(1, 'd')
              .format(formatDateTime),
          )
        : null;
    resSuspenseTimeLimit.IntraPNRSetNbr = data[12];

    values.push(resSuspenseTimeLimit);
  });

  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();

    const table = new sql.Table('tbResSuspenseTimeLimit');
    table.create = true;
    table.columns.add('ImportDate', sql.DateTime, { nullable: true });
    table.columns.add('BookingCode', sql.NVarChar(6), { nullable: true });
    table.columns.add('CreateDate', sql.Date, { nullable: true });
    table.columns.add('FromDateTime', sql.DateTime, { nullable: true });
    table.columns.add('SuspenseSequenceId', sql.NVarChar(1), { nullable: true });
    table.columns.add('TimeLimitActionTime', sql.NVarChar(5), { nullable: true });
    table.columns.add('TimeLimitActionDate', sql.Date, { nullable: true });
    table.columns.add('TimeLimitLocationCode', sql.DateTime, { nullable: true });
    table.columns.add('TimeLimitVendorCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('HistoryActionCodeId', sql.NVarChar(4), { nullable: true });
    table.columns.add('RecordUpdateDate', sql.Date, { nullable: true });
    table.columns.add('RecordUpdateTime', sql.DateTime, { nullable: true });
    table.columns.add('IntraPNRSetNbr', sql.Int, { nullable: true });

    values.forEach(value => {
      table.rows.add(
        value.ImportDate,
        value.BookingCode,
        value.CreateDate,
        value.FromDateTime,
        value.SuspenseSequenceId,
        value.TimeLimitActionTime,
        value.TimeLimitActionDate,
        value.TimeLimitLocationCode,
        value.TimeLimitVendorCode,
        value.HistoryActionCodeId,
        value.RecordUpdateDate,
        value.RecordUpdateTime,
        value.IntraPNRSetNbr,
      );
    });

    const transaction = new sql.Transaction(pool);

    transaction.begin(errorTransaction => {
      if (errorTransaction) throw errorTransaction;

      let rollBack = false;

      transaction.on('rollback', () => {
        rollBack = true;
      });

      const request = new sql.Request(transaction);

      request
        .bulk(table)
        .then(() => {
          // console.log(result.rowsAffected);
          transaction.commit(errorCommit => {
            if (errorCommit) {
              throw errorCommit;
            }
          });
        })
        .catch(error => {
          if (!rollBack) {
            transaction.rollback();
          }
          throw error;
        });
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const importResEmergencyContact = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  const lineReader = createInterface({
    input: createReadStream(filePath),
  });

  const values = [];
  lineReader.on('line', line => {
    const data = line.split('|').map(item => (item !== '' ? item.trim() : null));
    const resEmergencyContact = new tbResEmergencyContact();

    resEmergencyContact.ImportDate = new Date(moment(fileDate).format(formatDateTime));
    resEmergencyContact.BookingCode = data[1];
    resEmergencyContact.CreateDate =
      data[2] !== null ? new Date(moment(data[2]).format(formatDate)) : null;
    resEmergencyContact.FromDateTime =
      data[3] !== null ? new Date(moment(data[3]).format(formatDateTime)) : null;
    resEmergencyContact.PNRPassengerSeqId = data[4];
    resEmergencyContact.SourceTypeCode = data[5];
    resEmergencyContact.SSRIdTypeCode = data[6];
    resEmergencyContact.SSRStatusCode = data[7];
    resEmergencyContact.SSRCode = data[8];
    resEmergencyContact.EmergencyContactSeqId = data[9];
    resEmergencyContact.EmergencyPhoneNumber = data[10];
    resEmergencyContact.EmergencyContactName = data[11];
    resEmergencyContact.CountryCode = data[12];
    resEmergencyContact.VendorCode = data[13];
    resEmergencyContact.SSRText = data[14];
    resEmergencyContact.HistoryActionCodeId = data[15];
    resEmergencyContact.RecordUpdateDate =
      data[16] !== null ? new Date(moment(data[16]).format(formatDate)) : null;
    resEmergencyContact.RecordUpdateTime =
      data[17] !== null
        ? new Date(
            moment(`${fileDate} ${data[17]}`)
              .add(1, 'd')
              .format(formatDateTime),
          )
        : null;
    resEmergencyContact.IntraPNRSetNbr = data[18];

    values.push(resEmergencyContact);
  });

  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();

    const table = new sql.Table('tbResEmergencyContact');
    table.create = true;
    table.columns.add('ImportDate', sql.DateTime, { nullable: true });
    table.columns.add('BookingCode', sql.NVarChar(6), { nullable: true });
    table.columns.add('CreateDate', sql.Date, { nullable: true });
    table.columns.add('FromDateTime', sql.DateTime, { nullable: true });
    table.columns.add('PNRPassengerSeqId', sql.Int, { nullable: true });
    table.columns.add('SourceTypeCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('SSRIdTypeCode', sql.NVarChar(1), { nullable: true });
    table.columns.add('SSRStatusCode', sql.NVarChar(2), { nullable: true });
    table.columns.add('SSRCode', sql.NVarChar(4), { nullable: true });
    table.columns.add('EmergencyContactSeqId', sql.Int, { nullable: true });
    table.columns.add('EmergencyPhoneNumber', sql.NVarChar(25), { nullable: true });
    table.columns.add('EmergencyContactName', sql.NVarChar(40), { nullable: true });
    table.columns.add('CountryCode', sql.NVarChar(4), { nullable: true });
    table.columns.add('VendorCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('SSRText', sql.NVarChar(128), { nullable: true });
    table.columns.add('HistoryActionCodeId', sql.NVarChar(4), { nullable: true });
    table.columns.add('RecordUpdateDate', sql.Date, { nullable: true });
    table.columns.add('RecordUpdateTime', sql.DateTime, { nullable: true });
    table.columns.add('IntraPNRSetNbr', sql.Int, { nullable: true });

    values.forEach(value => {
      table.rows.add(
        value.ImportDate,
        value.BookingCode,
        value.CreateDate,
        value.FromDateTime,
        value.PNRPassengerSeqId,
        value.SourceTypeCode,
        value.SSRIdTypeCode,
        value.SSRStatusCode,
        value.SSRCode,
        value.EmergencyContactSeqId,
        value.EmergencyPhoneNumber,
        value.EmergencyContactName,
        value.CountryCode,
        value.VendorCode,
        value.SSRText,
        value.HistoryActionCodeId,
        value.RecordUpdateDate,
        value.RecordUpdateTime,
        value.IntraPNRSetNbr,
      );
    });

    const transaction = new sql.Transaction(pool);

    transaction.begin(errorTransaction => {
      if (errorTransaction) throw errorTransaction;

      let rollBack = false;

      transaction.on('rollback', () => {
        rollBack = true;
      });

      const request = new sql.Request(transaction);

      request
        .bulk(table)
        .then(() => {
          // console.log(result.rowsAffected);
          transaction.commit(errorCommit => {
            if (errorCommit) {
              throw errorCommit;
            }
          });
        })
        .catch(error => {
          if (!rollBack) {
            transaction.rollback();
          }
          throw error;
        });
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const importResPassenger = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  const lineReader = createInterface({
    input: createReadStream(filePath),
  });

  const values = [];
  lineReader.on('line', line => {
    const data = line.split('|').map(item => (item !== '' ? item.trim() : null));
    const resPassenger = new tbResPassenger();

    resPassenger.ImportDate = new Date(moment(fileDate).format(formatDateTime));
    resPassenger.BookingCode = data[1];
    resPassenger.CreateDate =
      data[2] !== null ? new Date(moment(data[2]).format(formatDate)) : null;
    resPassenger.FromDateTime =
      data[3] !== null ? new Date(moment(data[3]).format(formatDateTime)) : null;
    resPassenger.PNRPassengerSeqId = data[4];
    resPassenger.NameFirst = data[5];
    resPassenger.NameLast = data[6];
    resPassenger.NameComment = data[7];
    resPassenger.RelativePassengerNbr = data[8];
    resPassenger.HistoryActionCodeId = data[9];
    resPassenger.RecordUpdateDate =
      data[10] !== null ? new Date(moment(data[10]).format(formatDate)) : null;
    resPassenger.RecordUpdateTime =
      data[11] !== null
        ? new Date(
            moment(`${fileDate} ${data[11]}`)
              .add(1, 'd')
              .format(formatDateTime),
          )
        : null;
    resPassenger.IntraPNRSetNbr = data[12];

    values.push(resPassenger);
  });

  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();

    const table = new sql.Table('tbResPassenger');
    table.create = true;
    table.columns.add('ImportDate', sql.DateTime, { nullable: true });
    table.columns.add('BookingCode', sql.NVarChar(6), { nullable: true });
    table.columns.add('CreateDate', sql.Date, { nullable: true });
    table.columns.add('FromDateTime', sql.DateTime, { nullable: true });
    table.columns.add('PNRPassengerSeqId', sql.Int, { nullable: true });
    table.columns.add('NameFirst', sql.NVarChar(250), { nullable: true });
    table.columns.add('NameLast', sql.NVarChar(250), { nullable: true });
    table.columns.add('NameComment', sql.NVarChar(250), { nullable: true });
    table.columns.add('RelativePassengerNbr', sql.NVarChar(6), { nullable: true });
    table.columns.add('HistoryActionCodeId', sql.NVarChar(4), { nullable: true });
    table.columns.add('RecordUpdateDate', sql.Date, { nullable: true });
    table.columns.add('RecordUpdateTime', sql.DateTime, { nullable: true });
    table.columns.add('IntraPNRSetNbr', sql.Int, { nullable: true });

    values.forEach(value => {
      table.rows.add(
        value.ImportDate,
        value.BookingCode,
        value.CreateDate,
        value.FromDateTime,
        value.PNRPassengerSeqId,
        value.NameFirst,
        value.NameLast,
        value.NameComment,
        value.RelativePassengerNbr,
        value.HistoryActionCodeId,
        value.RecordUpdateDate,
        value.RecordUpdateTime,
        value.IntraPNRSetNbr,
      );
    });

    const transaction = new sql.Transaction(pool);

    transaction.begin(errorTransaction => {
      if (errorTransaction) throw errorTransaction;

      let rollBack = false;

      transaction.on('rollback', () => {
        rollBack = true;
      });

      const request = new sql.Request(transaction);

      request
        .bulk(table)
        .then(() => {
          // console.log(result.rowsAffected);
          transaction.commit(errorCommit => {
            if (errorCommit) {
              throw errorCommit;
            }
          });
        })
        .catch(error => {
          if (!rollBack) {
            transaction.rollback();
          }
          throw error;
        });
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const importResSSR = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  const lineReader = createInterface({
    input: createReadStream(filePath),
  });

  const values = [];
  lineReader.on('line', line => {
    const data = line.split('|').map(item => (item !== '' ? item.trim() : null));
    const resSSR = new tbResSSR();

    resSSR.ImportDate = new Date(moment(fileDate).format(formatDateTime));
    resSSR.BookingCode = data[1];
    resSSR.CreateDate =
      data[2] !== null ? new Date(moment(data[2]).format(formatDate)) : null;
    resSSR.FromDateTime =
      data[3] !== null ? new Date(moment(data[3]).format(formatDateTime)) : null;
    resSSR.ResSSRSeqId = data[4];
    resSSR.PNRPassengerSeqId = data[5];
    resSSR.SourceTypeCode = data[6];
    resSSR.SSRIdTypeCode = data[7];
    resSSR.SSRStatusCode = data[8];
    resSSR.SSRFlightNumber = data[9];
    resSSR.SSRNbrInParty = data[10];
    resSSR.SSRStartDate =
      data[11] !== null ? new Date(moment(data[11]).format(formatDate)) : null;
    resSSR.VendorCode = data[12];
    resSSR.SSRCode = data[13];
    resSSR.SSRText = data[14];
    resSSR.ClassOfService = data[15];
    resSSR.ServiceStartCityCode = data[16];
    resSSR.ServiceEndCityCode = data[17];
    resSSR.HistoryActionCodeId = data[18];
    resSSR.RecordUpdateDate =
      data[19] !== null ? new Date(moment(data[19]).format(formatDate)) : null;
    resSSR.RecordUpdateTime =
      data[20] !== null
        ? new Date(
            moment(`${fileDate} ${data[20]}`)
              .add(1, 'd')
              .format(formatDateTime),
          )
        : null;
    resSSR.IntraPNRSetNbr = data[21];

    values.push(resSSR);
  });

  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();

    const table = new sql.Table('tbResSSR');
    table.create = true;
    table.columns.add('ImportDate', sql.DateTime, { nullable: true });
    table.columns.add('BookingCode', sql.NVarChar(6), { nullable: true });
    table.columns.add('CreateDate', sql.Date, { nullable: true });
    table.columns.add('FromDateTime', sql.DateTime, { nullable: true });
    table.columns.add('ResSSRSeqId', sql.Int, { nullable: true });
    table.columns.add('PNRPassengerSeqId', sql.Int, { nullable: true });
    table.columns.add('SourceTypeCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('SSRIdTypeCode', sql.NVarChar(1), { nullable: true });
    table.columns.add('SSRStatusCode', sql.NVarChar(2), { nullable: true });
    table.columns.add('SSRFlightNumber', sql.NVarChar(5), { nullable: true });
    table.columns.add('SSRNbrInParty', sql.Int, { nullable: true });
    table.columns.add('SSRStartDate', sql.Date, { nullable: true });
    table.columns.add('VendorCode', sql.NVarChar(2), { nullable: true });
    table.columns.add('SSRCode', sql.NVarChar(4), { nullable: true });
    table.columns.add('SSRText', sql.NVarChar(256), { nullable: true });
    table.columns.add('ClassOfService', sql.NVarChar(2), { nullable: true });
    table.columns.add('ServiceStartCityCode', sql.NVarChar(5), { nullable: true });
    table.columns.add('ServiceEndCityCode', sql.NVarChar(5), { nullable: true });
    table.columns.add('HistoryActionCodeId', sql.NVarChar(4), { nullable: true });
    table.columns.add('RecordUpdateDate', sql.Date, { nullable: true });
    table.columns.add('RecordUpdateTime', sql.DateTime, { nullable: true });
    table.columns.add('IntraPNRSetNbr', sql.Int, { nullable: true });

    values.forEach(value => {
      table.rows.add(
        value.ImportDate,
        value.BookingCode,
        value.CreateDate,
        value.FromDateTime,
        value.ResSSRSeqId,
        value.PNRPassengerSeqId,
        value.SourceTypeCode,
        value.SSRIdTypeCode,
        value.SSRStatusCode,
        value.SSRFlightNumber,
        value.SSRNbrInParty,
        value.SSRStartDate,
        value.VendorCode,
        value.SSRCode,
        value.SSRText,
        value.ClassOfService,
        value.ServiceStartCityCode,
        value.ServiceEndCityCode,
        value.HistoryActionCodeId,
        value.RecordUpdateDate,
        value.RecordUpdateTime,
        value.IntraPNRSetNbr,
      );
    });

    const transaction = new sql.Transaction(pool);

    transaction.begin(errorTransaction => {
      if (errorTransaction) throw errorTransaction;

      let rollBack = false;

      transaction.on('rollback', () => {
        rollBack = true;
      });

      const request = new sql.Request(transaction);

      request
        .bulk(table)
        .then(() => {
          // console.log(result.rowsAffected);
          transaction.commit(errorCommit => {
            if (errorCommit) {
              throw errorCommit;
            }
          });
        })
        .catch(error => {
          if (!rollBack) {
            transaction.rollback();
          }
          throw error;
        });
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const importResTravelArranger = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  const lineReader = createInterface({
    input: createReadStream(filePath),
  });

  const values = [];
  lineReader.on('line', line => {
    const data = line.split('|').map(item => (item !== '' ? item.trim() : null));
    const resTravelArranger = new tbResTravelArranger();

    resTravelArranger.ImportDate = new Date(moment(fileDate).format(formatDateTime));
    resTravelArranger.BookingCode = data[1];
    resTravelArranger.CreateDate =
      data[2] !== null ? new Date(moment(data[2]).format(formatDate)) : null;
    resTravelArranger.FromDateTime =
      data[3] !== null ? new Date(moment(data[3]).format(formatDateTime)) : null;
    resTravelArranger.SignatureType = data[4];
    resTravelArranger.UpdateAAACityCode = data[5];
    resTravelArranger.UpdateAgentDutyCode = data[6];
    resTravelArranger.UpdateAgentSine = data[7];
    resTravelArranger.UpdateBookingCRSCode = data[8];
    resTravelArranger.UpdateHomeCityCode = data[9];
    resTravelArranger.RecordUpdateDate =
      data[10] !== null ? new Date(moment(data[10]).format(formatDate)) : null;
    resTravelArranger.RecordUpdateTime =
      data[11] !== null
        ? new Date(
            moment(`${fileDate} ${data[11]}`)
              .add(1, 'd')
              .format(formatDateTime),
          )
        : null;
    resTravelArranger.IntraPNRSetNbr = data[12];
    resTravelArranger.ReceivedFrom = data[13];
    resTravelArranger.Unknow = data[14];
    resTravelArranger.Unknow1 = data[15];
    resTravelArranger.Unknow2 = data[16];
    resTravelArranger.Unknow3 = data[17];
    resTravelArranger.Unknow4 = data[18];

    values.push(resTravelArranger);
  });

  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();

    const table = new sql.Table('tbResTravelArranger');
    table.create = true;
    table.columns.add('ImportDate', sql.DateTime, { nullable: true });
    table.columns.add('BookingCode', sql.NVarChar(6), { nullable: true });
    table.columns.add('CreateDate', sql.Date, { nullable: true });
    table.columns.add('FromDateTime', sql.DateTime, { nullable: true });
    table.columns.add('SignatureType', sql.NVarChar(20), { nullable: true });
    table.columns.add('UpdateAAACityCode', sql.NVarChar(5), { nullable: true });
    table.columns.add('UpdateAgentDutyCode', sql.NVarChar(5), { nullable: true });
    table.columns.add('UpdateAgentSine', sql.NVarChar(3), { nullable: true });
    table.columns.add('UpdateBookingCRSCode', sql.NVarChar(5), { nullable: true });
    table.columns.add('UpdateHomeCityCode', sql.NVarChar(5), { nullable: true });
    table.columns.add('RecordUpdateDate', sql.Date, { nullable: true });
    table.columns.add('RecordUpdateTime', sql.DateTime, { nullable: true });
    table.columns.add('IntraPNRSetNbr', sql.Int, { nullable: true });
    table.columns.add('ReceivedFrom', sql.NVarChar(254), { nullable: true });
    table.columns.add('Unknow', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow1', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow2', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow3', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow4', sql.NVarChar(50), { nullable: true });

    values.forEach(value => {
      table.rows.add(
        value.ImportDate,
        value.BookingCode,
        value.CreateDate,
        value.FromDateTime,
        value.SignatureType,
        value.UpdateAAACityCode,
        value.UpdateAgentDutyCode,
        value.UpdateAgentSine,
        value.UpdateBookingCRSCode,
        value.UpdateHomeCityCode,
        value.RecordUpdateDate,
        value.RecordUpdateTime,
        value.IntraPNRSetNbr,
        value.ReceivedFrom,
        value.Unknow,
        value.Unknow1,
        value.Unknow2,
        value.Unknow3,
        value.Unknow4,
      );
    });

    const transaction = new sql.Transaction(pool);

    transaction.begin(errorTransaction => {
      if (errorTransaction) throw errorTransaction;

      let rollBack = false;

      transaction.on('rollback', () => {
        rollBack = true;
      });

      const request = new sql.Request(transaction);

      request
        .bulk(table)
        .then(() => {
          // console.log(result.rowsAffected);
          transaction.commit(errorCommit => {
            if (errorCommit) {
              throw errorCommit;
            }
          });
        })
        .catch(error => {
          if (!rollBack) {
            transaction.rollback();
          }
          throw error;
        });
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const importResPassengerEmail = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  const lineReader = createInterface({
    input: createReadStream(filePath),
  });

  const values = [];
  lineReader.on('line', line => {
    const data = line.split('|').map(item => (item !== '' ? item.trim() : null));
    const resPassengerEmail = new tbResPassengerEmail();

    resPassengerEmail.ImportDate = new Date(moment(fileDate).format(formatDateTime));
    resPassengerEmail.BookingCode = data[1];
    resPassengerEmail.CreateDate =
      data[2] !== null ? new Date(moment(data[2]).format(formatDate)) : null;
    resPassengerEmail.FromDateTime =
      data[3] !== null ? new Date(moment(data[3]).format(formatDateTime)) : null;
    resPassengerEmail.PNRPassengerEMailSeqId = data[4];
    resPassengerEmail.EMailAddress = data[5];
    resPassengerEmail.HistoryActionCodeId = data[6];
    resPassengerEmail.RecordUpdateDate =
      data[7] !== null ? new Date(moment(data[7]).format(formatDate)) : null;
    resPassengerEmail.RecordUpdateTime =
      data[8] !== null
        ? new Date(
            moment(`${fileDate} ${data[8]}`)
              .add(1, 'd')
              .format(formatDateTime),
          )
        : null;
    resPassengerEmail.IntraPNRSetNbr = data[9];
    resPassengerEmail.PNRPassengerSeqID = data[10];

    values.push(resPassengerEmail);
  });

  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();

    const table = new sql.Table('tbResPassengerEmail');
    table.create = true;
    table.columns.add('ImportDate', sql.DateTime, { nullable: true });
    table.columns.add('BookingCode', sql.NVarChar(6), { nullable: true });
    table.columns.add('CreateDate', sql.Date, { nullable: true });
    table.columns.add('FromDateTime', sql.DateTime, { nullable: true });
    table.columns.add('PNRPassengerEMailSeqId', sql.Int, { nullable: true });
    table.columns.add('EMailAddress', sql.NVarChar(250), { nullable: true });
    table.columns.add('HistoryActionCodeId', sql.NVarChar(4), { nullable: true });
    table.columns.add('RecordUpdateDate', sql.Date, { nullable: true });
    table.columns.add('RecordUpdateTime', sql.DateTime, { nullable: true });
    table.columns.add('IntraPNRSetNbr', sql.Int, { nullable: true });
    table.columns.add('PNRPassengerSeqID', sql.Int, { nullable: true });

    values.forEach(value => {
      table.rows.add(
        value.ImportDate,
        value.BookingCode,
        value.CreateDate,
        value.FromDateTime,
        value.PNRPassengerEMailSeqId,
        value.EMailAddress,
        value.HistoryActionCodeId,
        value.RecordUpdateDate,
        value.RecordUpdateTime,
        value.IntraPNRSetNbr,
        value.PNRPassengerSeqID,
      );
    });

    const transaction = new sql.Transaction(pool);

    transaction.begin(errorTransaction => {
      if (errorTransaction) throw errorTransaction;

      let rollBack = false;

      transaction.on('rollback', () => {
        rollBack = true;
      });

      const request = new sql.Request(transaction);

      request
        .bulk(table)
        .then(() => {
          // console.log(result.rowsAffected);
          transaction.commit(errorCommit => {
            if (errorCommit) {
              throw errorCommit;
            }
          });
        })
        .catch(error => {
          if (!rollBack) {
            transaction.rollback();
          }
          throw error;
        });
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const importResPassengerPhone = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  const lineReader = createInterface({
    input: createReadStream(filePath),
  });

  const values = [];
  lineReader.on('line', line => {
    const data = line.split('|').map(item => (item !== '' ? item.trim() : null));
    const resPassengerPhone = new tbResPassengerPhone();

    resPassengerPhone.ImportDate = new Date(moment(fileDate).format(formatDateTime));
    resPassengerPhone.BookingCode = data[1];
    resPassengerPhone.CreateDate =
      data[2] !== null ? new Date(moment(data[2]).format(formatDate)) : null;
    resPassengerPhone.FromDateTime =
      data[3] !== null ? new Date(moment(data[3]).format(formatDateTime)) : null;
    resPassengerPhone.PNRPassengerPhoneSeqId = data[4];
    resPassengerPhone.CityPhoneCode = data[5];
    resPassengerPhone.PhoneNbrText = data[6];
    resPassengerPhone.PhoneTypeCode = data[7];
    resPassengerPhone.HistoryActionCodeId = data[8];
    resPassengerPhone.RecordUpdateDate =
      data[9] !== null ? new Date(moment(data[9]).format(formatDate)) : null;
    resPassengerPhone.RecordUpdateTime =
      data[10] !== null
        ? new Date(
            moment(`${fileDate} ${data[10]}`)
              .add(1, 'd')
              .format(formatDateTime),
          )
        : null;
    resPassengerPhone.IntraPNRSetNbr = data[11];

    values.push(resPassengerPhone);
  });

  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();

    const table = new sql.Table('tbResPassengerPhone');
    table.create = true;
    table.columns.add('ImportDate', sql.DateTime, { nullable: true });
    table.columns.add('BookingCode', sql.NVarChar(6), { nullable: true });
    table.columns.add('CreateDate', sql.Date, { nullable: true });
    table.columns.add('FromDateTime', sql.DateTime, { nullable: true });
    table.columns.add('PNRPassengerPhoneSeqId', sql.Int, { nullable: true });
    table.columns.add('CityPhoneCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('PhoneNbrText', sql.NVarChar(60), { nullable: true });
    table.columns.add('PhoneTypeCode', sql.NVarChar(2), { nullable: true });
    table.columns.add('HistoryActionCodeId', sql.NVarChar(4), { nullable: true });
    table.columns.add('RecordUpdateDate', sql.Date, { nullable: true });
    table.columns.add('RecordUpdateTime', sql.DateTime, { nullable: true });
    table.columns.add('IntraPNRSetNbr', sql.Int, { nullable: true });

    values.forEach(value => {
      table.rows.add(
        value.ImportDate,
        value.BookingCode,
        value.CreateDate,
        value.FromDateTime,
        value.PNRPassengerPhoneSeqId,
        value.CityPhoneCode,
        value.PhoneNbrText,
        value.PhoneTypeCode,
        value.HistoryActionCodeId,
        value.RecordUpdateDate,
        value.RecordUpdateTime,
        value.IntraPNRSetNbr,
      );
    });

    const transaction = new sql.Transaction(pool);

    transaction.begin(errorTransaction => {
      if (errorTransaction) throw errorTransaction;

      let rollBack = false;

      transaction.on('rollback', () => {
        rollBack = true;
      });

      const request = new sql.Request(transaction);

      request
        .bulk(table)
        .then(() => {
          // console.log(result.rowsAffected);
          transaction.commit(errorCommit => {
            if (errorCommit) {
              throw errorCommit;
            }
          });
        })
        .catch(error => {
          if (!rollBack) {
            transaction.rollback();
          }
          throw error;
        });
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const importResODFlight = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  const lineReader = createInterface({
    input: createReadStream(filePath),
  });

  const values = [];
  lineReader.on('line', line => {
    const data = line.split('|').map(item => (item !== '' ? item.trim() : null));
    const resODFlight = new tbResODFlight();

    resODFlight.ImportDate = new Date(moment(fileDate).format(formatDateTime));
    resODFlight.BookingCode = data[1];
    resODFlight.CreateDate =
      data[2] !== null ? new Date(moment(data[2]).format(formatDate)) : null;
    resODFlight.FromDateTime =
      data[3] !== null ? new Date(moment(data[3]).format(formatDateTime)) : null;
    resODFlight.SegmentNbr = data[4];
    resODFlight.AirlineOrigTerminal = data[5];
    resODFlight.AirlineDestTerminal = data[6];
    resODFlight.TravelerOrigTerminal = data[7];
    resODFlight.TravelerDestTerminal = data[8];
    resODFlight.AirlineOrigCntry = data[9];
    resODFlight.AirlineDestCntry = data[10];
    resODFlight.TravelerOrigCntry = data[11];
    resODFlight.TravelerDestCntry = data[12];

    values.push(resODFlight);
  });

  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();

    const table = new sql.Table('tbResODFlight');
    table.create = true;
    table.columns.add('ImportDate', sql.DateTime, { nullable: true });
    table.columns.add('BookingCode', sql.NVarChar(6), { nullable: true });
    table.columns.add('CreateDate', sql.Date, { nullable: true });
    table.columns.add('FromDateTime', sql.DateTime, { nullable: true });
    table.columns.add('SegmentNbr', sql.Int, { nullable: true });
    table.columns.add('AirlineOrigTerminal', sql.NVarChar(3), { nullable: true });
    table.columns.add('AirlineDestTerminal', sql.NVarChar(3), { nullable: true });
    table.columns.add('TravelerOrigTerminal', sql.NVarChar(3), { nullable: true });
    table.columns.add('TravelerDestTerminal', sql.NVarChar(3), { nullable: true });
    table.columns.add('AirlineOrigCntry', sql.NVarChar(3), { nullable: true });
    table.columns.add('AirlineDestCntry', sql.NVarChar(3), { nullable: true });
    table.columns.add('TravelerOrigCntry', sql.NVarChar(3), { nullable: true });
    table.columns.add('TravelerDestCntry', sql.NVarChar(3), { nullable: true });

    values.forEach(value => {
      table.rows.add(
        value.ImportDate,
        value.BookingCode,
        value.CreateDate,
        value.FromDateTime,
        value.SegmentNbr,
        value.AirlineOrigTerminal,
        value.AirlineDestTerminal,
        value.TravelerOrigTerminal,
        value.TravelerDestTerminal,
        value.AirlineOrigCntry,
        value.AirlineDestCntry,
        value.TravelerOrigCntry,
        value.TravelerDestCntry,
      );
    });

    const transaction = new sql.Transaction(pool);

    transaction.begin(errorTransaction => {
      if (errorTransaction) throw errorTransaction;

      let rollBack = false;

      transaction.on('rollback', () => {
        rollBack = true;
      });

      const request = new sql.Request(transaction);

      request
        .bulk(table)
        .then(() => {
          // console.log(result.rowsAffected);
          transaction.commit(errorCommit => {
            if (errorCommit) {
              throw errorCommit;
            }
          });
        })
        .catch(error => {
          if (!rollBack) {
            transaction.rollback();
          }
          throw error;
        });
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const importResAddress = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  const lineReader = createInterface({
    input: createReadStream(filePath),
  });

  const values = [];
  lineReader.on('line', line => {
    const data = line.split('|').map(item => (item !== '' ? item.trim() : null));
    const resAddress = new tbResAddress();

    resAddress.ImportDate = new Date(moment(fileDate).format(formatDateTime));
    resAddress.BookingCode = data[1];
    resAddress.CreateDate =
      data[2] !== null ? new Date(moment(data[2]).format(formatDate)) : null;
    resAddress.FromDateTime =
      data[3] !== null ? new Date(moment(data[3]).format(formatDateTime)) : null;
    resAddress.AddressLine1 = data[4];
    resAddress.AddressLineType_1 = data[5];
    resAddress.AddressLine2 = data[6];
    resAddress.AddressLineType_2 = data[7];
    resAddress.AddressLine3 = data[8];
    resAddress.AddressLineType_3 = data[9];
    resAddress.AddressLine4 = data[10];
    resAddress.AddressLineType_4 = data[11];
    resAddress.AddressLine5 = data[12];
    resAddress.AddressLineType_5 = data[13];
    resAddress.AddressLine6 = data[14];
    resAddress.AddressLineType_6 = data[15];
    resAddress.RecordUpdateDate =
      data[16] !== null ? new Date(moment(data[16]).format(formatDate)) : null;
    resAddress.RecordUpdateTime =
      data[17] !== null
        ? new Date(
            moment(`${fileDate} ${data[17]}`)
              .add(1, 'd')
              .format(formatDateTime),
          )
        : null;
    resAddress.HistoryActionCodeId = data[18];
    resAddress.ResAddressSeqId = data[19];
    resAddress.IntraPNRSetNbr = data[20];

    values.push(resAddress);
  });

  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();

    const table = new sql.Table('tbResAddress');
    table.create = true;
    table.columns.add('ImportDate', sql.DateTime, { nullable: true });
    table.columns.add('BookingCode', sql.NVarChar(6), { nullable: true });
    table.columns.add('CreateDate', sql.Date, { nullable: true });
    table.columns.add('FromDateTime', sql.DateTime, { nullable: true });
    table.columns.add('AddressLine1', sql.NVarChar(50), { nullable: true });
    table.columns.add('AddressLineType_1', sql.NVarChar(1), { nullable: true });
    table.columns.add('AddressLine2', sql.NVarChar(50), { nullable: true });
    table.columns.add('AddressLineType_2', sql.NVarChar(1), { nullable: true });
    table.columns.add('AddressLine3', sql.NVarChar(50), { nullable: true });
    table.columns.add('AddressLineType_3', sql.NVarChar(1), { nullable: true });
    table.columns.add('AddressLine4', sql.NVarChar(50), { nullable: true });
    table.columns.add('AddressLineType_4', sql.NVarChar(1), { nullable: true });
    table.columns.add('AddressLine5', sql.NVarChar(50), { nullable: true });
    table.columns.add('AddressLineType_5', sql.NVarChar(1), { nullable: true });
    table.columns.add('AddressLine6', sql.NVarChar(50), { nullable: true });
    table.columns.add('AddressLineType_6', sql.NVarChar(1), { nullable: true });
    table.columns.add('RecordUpdateDate', sql.Date, { nullable: true });
    table.columns.add('RecordUpdateTime', sql.DateTime, { nullable: true });
    table.columns.add('HistoryActionCodeId', sql.NVarChar(4), { nullable: true });
    table.columns.add('ResAddressSeqId', sql.Int, { nullable: true });
    table.columns.add('IntraPNRSetNbr', sql.Int, { nullable: true });

    values.forEach(value => {
      table.rows.add(
        value.ImportDate,
        value.BookingCode,
        value.CreateDate,
        value.FromDateTime,
        value.AddressLine1,
        value.AddressLineType_1,
        value.AddressLine2,
        value.AddressLineType_2,
        value.AddressLine3,
        value.AddressLineType_3,
        value.AddressLine4,
        value.AddressLineType_4,
        value.AddressLine5,
        value.AddressLineType_5,
        value.AddressLine6,
        value.AddressLineType_6,
        value.RecordUpdateDate,
        value.RecordUpdateTime,
        value.HistoryActionCodeId,
        value.ResAddressSeqId,
        value.IntraPNRSetNbr,
      );
    });

    const transaction = new sql.Transaction(pool);

    transaction.begin(errorTransaction => {
      if (errorTransaction) throw errorTransaction;

      let rollBack = false;

      transaction.on('rollback', () => {
        rollBack = true;
      });

      const request = new sql.Request(transaction);

      request
        .bulk(table)
        .then(() => {
          // console.log(result.rowsAffected);
          transaction.commit(errorCommit => {
            if (errorCommit) {
              throw errorCommit;
            }
          });
        })
        .catch(error => {
          if (!rollBack) {
            transaction.rollback();
          }
          throw error;
        });
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const importTktDocument = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  const lineReader = createInterface({
    input: createReadStream(filePath),
  });

  const values = [];
  lineReader.on('line', line => {
    const data = line.split('|').map(item => (item !== '' ? item.trim() : null));
    const tktDocument = new tbTktDocument();

    tktDocument.ImportDate = new Date(moment(fileDate).format(formatDateTime));
    tktDocument.BookingCode = data[1];
    tktDocument.CreateDate =
      data[2] !== null ? new Date(moment(data[2]).format(formatDate)) : null;
    tktDocument.PrimaryDocNbr = data[3];
    tktDocument.VCRCreateDate =
      data[4] !== null ? new Date(moment(data[4]).format(formatDate)) : null;
    tktDocument.TransactionDateTime =
      data[5] !== null ? new Date(moment(data[5]).format(formatDateTime)) : null;
    tktDocument.AirlineAccountingCode = data[6];
    tktDocument.EndDocNbr = data[7];
    tktDocument.VendorName = data[8];
    tktDocument.PointOfTktIssuance = data[9];
    tktDocument.ValidatingVendorCode = data[10];
    tktDocument.ValidatingVendorNbr = data[11];
    tktDocument.PNRPurgeDate =
      data[12] !== null ? new Date(moment(data[12]).format(formatDate)) : null;
    tktDocument.CRSPNRLocator = data[13];
    tktDocument.DocIssueDate =
      data[14] !== null ? new Date(moment(data[14]).format(formatDate)) : null;
    tktDocument.CustomerFullName = data[15];
    tktDocument.AgentCountryCode = data[16];
    tktDocument.IntlDocSaleCode = data[17];
    tktDocument.TourCode = data[18];
    tktDocument.AgentSine = data[19];
    tktDocument.OwningCityCode = data[20];
    tktDocument.AAACityCode = data[21];
    tktDocument.DocIssueAAAIATANbr = data[22];
    tktDocument.HomeCityCode = data[23];
    tktDocument.Restrictions = data[24];
    tktDocument.CurrConverRate = data[25];
    tktDocument.BankSellRate = data[26];
    tktDocument.BankBuyRate = data[27];
    tktDocument.IntlClearHouseRate = data[28];
    tktDocument.ExchgTktAmt = data[29];
    tktDocument.SettlementAuthCode = data[30];
    tktDocument.BaseFareCurrCode = data[31];
    tktDocument.BaseFareAmt = data[32];
    tktDocument.TotalFareCurrCode = data[33];
    tktDocument.TotalDocAmt = data[34];
    tktDocument.EquivBaseFareCurrCode = data[35];
    tktDocument.EquivBaseFareAmt = data[36];
    tktDocument.DataInd = data[37];
    tktDocument.FareCalc = data[38];
    tktDocument.FareCalcType = data[39];
    tktDocument.OriginalIssueDate =
      data[40] !== null ? new Date(moment(data[40]).format(formatDate)) : null;
    tktDocument.OriginalIssueCity = data[41];
    tktDocument.OriginalIATANbr = data[42];
    tktDocument.OriginalFOP = data[43];
    tktDocument.OriginalTktNbr = data[44];
    tktDocument.ExchgFOP = data[45];
    tktDocument.AddlExchgTktData = data[46];
    tktDocument.ExchgCoupon = data[47];
    tktDocument.AutoPriceCode = data[48];
    tktDocument.DocTypeCode = data[49];
    tktDocument.DocStatusCode = data[50];
    tktDocument.PassengerType = data[51];
    tktDocument.SourceSystemId = data[52];
    tktDocument.Unknow = data[53];
    tktDocument.Unknow1 = data[54];
    tktDocument.Unknow2 = data[55];
    tktDocument.Unknow3 = data[56];
    tktDocument.Unknow4 = data[57];
    tktDocument.Unknow5 = data[58];
    tktDocument.Unknow6 = data[59];
    tktDocument.Unknow7 = data[60];
    tktDocument.Unknow8 = data[61];
    tktDocument.Unknow9 = data[62];
    tktDocument.Unknow10 = data[63];
    tktDocument.Unknow11 = data[64];
    tktDocument.Unknow12 = data[65];
    tktDocument.Unknow13 = data[66];
    tktDocument.Unknow14 = data[67];
    tktDocument.Unknow15 = data[68];
    tktDocument.Unknow16 = data[69];
    tktDocument.Unknow17 = data[70];
    tktDocument.Unknow18 = data[71];
    tktDocument.Unknow19 = data[72];
    tktDocument.Unknow20 = data[73];
    tktDocument.Unknow21 = data[74];
    tktDocument.Unknow22 = data[75];
    tktDocument.Unknow23 = data[76];
    tktDocument.Unknow24 = data[77];
    tktDocument.Unknow25 = data[78];
    tktDocument.Unknow26 = data[79];
    tktDocument.Unknow27 = data[80];
    tktDocument.Unknow28 = data[81];
    tktDocument.Unknow29 = data[82];
    tktDocument.Unknow30 = data[83];
    tktDocument.Unknow31 = data[84];
    tktDocument.Unknow32 = data[85];
    tktDocument.Unknow33 = data[86];
    tktDocument.Unknow34 = data[87];
    tktDocument.Unknow35 = data[88];

    values.push(tktDocument);
  });

  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();

    const table = new sql.Table('tbTktDocument');
    table.create = true;
    table.columns.add('ImportDate', sql.DateTime, { nullable: true });
    table.columns.add('BookingCode', sql.NVarChar(6), { nullable: true });
    table.columns.add('CreateDate', sql.Date, { nullable: true });
    table.columns.add('PrimaryDocNbr', sql.NVarChar(13), { nullable: true });
    table.columns.add('VCRCreateDate', sql.Date, { nullable: true });
    table.columns.add('TransactionDateTime', sql.DateTime, { nullable: true });
    table.columns.add('AirlineAccountingCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('EndDocNbr', sql.NVarChar(13), { nullable: true });
    table.columns.add('VendorName', sql.NVarChar(30), { nullable: true });
    table.columns.add('PointOfTktIssuance', sql.NVarChar(5), { nullable: true });
    table.columns.add('ValidatingVendorCode', sql.NVarChar(2), { nullable: true });
    table.columns.add('ValidatingVendorNbr', sql.NVarChar(3), { nullable: true });
    table.columns.add('PNRPurgeDate', sql.Date, { nullable: true });
    table.columns.add('CRSPNRLocator', sql.NVarChar(8), { nullable: true });
    table.columns.add('DocIssueDate', sql.Date, { nullable: true });
    table.columns.add('CustomerFullName', sql.NVarChar(47), { nullable: true });
    table.columns.add('AgentCountryCode', sql.NVarChar(2), { nullable: true });
    table.columns.add('IntlDocSaleCode', sql.NVarChar(4), { nullable: true });
    table.columns.add('TourCode', sql.NVarChar(15), { nullable: true });
    table.columns.add('AgentSine', sql.NVarChar(3), { nullable: true });
    table.columns.add('OwningCityCode', sql.NVarChar(5), { nullable: true });
    table.columns.add('AAACityCode', sql.NVarChar(5), { nullable: true });
    table.columns.add('DocIssueAAAIATANbr', sql.NVarChar(8), { nullable: true });
    table.columns.add('HomeCityCode', sql.NVarChar(5), { nullable: true });
    table.columns.add('Restrictions', sql.NVarChar(147), { nullable: true });
    table.columns.add('CurrConverRate', sql.NVarChar(12), { nullable: true });
    table.columns.add('BankSellRate', sql.Int, { nullable: true });
    table.columns.add('BankBuyRate', sql.Int, { nullable: true });
    table.columns.add('IntlClearHouseRate', sql.Int, { nullable: true });
    table.columns.add('ExchgTktAmt', sql.Decimal(18, 4), { nullable: true });
    table.columns.add('SettlementAuthCode', sql.NVarChar(15), { nullable: true });
    table.columns.add('BaseFareCurrCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('BaseFareAmt', sql.Decimal(18, 4), { nullable: true });
    table.columns.add('TotalFareCurrCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('TotalDocAmt', sql.Decimal(18, 4), { nullable: true });
    table.columns.add('EquivBaseFareCurrCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('EquivBaseFareAmt', sql.Decimal(18, 4), { nullable: true });
    table.columns.add('DataInd', sql.NVarChar(1), { nullable: true });
    table.columns.add('FareCalc', sql.NVarChar(696), { nullable: true });
    table.columns.add('FareCalcType', sql.Int, { nullable: true });
    table.columns.add('OriginalIssueDate', sql.Date, { nullable: true });
    table.columns.add('OriginalIssueCity', sql.NVarChar(5), { nullable: true });
    table.columns.add('OriginalIATANbr', sql.Int, { nullable: true });
    table.columns.add('OriginalFOP', sql.NVarChar(28), { nullable: true });
    table.columns.add('OriginalTktNbr', sql.NVarChar(17), { nullable: true });
    table.columns.add('ExchgFOP', sql.NVarChar(28), { nullable: true });
    table.columns.add('AddlExchgTktData', sql.NVarChar(17), { nullable: true });
    table.columns.add('ExchgCoupon', sql.NVarChar(39), { nullable: true });
    table.columns.add('AutoPriceCode', sql.NVarChar(1), { nullable: true });
    table.columns.add('DocTypeCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('DocStatusCode', sql.NVarChar(1), { nullable: true });
    table.columns.add('PassengerType', sql.NVarChar(3), { nullable: true });
    table.columns.add('SourceSystemId', sql.NVarChar(2), { nullable: true });
    table.columns.add('Unknow', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow1', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow2', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow3', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow4', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow5', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow6', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow7', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow8', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow9', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow10', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow11', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow12', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow13', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow14', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow15', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow16', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow17', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow18', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow19', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow20', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow21', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow22', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow23', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow24', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow25', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow26', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow27', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow28', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow29', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow30', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow31', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow32', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow33', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow34', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow35', sql.NVarChar(50), { nullable: true });

    values.forEach(value => {
      table.rows.add(
        value.ImportDate,
        value.BookingCode,
        value.CreateDate,
        value.PrimaryDocNbr,
        value.VCRCreateDate,
        value.TransactionDateTime,
        value.AirlineAccountingCode,
        value.EndDocNbr,
        value.VendorName,
        value.PointOfTktIssuance,
        value.ValidatingVendorCode,
        value.ValidatingVendorNbr,
        value.PNRPurgeDate,
        value.CRSPNRLocator,
        value.DocIssueDate,
        value.CustomerFullName,
        value.AgentCountryCode,
        value.IntlDocSaleCode,
        value.TourCode,
        value.AgentSine,
        value.OwningCityCode,
        value.AAACityCode,
        value.DocIssueAAAIATANbr,
        value.HomeCityCode,
        value.Restrictions,
        value.CurrConverRate,
        value.BankSellRate,
        value.BankBuyRate,
        value.IntlClearHouseRate,
        value.ExchgTktAmt,
        value.SettlementAuthCode,
        value.BaseFareCurrCode,
        value.BaseFareAmt,
        value.TotalFareCurrCode,
        value.TotalDocAmt,
        value.EquivBaseFareCurrCode,
        value.EquivBaseFareAmt,
        value.DataInd,
        value.FareCalc,
        value.FareCalcType,
        value.OriginalIssueDate,
        value.OriginalIssueCity,
        value.OriginalIATANbr,
        value.OriginalFOP,
        value.OriginalTktNbr,
        value.ExchgFOP,
        value.AddlExchgTktData,
        value.ExchgCoupon,
        value.AutoPriceCode,
        value.DocTypeCode,
        value.DocStatusCode,
        value.PassengerType,
        value.SourceSystemId,
        value.Unknow,
        value.Unknow1,
        value.Unknow2,
        value.Unknow3,
        value.Unknow4,
        value.Unknow5,
        value.Unknow6,
        value.Unknow7,
        value.Unknow8,
        value.Unknow9,
        value.Unknow10,
        value.Unknow11,
        value.Unknow12,
        value.Unknow13,
        value.Unknow14,
        value.Unknow15,
        value.Unknow16,
        value.Unknow17,
        value.Unknow18,
        value.Unknow19,
        value.Unknow20,
        value.Unknow21,
        value.Unknow22,
        value.Unknow23,
        value.Unknow24,
        value.Unknow25,
        value.Unknow26,
        value.Unknow27,
        value.Unknow28,
        value.Unknow29,
        value.Unknow30,
        value.Unknow31,
        value.Unknow32,
        value.Unknow33,
        value.Unknow34,
        value.Unknow35,
      );
    });

    const transaction = new sql.Transaction(pool);

    transaction.begin(errorTransaction => {
      if (errorTransaction) throw errorTransaction;

      let rollBack = false;

      transaction.on('rollback', () => {
        rollBack = true;
      });

      const request = new sql.Request(transaction);

      request
        .bulk(table)
        .then(() => {
          // console.log(result.rowsAffected);
          transaction.commit(errorCommit => {
            if (errorCommit) {
              throw errorCommit;
            }
          });
        })
        .catch(error => {
          if (!rollBack) {
            transaction.rollback();
          }
          throw error;
        });
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const importTktCoupon = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  const lineReader = createInterface({
    input: createReadStream(filePath),
  });

  const values = [];
  lineReader.on('line', line => {
    const data = line.split('|').map(item => (item !== '' ? item.trim() : null));
    const tktCoupon = new tbTktCoupon();

    tktCoupon.ImportDate = new Date(moment(fileDate).format(formatDateTime));
    tktCoupon.BookingCode = data[1];
    tktCoupon.CreateDate =
      data[2] !== null ? new Date(moment(data[2]).format(formatDate)) : null;
    tktCoupon.PrimaryDocNbr = data[3];
    tktCoupon.VCRCreateDate =
      data[4] !== null ? new Date(moment(data[4]).format(formatDate)) : null;
    tktCoupon.TransactionDateTime =
      data[5] !== null ? new Date(moment(data[5]).format(formatDateTime)) : null;
    tktCoupon.CouponSeqNbr = data[6];
    tktCoupon.EntNbr = data[7];
    tktCoupon.CouponStatus = data[8];
    tktCoupon.PreviousCouponStatusCode = data[9];
    tktCoupon.SegmentTypeCode = data[10];
    tktCoupon.MarketingAirlineCode = data[11];
    tktCoupon.MarketingFlightNbr = data[12];
    tktCoupon.ServiceStartCity = data[13];
    tktCoupon.ServiceEndCity = data[14];
    tktCoupon.SeamentStatusCode = data[15];
    tktCoupon.ServiceStartDate =
      data[16] !== null ? new Date(moment(data[16]).format(formatDate)) : null;
    tktCoupon.ServiceStartTime =
      data[17] !== null
        ? new Date(
            moment(`${fileDate} ${data[17]}`)
              .add(1, 'd')
              .format(formatDateTime),
          )
        : null;
    tktCoupon.ServiceEndDate =
      data[18] !== null ? new Date(moment(data[18]).format(formatDate)) : null;
    tktCoupon.ServiceEndTime =
      data[19] !== null
        ? new Date(
            moment(`${fileDate} ${data[19]}`)
              .add(1, 'd')
              .format(formatDateTime),
          )
        : null;
    tktCoupon.ClassOfService = data[20];
    tktCoupon.FareBasisCode = data[21];
    tktCoupon.TktDesignatorCode = data[22];
    tktCoupon.FareBreakInd = data[23];
    tktCoupon.PriceNotValidBeforeDate =
      data[24] !== null ? new Date(moment(data[24]).format(formatDate)) : null;
    tktCoupon.PriceNotValidAfterDate =
      data[25] !== null ? new Date(moment(data[25]).format(formatDate)) : null;
    tktCoupon.InvoluntaryInd = data[26];
    tktCoupon.FlownFlightNbr = data[27];
    tktCoupon.FlownServiceStartDate =
      data[28] !== null ? new Date(moment(data[28]).format(formatDate)) : null;
    tktCoupon.FlownServiceStartCity = data[29];
    tktCoupon.FlownServiceEndCity = data[30];
    tktCoupon.FlownClassOfService = data[31];
    tktCoupon.FlownFlightOrigDate =
      data[32] !== null ? new Date(moment(data[32]).format(formatDate)) : null;
    tktCoupon.OperatingAirlineCode = data[33];
    tktCoupon.OperatingFlightNbr = data[34];
    tktCoupon.OperatingPNRLocator = data[35];
    tktCoupon.FareBreakAmt = data[36];
    tktCoupon.FareBreakDiscAmt = data[37];
    tktCoupon.DiscountAmtInd = data[38];
    tktCoupon.DiscountPctInd = data[39];
    tktCoupon.StopoverCode = data[40];
    tktCoupon.FrequentTravelerNbr = data[41];
    tktCoupon.Unknow = data[42];
    tktCoupon.Unknow1 = data[43];
    tktCoupon.Unknow2 = data[44];
    tktCoupon.Unknow3 = data[45];

    values.push(tktCoupon);
  });

  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();

    const table = new sql.Table('tbTktCoupon');
    table.create = true;
    table.columns.add('ImportDate', sql.DateTime, { nullable: true });
    table.columns.add('BookingCode', sql.NVarChar(6), { nullable: true });
    table.columns.add('CreateDate', sql.Date, { nullable: true });
    table.columns.add('PrimaryDocNbr', sql.NVarChar(13), { nullable: true });
    table.columns.add('VCRCreateDate', sql.Date, { nullable: true });
    table.columns.add('TransactionDateTime', sql.DateTime, { nullable: true });
    table.columns.add('CouponSeqNbr', sql.Int, { nullable: true });
    table.columns.add('EntNbr', sql.Int, { nullable: true });
    table.columns.add('CouponStatus', sql.NVarChar(4), { nullable: true });
    table.columns.add('PreviousCouponStatusCode', sql.NVarChar(4), { nullable: true });
    table.columns.add('SegmentTypeCode', sql.NVarChar(2), { nullable: true });
    table.columns.add('MarketingAirlineCode', sql.NVarChar(2), { nullable: true });
    table.columns.add('MarketingFlightNbr', sql.NVarChar(5), { nullable: true });
    table.columns.add('ServiceStartCity', sql.NVarChar(3), { nullable: true });
    table.columns.add('ServiceEndCity', sql.NVarChar(3), { nullable: true });
    table.columns.add('SeamentStatusCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('ServiceStartDate', sql.Date, { nullable: true });
    table.columns.add('ServiceStartTime', sql.DateTime, { nullable: true });
    table.columns.add('ServiceEndDate', sql.Date, { nullable: true });
    table.columns.add('ServiceEndTime', sql.DateTime, { nullable: true });
    table.columns.add('ClassOfService', sql.NVarChar(2), { nullable: true });
    table.columns.add('FareBasisCode', sql.NVarChar(15), { nullable: true });
    table.columns.add('TktDesignatorCode', sql.NVarChar(15), { nullable: true });
    table.columns.add('FareBreakInd', sql.NVarChar(1), { nullable: true });
    table.columns.add('PriceNotValidBeforeDate', sql.Date, { nullable: true });
    table.columns.add('PriceNotValidAfterDate', sql.Date, { nullable: true });
    table.columns.add('InvoluntaryInd', sql.NVarChar(1), { nullable: true });
    table.columns.add('FlownFlightNbr', sql.NVarChar(5), { nullable: true });
    table.columns.add('FlownServiceStartDate', sql.Date, { nullable: true });
    table.columns.add('FlownServiceStartCity', sql.NVarChar(5), { nullable: true });
    table.columns.add('FlownServiceEndCity', sql.NVarChar(5), { nullable: true });
    table.columns.add('FlownClassOfService', sql.NVarChar(3), { nullable: true });
    table.columns.add('FlownFlightOrigDate', sql.Date, { nullable: true });
    table.columns.add('OperatingAirlineCode', sql.NVarChar(2), { nullable: true });
    table.columns.add('OperatingFlightNbr', sql.NVarChar(5), { nullable: true });
    table.columns.add('OperatingPNRLocator', sql.NVarChar(8), { nullable: true });
    table.columns.add('FareBreakAmt', sql.Decimal(18, 4), { nullable: true });
    table.columns.add('FareBreakDiscAmt', sql.Decimal(18, 4), { nullable: true });
    table.columns.add('DiscountAmtInd', sql.NVarChar(1), { nullable: true });
    table.columns.add('DiscountPctInd', sql.NVarChar(1), { nullable: true });
    table.columns.add('StopoverCode', sql.NVarChar(1), { nullable: true });
    table.columns.add('FrequentTravelerNbr', sql.NVarChar(25), { nullable: true });
    table.columns.add('Unknow', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow1', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow2', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow3', sql.NVarChar(50), { nullable: true });

    values.forEach(value => {
      table.rows.add(
        value.ImportDate,
        value.BookingCode,
        value.CreateDate,
        value.PrimaryDocNbr,
        value.VCRCreateDate,
        value.TransactionDateTime,
        value.CouponSeqNbr,
        value.EntNbr,
        value.CouponStatus,
        value.PreviousCouponStatusCode,
        value.SegmentTypeCode,
        value.MarketingAirlineCode,
        value.MarketingFlightNbr,
        value.ServiceStartCity,
        value.ServiceEndCity,
        value.SeamentStatusCode,
        value.ServiceStartDate,
        value.ServiceStartTime,
        value.ServiceEndDate,
        value.ServiceEndTime,
        value.ClassOfService,
        value.FareBasisCode,
        value.TktDesignatorCode,
        value.FareBreakInd,
        value.PriceNotValidBeforeDate,
        value.PriceNotValidAfterDate,
        value.InvoluntaryInd,
        value.FlownFlightNbr,
        value.FlownServiceStartDate,
        value.FlownServiceStartCity,
        value.FlownServiceEndCity,
        value.FlownClassOfService,
        value.FlownFlightOrigDate,
        value.OperatingAirlineCode,
        value.OperatingFlightNbr,
        value.OperatingPNRLocator,
        value.FareBreakAmt,
        value.FareBreakDiscAmt,
        value.DiscountAmtInd,
        value.DiscountPctInd,
        value.StopoverCode,
        value.FrequentTravelerNbr,
        value.Unknow,
        value.Unknow1,
        value.Unknow2,
        value.Unknow3,
      );
    });

    const transaction = new sql.Transaction(pool);

    transaction.begin(errorTransaction => {
      if (errorTransaction) throw errorTransaction;

      let rollBack = false;

      transaction.on('rollback', () => {
        rollBack = true;
      });

      const request = new sql.Request(transaction);

      request
        .bulk(table)
        .then(() => {
          // console.log(result.rowsAffected);
          transaction.commit(errorCommit => {
            if (errorCommit) {
              throw errorCommit;
            }
          });
        })
        .catch(error => {
          if (!rollBack) {
            transaction.rollback();
          }
          throw error;
        });
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const importTktTax = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  const lineReader = createInterface({
    input: createReadStream(filePath),
  });

  const values = [];
  lineReader.on('line', line => {
    const data = line.split('|').map(item => (item !== '' ? item.trim() : null));
    const tktTax = new tbTktTax();

    tktTax.ImportDate = new Date(moment(fileDate).format(formatDateTime));
    tktTax.BookingCode = data[1];
    tktTax.CreateDate =
      data[2] !== null ? new Date(moment(data[2]).format(formatDate)) : null;
    tktTax.PrimaryDocNbr = data[3];
    tktTax.VCRCreateDate =
      data[4] !== null ? new Date(moment(data[4]).format(formatDate)) : null;
    tktTax.TransactionDateTime =
      data[5] !== null ? new Date(moment(data[5]).format(formatDateTime)) : null;
    tktTax.TaxSeqNbr = data[6];
    tktTax.TaxAmt = data[7];
    tktTax.TaxCode = data[8];
    tktTax.TaxPaidIndicator = data[9];
    tktTax.Unknow = data[10];
    tktTax.CurCode = data[11];

    values.push(tktTax);
  });

  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();

    const table = new sql.Table('tbTktTax');
    table.create = true;
    table.columns.add('ImportDate', sql.DateTime, { nullable: true });
    table.columns.add('BookingCode', sql.NVarChar(6), { nullable: true });
    table.columns.add('CreateDate', sql.Date, { nullable: true });
    table.columns.add('PrimaryDocNbr', sql.NVarChar(13), { nullable: true });
    table.columns.add('VCRCreateDate', sql.Date, { nullable: true });
    table.columns.add('TransactionDateTime', sql.DateTime, { nullable: true });
    table.columns.add('TaxSeqNbr', sql.Int, { nullable: true });
    table.columns.add('TaxAmt', sql.Decimal(18, 4), { nullable: true });
    table.columns.add('TaxCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('TaxPaidIndicator', sql.NVarChar(1), { nullable: true });
    table.columns.add('Unknow', sql.NVarChar(3), { nullable: true });
    table.columns.add('CurCode', sql.NVarChar(3), { nullable: true });

    values.forEach(value => {
      table.rows.add(
        value.ImportDate,
        value.BookingCode,
        value.CreateDate,
        value.PrimaryDocNbr,
        value.VCRCreateDate,
        value.TransactionDateTime,
        value.TaxSeqNbr,
        value.TaxAmt,
        value.TaxCode,
        value.TaxPaidIndicator,
        value.Unknow,
        value.CurCode,
      );
    });

    const transaction = new sql.Transaction(pool);

    transaction.begin(errorTransaction => {
      if (errorTransaction) throw errorTransaction;

      let rollBack = false;

      transaction.on('rollback', () => {
        rollBack = true;
      });

      const request = new sql.Request(transaction);

      request
        .bulk(table)
        .then(() => {
          // console.log(result.rowsAffected);
          transaction.commit(errorCommit => {
            if (errorCommit) {
              throw errorCommit;
            }
          });
        })
        .catch(error => {
          if (!rollBack) {
            transaction.rollback();
          }
          throw error;
        });
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const importTktTaxDetail = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  const lineReader = createInterface({
    input: createReadStream(filePath),
  });

  const values = [];
  lineReader.on('line', line => {
    const data = line.split('|').map(item => (item !== '' ? item.trim() : null));
    const tktTaxDetail = new tbTktTaxDetail();

    tktTaxDetail.ImportDate = new Date(moment(fileDate).format(formatDateTime));
    tktTaxDetail.BookingCode = data[1];
    tktTaxDetail.CreateDate =
      data[2] !== null ? new Date(moment(data[2]).format(formatDate)) : null;
    tktTaxDetail.PrimaryDocNbr = data[3];
    tktTaxDetail.VCRCreateDate =
      data[4] !== null ? new Date(moment(data[4]).format(formatDate)) : null;
    tktTaxDetail.TransactionDateTime =
      data[5] !== null ? new Date(moment(data[5]).format(formatDateTime)) : null;
    tktTaxDetail.TaxSeqNbr = data[6];
    tktTaxDetail.TaxAmt = data[7];
    tktTaxDetail.TaxCode = data[8];
    tktTaxDetail.LocationTypeCode = data[9];
    tktTaxDetail.ServiceCityCode = data[10];

    values.push(tktTaxDetail);
  });

  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();

    const table = new sql.Table('tbTktTaxDetail');
    table.create = true;
    table.columns.add('ImportDate', sql.DateTime, { nullable: true });
    table.columns.add('BookingCode', sql.NVarChar(6), { nullable: true });
    table.columns.add('CreateDate', sql.Date, { nullable: true });
    table.columns.add('PrimaryDocNbr', sql.NVarChar(13), { nullable: true });
    table.columns.add('VCRCreateDate', sql.Date, { nullable: true });
    table.columns.add('TransactionDateTime', sql.DateTime, { nullable: true });
    table.columns.add('TaxSeqNbr', sql.Int, { nullable: true });
    table.columns.add('TaxAmt', sql.Decimal(18, 4), { nullable: true });
    table.columns.add('TaxCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('LocationTypeCode', sql.Int, { nullable: true });
    table.columns.add('ServiceCityCode', sql.NVarChar(3), { nullable: true });

    values.forEach(value => {
      table.rows.add(
        value.ImportDate,
        value.BookingCode,
        value.CreateDate,
        value.PrimaryDocNbr,
        value.VCRCreateDate,
        value.TransactionDateTime,
        value.TaxSeqNbr,
        value.TaxAmt,
        value.TaxCode,
        value.LocationTypeCode,
        value.ServiceCityCode,
      );
    });

    const transaction = new sql.Transaction(pool);

    transaction.begin(errorTransaction => {
      if (errorTransaction) throw errorTransaction;

      let rollBack = false;

      transaction.on('rollback', () => {
        rollBack = true;
      });

      const request = new sql.Request(transaction);

      request
        .bulk(table)
        .then(() => {
          // console.log(result.rowsAffected);
          transaction.commit(errorCommit => {
            if (errorCommit) {
              throw errorCommit;
            }
          });
        })
        .catch(error => {
          if (!rollBack) {
            transaction.rollback();
          }
          throw error;
        });
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const importTktPayment = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  const lineReader = createInterface({
    input: createReadStream(filePath),
  });

  const values = [];
  lineReader.on('line', line => {
    const data = line.split('|').map(item => (item !== '' ? item.trim() : null));
    const tktPayment = new tbTktPayment();

    tktPayment.ImportDate = new Date(moment(fileDate).format(formatDateTime));
    tktPayment.BookingCode = data[1];
    tktPayment.CreateDate =
      data[2] !== null ? new Date(moment(data[2]).format(formatDate)) : null;
    tktPayment.PrimaryDocNbr = data[3];
    tktPayment.VCRCreateDate =
      data[4] !== null ? new Date(moment(data[4]).format(formatDate)) : null;
    tktPayment.TransactionDateTime =
      data[5] !== null ? new Date(moment(data[5]).format(formatDateTime)) : null;
    tktPayment.PaymentSeqNbr = data[6];
    tktPayment.FOPCode = data[7];
    tktPayment.PaymentAmt = data[8];
    tktPayment.PaymentVendorCode = data[9];
    tktPayment.AcctNbr = data[10];
    tktPayment.PaymentCurrCode = data[11];
    tktPayment.Unknow = data[12];
    tktPayment.Unknow1 = data[13];
    tktPayment.Unknow2 = data[14];

    values.push(tktPayment);
  });

  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();

    const table = new sql.Table('tbTktPayment');
    table.create = true;
    table.columns.add('ImportDate', sql.DateTime, { nullable: true });
    table.columns.add('BookingCode', sql.NVarChar(6), { nullable: true });
    table.columns.add('CreateDate', sql.Date, { nullable: true });
    table.columns.add('PrimaryDocNbr', sql.NVarChar(13), { nullable: true });
    table.columns.add('VCRCreateDate', sql.Date, { nullable: true });
    table.columns.add('TransactionDateTime', sql.DateTime, { nullable: true });
    table.columns.add('PaymentSeqNbr', sql.Int, { nullable: true });
    table.columns.add('FOPCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('PaymentAmt', sql.Decimal(18, 4), { nullable: true });
    table.columns.add('PaymentVendorCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('AcctNbr', sql.NVarChar(19), { nullable: true });
    table.columns.add('PaymentCurrCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('Unknow', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow1', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow2', sql.NVarChar(50), { nullable: true });

    values.forEach(value => {
      table.rows.add(
        value.ImportDate,
        value.BookingCode,
        value.CreateDate,
        value.PrimaryDocNbr,
        value.VCRCreateDate,
        value.TransactionDateTime,
        value.PaymentSeqNbr,
        value.FOPCode,
        value.PaymentAmt,
        value.PaymentVendorCode,
        value.AcctNbr,
        value.PaymentCurrCode,
        value.Unknow,
        value.Unknow1,
        value.Unknow2,
      );
    });

    const transaction = new sql.Transaction(pool);

    transaction.begin(errorTransaction => {
      if (errorTransaction) throw errorTransaction;

      let rollBack = false;

      transaction.on('rollback', () => {
        rollBack = true;
      });

      const request = new sql.Request(transaction);

      request
        .bulk(table)
        .then(() => {
          // console.log(result.rowsAffected);
          transaction.commit(errorCommit => {
            if (errorCommit) {
              throw errorCommit;
            }
          });
        })
        .catch(error => {
          if (!rollBack) {
            transaction.rollback();
          }
          throw error;
        });
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const importTktRemark = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  const lineReader = createInterface({
    input: createReadStream(filePath),
  });

  const values = [];
  lineReader.on('line', line => {
    const data = line.split('|').map(item => (item !== '' ? item.trim() : null));
    const tktRemark = new tbTktRemark();

    tktRemark.ImportDate = new Date(moment(fileDate).format(formatDateTime));
    tktRemark.BookingCode = data[1];
    tktRemark.CreateDate =
      data[2] !== null ? new Date(moment(data[2]).format(formatDate)) : null;
    tktRemark.PrimaryDocNbr = data[3];
    tktRemark.VCRCreateDate =
      data[4] !== null ? new Date(moment(data[4]).format(formatDate)) : null;
    tktRemark.TransactionDateTime =
      data[5] !== null ? new Date(moment(data[5]).format(formatDateTime)) : null;
    tktRemark.RemarkSeqNbr = data[6];
    tktRemark.RemarkTxt = data[7];

    values.push(tktRemark);
  });

  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();

    const table = new sql.Table('tbTktRemark');
    table.create = true;
    table.columns.add('ImportDate', sql.DateTime, { nullable: true });
    table.columns.add('BookingCode', sql.NVarChar(6), { nullable: true });
    table.columns.add('CreateDate', sql.Date, { nullable: true });
    table.columns.add('PrimaryDocNbr', sql.NVarChar(13), { nullable: true });
    table.columns.add('VCRCreateDate', sql.Date, { nullable: true });
    table.columns.add('TransactionDateTime', sql.DateTime, { nullable: true });
    table.columns.add('RemarkSeqNbr', sql.Int, { nullable: true });
    table.columns.add('RemarkTxt', sql.NVarChar(86), { nullable: true });

    values.forEach(value => {
      table.rows.add(
        value.ImportDate,
        value.BookingCode,
        value.CreateDate,
        value.PrimaryDocNbr,
        value.VCRCreateDate,
        value.TransactionDateTime,
        value.RemarkSeqNbr,
        value.RemarkTxt,
      );
    });

    const transaction = new sql.Transaction(pool);

    transaction.begin(errorTransaction => {
      if (errorTransaction) throw errorTransaction;

      let rollBack = false;

      transaction.on('rollback', () => {
        rollBack = true;
      });

      const request = new sql.Request(transaction);

      request
        .bulk(table)
        .then(() => {
          // console.log(result.rowsAffected);
          transaction.commit(errorCommit => {
            if (errorCommit) {
              throw errorCommit;
            }
          });
        })
        .catch(error => {
          if (!rollBack) {
            transaction.rollback();
          }
          throw error;
        });
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const importTktAddress = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  const lineReader = createInterface({
    input: createReadStream(filePath),
  });

  const values = [];
  lineReader.on('line', line => {
    const data = line.split('|').map(item => (item !== '' ? item.trim() : null));
    const tktAddress = new tbTktAddress();

    tktAddress.ImportDate = new Date(moment(fileDate).format(formatDateTime));
    tktAddress.BookingCode = data[1];
    tktAddress.CreateDate =
      data[2] !== null ? new Date(moment(data[2]).format(formatDate)) : null;
    tktAddress.PrimaryDocNbr = data[3];
    tktAddress.VCRCreateDate =
      data[4] !== null ? new Date(moment(data[4]).format(formatDate)) : null;
    tktAddress.TransactionDateTime =
      data[5] !== null ? new Date(moment(data[5]).format(formatDateTime)) : null;
    tktAddress.AddrSeqNbr = data[6];
    tktAddress.AddrTxt = data[7];

    values.push(tktAddress);
  });

  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();

    const table = new sql.Table('tbTktAddress');
    table.create = true;
    table.columns.add('ImportDate', sql.DateTime, { nullable: true });
    table.columns.add('BookingCode', sql.NVarChar(6), { nullable: true });
    table.columns.add('CreateDate', sql.Date, { nullable: true });
    table.columns.add('PrimaryDocNbr', sql.NVarChar(13), { nullable: true });
    table.columns.add('VCRCreateDate', sql.Date, { nullable: true });
    table.columns.add('TransactionDateTime', sql.DateTime, { nullable: true });
    table.columns.add('AddrSeqNbr', sql.Int, { nullable: true });
    table.columns.add('AddrTxt', sql.NVarChar(37), { nullable: true });

    values.forEach(value => {
      table.rows.add(
        value.ImportDate,
        value.BookingCode,
        value.CreateDate,
        value.PrimaryDocNbr,
        value.VCRCreateDate,
        value.TransactionDateTime,
        value.AddrSeqNbr,
        value.AddrTxt,
      );
    });

    const transaction = new sql.Transaction(pool);

    transaction.begin(errorTransaction => {
      if (errorTransaction) throw errorTransaction;

      let rollBack = false;

      transaction.on('rollback', () => {
        rollBack = true;
      });

      const request = new sql.Request(transaction);

      request
        .bulk(table)
        .then(() => {
          // console.log(result.rowsAffected);
          transaction.commit(errorCommit => {
            if (errorCommit) {
              throw errorCommit;
            }
          });
        })
        .catch(error => {
          if (!rollBack) {
            transaction.rollback();
          }
          throw error;
        });
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const importTktDocumentHistory = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  const lineReader = createInterface({
    input: createReadStream(filePath),
  });

  const values = [];
  lineReader.on('line', line => {
    const data = line.split('|').map(item => (item !== '' ? item.trim() : null));
    const tktDocumentHistory = new tbTktDocumentHistory();

    tktDocumentHistory.ImportDate = new Date(moment(fileDate).format(formatDateTime));
    tktDocumentHistory.BookingCode = data[1];
    tktDocumentHistory.CreateDate =
      data[2] !== null ? new Date(moment(data[2]).format(formatDate)) : null;
    tktDocumentHistory.PrimaryDocNbr = data[3];
    tktDocumentHistory.VCRCreateDate =
      data[4] !== null ? new Date(moment(data[4]).format(formatDate)) : null;
    tktDocumentHistory.TransactionDateTime =
      data[5] !== null ? new Date(moment(data[5]).format(formatDateTime)) : null;
    tktDocumentHistory.HistorySeqNbr = data[6];
    tktDocumentHistory.HistorvCd = data[7];
    tktDocumentHistory.AAACityCode = data[8];
    tktDocumentHistory.HomeCityCode = data[9];
    tktDocumentHistory.AgentDutyCode = data[10];
    tktDocumentHistory.AgentSine = data[11];
    tktDocumentHistory.LastUpdate =
      data[12] !== null ? new Date(moment(data[12]).format(formatDate)) : null;
    tktDocumentHistory.LastUpdateSysTime =
      data[13] !== null
        ? new Date(
            moment(`${fileDate} ${data[13]}`)
              .add(1, 'd')
              .format(formatDateTime),
          )
        : null;
    tktDocumentHistory.PreviousPNRLocatorId = data[14];
    tktDocumentHistory.CPNBitMap = data[15];
    tktDocumentHistory.NewPNRLocatorID = data[16];
    tktDocumentHistory.AirlineAccountingCode = data[17];
    tktDocumentHistory.DocNbr = data[18];
    tktDocumentHistory.UpdateCRSCode = data[19];
    tktDocumentHistory.UpdateAirlineCode = data[20];
    tktDocumentHistory.PurgeDueToAging = data[21];
    tktDocumentHistory.PurgeRequestByTCN = data[22];
    tktDocumentHistory.Day7Purge = data[23];
    tktDocumentHistory.InputMsg = data[24];
    tktDocumentHistory.RemarkTxt = data[25];
    tktDocumentHistory.Unknow = data[26];
    tktDocumentHistory.Unknow1 = data[27];
    tktDocumentHistory.Unknow2 = data[28];
    tktDocumentHistory.Unknow3 = data[29];

    values.push(tktDocumentHistory);
  });

  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();

    const table = new sql.Table('tbTktDocumentHistory');
    table.create = true;
    table.columns.add('ImportDate', sql.DateTime, { nullable: true });
    table.columns.add('BookingCode', sql.NVarChar(6), { nullable: true });
    table.columns.add('CreateDate', sql.Date, { nullable: true });
    table.columns.add('PrimaryDocNbr', sql.NVarChar(13), { nullable: true });
    table.columns.add('VCRCreateDate', sql.Date, { nullable: true });
    table.columns.add('TransactionDateTime', sql.DateTime, { nullable: true });
    table.columns.add('HistorySeqNbr', sql.Int, { nullable: true });
    table.columns.add('HistorvCd', sql.NVarChar(5), { nullable: true });
    table.columns.add('AAACityCode', sql.NVarChar(5), { nullable: true });
    table.columns.add('HomeCityCode', sql.NVarChar(5), { nullable: true });
    table.columns.add('AgentDutyCode', sql.NVarChar(1), { nullable: true });
    table.columns.add('AgentSine', sql.NVarChar(3), { nullable: true });
    table.columns.add('LastUpdate', sql.Date, { nullable: true });
    table.columns.add('LastUpdateSysTime', sql.DateTime, { nullable: true });
    table.columns.add('PreviousPNRLocatorId', sql.NVarChar(8), { nullable: true });
    table.columns.add('CPNBitMap', sql.NVarChar(50), { nullable: true });
    table.columns.add('NewPNRLocatorID', sql.NVarChar(8), { nullable: true });
    table.columns.add('AirlineAccountingCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('DocNbr', sql.NVarChar(13), { nullable: true });
    table.columns.add('UpdateCRSCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('UpdateAirlineCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('PurgeDueToAging', sql.Int, { nullable: true });
    table.columns.add('PurgeRequestByTCN', sql.Int, { nullable: true });
    table.columns.add('Day7Purge', sql.Int, { nullable: true });
    table.columns.add('InputMsg', sql.NVarChar(300), { nullable: true });
    table.columns.add('RemarkTxt', sql.NVarChar(86), { nullable: true });
    table.columns.add('Unknow', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow1', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow2', sql.NVarChar(50), { nullable: true });
    table.columns.add('Unknow3', sql.NVarChar(50), { nullable: true });

    values.forEach(value => {
      table.rows.add(
        value.ImportDate,
        value.BookingCode,
        value.CreateDate,
        value.PrimaryDocNbr,
        value.VCRCreateDate,
        value.TransactionDateTime,
        value.HistorySeqNbr,
        value.HistorvCd,
        value.AAACityCode,
        value.HomeCityCode,
        value.AgentDutyCode,
        value.AgentSine,
        value.LastUpdate,
        value.LastUpdateSysTime,
        value.PreviousPNRLocatorId,
        value.CPNBitMap,
        value.NewPNRLocatorID,
        value.AirlineAccountingCode,
        value.DocNbr,
        value.UpdateCRSCode,
        value.UpdateAirlineCode,
        value.PurgeDueToAging,
        value.PurgeRequestByTCN,
        value.Day7Purge,
        value.InputMsg,
        value.RemarkTxt,
        value.Unknow,
        value.Unknow1,
        value.Unknow2,
        value.Unknow3,
      );
    });

    const transaction = new sql.Transaction(pool);

    transaction.begin(errorTransaction => {
      if (errorTransaction) throw errorTransaction;

      let rollBack = false;

      transaction.on('rollback', () => {
        rollBack = true;
      });

      const request = new sql.Request(transaction);

      request
        .bulk(table)
        .then(() => {
          // console.log(result.rowsAffected);
          transaction.commit(errorCommit => {
            if (errorCommit) {
              throw errorCommit;
            }
          });
        })
        .catch(error => {
          if (!rollBack) {
            transaction.rollback();
          }
          throw error;
        });
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const importTktCouponHistory = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  const lineReader = createInterface({
    input: createReadStream(filePath),
  });

  const values = [];
  lineReader.on('line', line => {
    const data = line.split('|').map(item => (item !== '' ? item.trim() : null));
    const tktCouponHistory = new tbTktCouponHistory();

    tktCouponHistory.ImportDate = new Date(moment(fileDate).format(formatDateTime));
    tktCouponHistory.BookingCode = data[1];
    tktCouponHistory.CreateDate =
      data[2] !== null ? new Date(moment(data[2]).format(formatDate)) : null;
    tktCouponHistory.PrimaryDocNbr = data[3];
    tktCouponHistory.VCRCreateDate =
      data[4] !== null ? new Date(moment(data[4]).format(formatDate)) : null;
    tktCouponHistory.TransactionDateTime =
      data[5] !== null ? new Date(moment(data[5]).format(formatDateTime)) : null;
    tktCouponHistory.CouponSeqNbr = data[6];
    tktCouponHistory.FareBasisCode = data[7];
    tktCouponHistory.CouponNbr = data[8];
    tktCouponHistory.PreviousCouponStatusCode = data[9];
    tktCouponHistory.NewCouponStatusCode = data[10];
    tktCouponHistory.CouponNbrChanged = data[11];
    tktCouponHistory.PreviousControlVendorCode = data[12];
    tktCouponHistory.NewControlVendorCode = data[13];
    tktCouponHistory.RevalMarketingAirlineCode = data[14];
    tktCouponHistory.RevalClassofService = data[15];
    tktCouponHistory.RevalMarketingFlightNbr = data[16];
    tktCouponHistory.RevalServiceStartDate =
      data[17] !== null ? new Date(moment(data[17]).format(formatDate)) : null;
    tktCouponHistory.RevalServiceStartCity = data[18];
    tktCouponHistory.RevalServiceEndCity = data[19];
    tktCouponHistory.RevalServiceStartTime =
      data[20] !== null
        ? new Date(
            moment(`${fileDate} ${data[20]}`)
              .add(1, 'd')
              .format(formatDateTime),
          )
        : null;
    tktCouponHistory.RevalServiceEndTime =
      data[21] !== null
        ? new Date(
            moment(`${fileDate} ${data[21]}`)
              .add(1, 'd')
              .format(formatDateTime),
          )
        : null;
    tktCouponHistory.RevalSegmentStatusCode = data[22];
    tktCouponHistory.Unknow =
      data[23] !== null ? new Date(moment(data[23]).format(formatDate)) : null;
    tktCouponHistory.Unknow1 =
      data[24] !== null
        ? new Date(
            moment(`${fileDate} ${data[24]}`)
              .add(1, 'd')
              .format(formatDateTime),
          )
        : null;
    tktCouponHistory.Unknow2 = data[25];

    values.push(tktCouponHistory);
  });

  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();

    const table = new sql.Table('tbTktCouponHistory');
    table.create = true;
    table.columns.add('ImportDate', sql.DateTime, { nullable: true });
    table.columns.add('BookingCode', sql.NVarChar(6), { nullable: true });
    table.columns.add('CreateDate', sql.Date, { nullable: true });
    table.columns.add('PrimaryDocNbr', sql.NVarChar(13), { nullable: true });
    table.columns.add('VCRCreateDate', sql.Date, { nullable: true });
    table.columns.add('TransactionDateTime', sql.DateTime, { nullable: true });
    table.columns.add('CouponSeqNbr', sql.Int, { nullable: true });
    table.columns.add('FareBasisCode', sql.NVarChar(15), { nullable: true });
    table.columns.add('CouponNbr', sql.Int, { nullable: true });
    table.columns.add('PreviousCouponStatusCode', sql.NVarChar(5), { nullable: true });
    table.columns.add('NewCouponStatusCode', sql.NVarChar(5), { nullable: true });
    table.columns.add('CouponNbrChanged', sql.Int, { nullable: true });
    table.columns.add('PreviousControlVendorCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('NewControlVendorCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('RevalMarketingAirlineCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('RevalClassofService', sql.NVarChar(2), { nullable: true });
    table.columns.add('RevalMarketingFlightNbr', sql.NVarChar(5), { nullable: true });
    table.columns.add('RevalServiceStartDate', sql.Date, { nullable: true });
    table.columns.add('RevalServiceStartCity', sql.NVarChar(3), { nullable: true });
    table.columns.add('RevalServiceEndCity', sql.NVarChar(3), { nullable: true });
    table.columns.add('RevalServiceStartTime', sql.DateTime, { nullable: true });
    table.columns.add('RevalServiceEndTime', sql.DateTime, { nullable: true });
    table.columns.add('RevalSegmentStatusCode', sql.NVarChar(2), { nullable: true });
    table.columns.add('Unknow', sql.Date, { nullable: true });
    table.columns.add('Unknow1', sql.DateTime, { nullable: true });
    table.columns.add('Unknow2', sql.Int, { nullable: true });

    values.forEach(value => {
      table.rows.add(
        value.ImportDate,
        value.BookingCode,
        value.CreateDate,
        value.PrimaryDocNbr,
        value.VCRCreateDate,
        value.TransactionDateTime,
        value.CouponSeqNbr,
        value.FareBasisCode,
        value.CouponNbr,
        value.PreviousCouponStatusCode,
        value.NewCouponStatusCode,
        value.CouponNbrChanged,
        value.PreviousControlVendorCode,
        value.NewControlVendorCode,
        value.RevalMarketingAirlineCode,
        value.RevalClassofService,
        value.RevalMarketingFlightNbr,
        value.RevalServiceStartDate,
        value.RevalServiceStartCity,
        value.RevalServiceEndCity,
        value.RevalServiceStartTime,
        value.RevalServiceEndTime,
        value.RevalSegmentStatusCode,
        value.Unknow,
        value.Unknow1,
        value.Unknow2,
      );
    });

    const transaction = new sql.Transaction(pool);

    transaction.begin(errorTransaction => {
      if (errorTransaction) throw errorTransaction;

      let rollBack = false;

      transaction.on('rollback', () => {
        rollBack = true;
      });

      const request = new sql.Request(transaction);

      request
        .bulk(table)
        .then(() => {
          // console.log(result.rowsAffected);
          transaction.commit(errorCommit => {
            if (errorCommit) {
              throw errorCommit;
            }
          });
        })
        .catch(error => {
          if (!rollBack) {
            transaction.rollback();
          }
          throw error;
        });
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const importTktEndorsement = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  const lineReader = createInterface({
    input: createReadStream(filePath),
  });

  const values = [];
  lineReader.on('line', line => {
    const data = line.split('|').map(item => (item !== '' ? item.trim() : null));
    const tktEndorsement = new tbTktEndorsement();

    tktEndorsement.ImportDate = new Date(moment(fileDate).format(formatDateTime));
    tktEndorsement.BookingCode = data[1];
    tktEndorsement.CreateDate =
      data[2] !== null ? new Date(moment(data[2]).format(formatDate)) : null;
    tktEndorsement.PrimaryDocNbr = data[3];
    tktEndorsement.VCRCreateDate =
      data[4] !== null ? new Date(moment(data[4]).format(formatDate)) : null;
    tktEndorsement.TransactionDateTime =
      data[5] !== null ? new Date(moment(data[5]).format(formatDateTime)) : null;
    tktEndorsement.EndSeqNbr = data[6];
    tktEndorsement.Endorsements = data[7];

    values.push(tktEndorsement);
  });

  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();

    const table = new sql.Table('tbTktEndorsement');
    table.create = true;
    table.columns.add('ImportDate', sql.DateTime, { nullable: true });
    table.columns.add('BookingCode', sql.NVarChar(6), { nullable: true });
    table.columns.add('CreateDate', sql.Date, { nullable: true });
    table.columns.add('PrimaryDocNbr', sql.NVarChar(13), { nullable: true });
    table.columns.add('VCRCreateDate', sql.Date, { nullable: true });
    table.columns.add('TransactionDateTime', sql.DateTime, { nullable: true });
    table.columns.add('EndSeqNbr', sql.Int, { nullable: true });
    table.columns.add('Endorsements', sql.NVarChar(147), { nullable: true });

    values.forEach(value => {
      table.rows.add(
        value.ImportDate,
        value.BookingCode,
        value.CreateDate,
        value.PrimaryDocNbr,
        value.VCRCreateDate,
        value.TransactionDateTime,
        value.EndSeqNbr,
        value.Endorsements,
      );
    });

    const transaction = new sql.Transaction(pool);

    transaction.begin(errorTransaction => {
      if (errorTransaction) throw errorTransaction;

      let rollBack = false;

      transaction.on('rollback', () => {
        rollBack = true;
      });

      const request = new sql.Request(transaction);

      request
        .bulk(table)
        .then(() => {
          // console.log(result.rowsAffected);
          transaction.commit(errorCommit => {
            if (errorCommit) {
              throw errorCommit;
            }
          });
        })
        .catch(error => {
          if (!rollBack) {
            transaction.rollback();
          }
          throw error;
        });
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const importResDataIndex = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  const lineReader = createInterface({
    input: createReadStream(filePath),
  });

  const values = [];
  lineReader.on('line', line => {
    const data = line.split('|').map(item => (item !== '' ? item.trim() : null));
    const resDataIndex = new tbResDataIndex();

    resDataIndex.ImportDate = new Date(moment(fileDate).format(formatDateTime));
    resDataIndex.BookingCode = data[1];
    resDataIndex.CreateDate =
      data[2] !== null ? new Date(moment(data[2]).format(formatDate)) : null;
    resDataIndex.FromDateTime =
      data[3] !== null ? new Date(moment(data[3]).format(formatDateTime)) : null;
    resDataIndex.NameAssociationID = data[4];
    resDataIndex.ProfileType = data[5];
    resDataIndex.ProfileValue = data[6];
    resDataIndex.SourceSystemId = data[7];
    resDataIndex.RecordUpdateDate =
      data[8] !== null ? new Date(moment(data[8]).format(formatDate)) : null;
    resDataIndex.RecordUpdateTime =
      data[9] !== null
        ? new Date(
            moment(`${fileDate} ${data[9]}`)
              .add(1, 'd')
              .format(formatDateTime),
          )
        : null;
    resDataIndex.IntraPNRSetNbr = data[10];
    resDataIndex.CDISeqNbr = data[11];
    resDataIndex.ResActivityCode = data[12];

    values.push(resDataIndex);
  });

  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();

    const table = new sql.Table('tbResDataIndex');
    table.create = true;
    table.columns.add('ImportDate', sql.DateTime, { nullable: true });
    table.columns.add('BookingCode', sql.NVarChar(6), { nullable: true });
    table.columns.add('CreateDate', sql.Date, { nullable: true });
    table.columns.add('FromDateTime', sql.DateTime, { nullable: true });
    table.columns.add('NameAssociationID', sql.Int, { nullable: true });
    table.columns.add('ProfileType', sql.NVarChar(10), { nullable: true });
    table.columns.add('ProfileValue', sql.NVarChar(80), { nullable: true });
    table.columns.add('SourceSystemId', sql.NVarChar(2), { nullable: true });
    table.columns.add('RecordUpdateDate', sql.Date, { nullable: true });
    table.columns.add('RecordUpdateTime', sql.DateTime, { nullable: true });
    table.columns.add('IntraPNRSetNbr', sql.Int, { nullable: true });
    table.columns.add('CDISeqNbr', sql.Int, { nullable: true });
    table.columns.add('ResActivityCode', sql.Int, { nullable: true });

    values.forEach(value => {
      table.rows.add(
        value.ImportDate,
        value.BookingCode,
        value.CreateDate,
        value.FromDateTime,
        value.NameAssociationID,
        value.ProfileType,
        value.ProfileValue,
        value.SourceSystemId,
        value.RecordUpdateDate,
        value.RecordUpdateTime,
        value.IntraPNRSetNbr,
        value.CDISeqNbr,
        value.ResActivityCode,
      );
    });

    const transaction = new sql.Transaction(pool);

    transaction.begin(errorTransaction => {
      if (errorTransaction) throw errorTransaction;

      let rollBack = false;

      transaction.on('rollback', () => {
        rollBack = true;
      });

      const request = new sql.Request(transaction);

      request
        .bulk(table)
        .then(() => {
          // console.log(result.rowsAffected);
          transaction.commit(errorCommit => {
            if (errorCommit) {
              throw errorCommit;
            }
          });
        })
        .catch(error => {
          if (!rollBack) {
            transaction.rollback();
          }
          throw error;
        });
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const importTktProration = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  const lineReader = createInterface({
    input: createReadStream(filePath),
  });

  const values = [];
  lineReader.on('line', line => {
    const data = line.split('|').map(item => (item !== '' ? item.trim() : null));
    const tktProration = new tbTktProration();

    tktProration.ImportDate = new Date(moment(fileDate).format(formatDateTime));
    tktProration.BookingCode = data[1];
    tktProration.CreateDate =
      data[2] !== null ? new Date(moment(data[2]).format(formatDate)) : null;
    tktProration.PrimaryDocNbr = data[3];
    tktProration.VCRCreateDate =
      data[4] !== null ? new Date(moment(data[4]).format(formatDate)) : null;
    tktProration.TransactionDateTime =
      data[5] !== null ? new Date(moment(data[5]).format(formatDateTime)) : null;
    tktProration.CouponSeqNbr = data[6];
    tktProration.CouponDistanceKm = data[7];
    tktProration.CouponDistanceMi = data[8];
    tktProration.ProrationFactor = data[9];
    tktProration.ProrateBaseFareUSD = data[10];
    tktProration.ProrateTotalDocAmtUSD = data[11];
    tktProration.EquivBaseFareCurrCode = data[12];
    tktProration.EquivUSDExchgRate = data[13];
    tktProration.ProrateEquivBaseFareAmt = data[14];
    tktProration.ProrateEquivTotalDocAmt = data[15];
    tktProration.OwnerCurrencyCode = data[16];
    tktProration.ProrateBaseFareOwnerAmt = data[17];
    tktProration.ProrateTotalDocOwnerAmt = data[18];

    values.push(tktProration);
  });

  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();

    const table = new sql.Table('tbTktProration');
    table.create = true;
    table.columns.add('ImportDate', sql.DateTime, { nullable: true });
    table.columns.add('BookingCode', sql.NVarChar(6), { nullable: true });
    table.columns.add('CreateDate', sql.Date, { nullable: true });
    table.columns.add('PrimaryDocNbr', sql.NVarChar(13), { nullable: true });
    table.columns.add('VCRCreateDate', sql.Date, { nullable: true });
    table.columns.add('TransactionDateTime', sql.DateTime, { nullable: true });
    table.columns.add('CouponSeqNbr', sql.Int, { nullable: true });
    table.columns.add('CouponDistanceKm', sql.Decimal(18, 4), { nullable: true });
    table.columns.add('CouponDistanceMi', sql.Decimal(18, 4), { nullable: true });
    table.columns.add('ProrationFactor', sql.Decimal(18, 4), { nullable: true });
    table.columns.add('ProrateBaseFareUSD', sql.Decimal(18, 4), { nullable: true });
    table.columns.add('ProrateTotalDocAmtUSD', sql.Decimal(18, 4), { nullable: true });
    table.columns.add('EquivBaseFareCurrCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('EquivUSDExchgRate', sql.Decimal(18, 4), { nullable: true });
    table.columns.add('ProrateEquivBaseFareAmt', sql.Decimal(18, 4), { nullable: true });
    table.columns.add('ProrateEquivTotalDocAmt', sql.Decimal(18, 4), { nullable: true });
    table.columns.add('OwnerCurrencyCode', sql.NVarChar(3), { nullable: true });
    table.columns.add('ProrateBaseFareOwnerAmt', sql.Decimal(18, 4), { nullable: true });
    table.columns.add('ProrateTotalDocOwnerAmt', sql.Decimal(18, 4), { nullable: true });

    values.forEach(value => {
      table.rows.add(
        value.ImportDate,
        value.BookingCode,
        value.CreateDate,
        value.PrimaryDocNbr,
        value.VCRCreateDate,
        value.TransactionDateTime,
        value.CouponSeqNbr,
        value.CouponDistanceKm,
        value.CouponDistanceMi,
        value.ProrationFactor,
        value.ProrateBaseFareUSD,
        value.ProrateTotalDocAmtUSD,
        value.EquivBaseFareCurrCode,
        value.EquivUSDExchgRate,
        value.ProrateEquivBaseFareAmt,
        value.ProrateEquivTotalDocAmt,
        value.OwnerCurrencyCode,
        value.ProrateBaseFareOwnerAmt,
        value.ProrateTotalDocOwnerAmt,
      );
    });

    const transaction = new sql.Transaction(pool);

    transaction.begin(errorTransaction => {
      if (errorTransaction) throw errorTransaction;

      let rollBack = false;

      transaction.on('rollback', () => {
        rollBack = true;
      });

      const request = new sql.Request(transaction);

      request
        .bulk(table)
        .then(() => {
          // console.log(result.rowsAffected);
          transaction.commit(errorCommit => {
            if (errorCommit) {
              throw errorCommit;
            }
          });
        })
        .catch(error => {
          if (!rollBack) {
            transaction.rollback();
          }
          throw error;
        });
    });

    return true;
  } catch (error) {
    return false;
  }
};
