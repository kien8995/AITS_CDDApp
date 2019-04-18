/* eslint-disable prefer-destructuring */
/* eslint-disable new-cap */
import { createInterface } from 'readline';
import fs, { createReadStream } from 'fs';
import moment from 'moment';
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

import { taskRes, taskResFlight, taskResFlightFT, taskResRemark, taskResPreReservedSeat, taskResPassengerDoc, taskResSuspenseDocArrangement, taskResSuspenseTimeLimit, taskResEmergencyContact, taskResPassenger, taskResSSR, taskResTravelArranger, taskResPassengerEmail, taskResPassengerPhone, taskResODFlight, taskResAddress, taskTktDocument, taskTktCoupon, taskTktTax, taskTktTaxDetail, taskTktPayment, taskTktRemark, taskTktAddress, taskTktDocumentHistory, taskTktCouponHistory, taskTktEndorsement, taskResDataIndex, taskTktProration } from './insertTask';

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

  return new Promise((resolve, reject) => {
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

    lineReader.on('close', () => {
      resolve(taskRes(values, dbConfig));
    });
  });
};

export const importResFlight = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  return new Promise((resolve, reject) => {
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

    lineReader.on('close', () => {
      resolve(taskResFlight(values, dbConfig));
    });
  });
};

export const importResFlightFT = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  return new Promise((resolve, reject) => {
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

    lineReader.on('close', () => {
      resolve(taskResFlightFT(values, dbConfig));
    });
  });
};

export const importResRemark = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  return new Promise((resolve, reject) => {
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

    lineReader.on('close', () => {
      resolve(taskResRemark(values, dbConfig));
    });
  });
};

export const importResPreReservedSeat = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  return new Promise((resolve, reject) => {
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

    lineReader.on('close', () => {
      resolve(taskResPreReservedSeat(values, dbConfig));
    });
  });
};

export const importResPassengerDoc = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  return new Promise((resolve, reject) => {
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

    lineReader.on('close', () => {
      resolve(taskResPassengerDoc(values, dbConfig));
    });
  });
};

export const importResSuspenseDocArrangement = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  return new Promise((resolve, reject) => {
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

    lineReader.on('close', () => {
      resolve(taskResSuspenseDocArrangement(values, dbConfig));
    });
  });
};

export const importResSuspenseTimeLimit = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  return new Promise((resolve, reject) => {
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

    lineReader.on('close', () => {
      resolve(taskResSuspenseTimeLimit(values, dbConfig));
    });
  });
};

export const importResEmergencyContact = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  return new Promise((resolve, reject) => {
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

    lineReader.on('close', () => {
      resolve(taskResEmergencyContact(values, dbConfig));
    });
  });
};

export const importResPassenger = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  return new Promise((resolve, reject) => {
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

    lineReader.on('close', () => {
      resolve(taskResPassenger(values, dbConfig));
    });
  });
};

export const importResSSR = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  return new Promise((resolve, reject) => {
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

    lineReader.on('close', () => {
      resolve(taskResSSR(values, dbConfig));
    });
  });
};

export const importResTravelArranger = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  return new Promise((resolve, reject) => {
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

    lineReader.on('close', () => {
      resolve(taskResTravelArranger(values, dbConfig));
    });
  });
};

export const importResPassengerEmail = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  return new Promise((resolve, reject) => {
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

    lineReader.on('close', () => {
      resolve(taskResPassengerEmail(values, dbConfig));
    });
  });
};

export const importResPassengerPhone = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  return new Promise((resolve, reject) => {
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

    lineReader.on('close', () => {
      resolve(taskResPassengerPhone(values, dbConfig));
    });
  });
};

export const importResODFlight = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  return new Promise((resolve, reject) => {
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

    lineReader.on('close', () => {
      resolve(taskResODFlight(values, dbConfig));
    });
  });
};

export const importResAddress = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  return new Promise((resolve, reject) => {
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

    lineReader.on('close', () => {
      resolve(taskResAddress(values, dbConfig));
    });
  });
};

export const importTktDocument = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  return new Promise((resolve, reject) => {
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

    lineReader.on('close', () => {
      resolve(taskTktDocument(values, dbConfig));
    });
  });
};

export const importTktCoupon = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  return new Promise((resolve, reject) => {
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

    lineReader.on('close', () => {
      resolve(taskTktCoupon(values, dbConfig));
    });
  });
};

export const importTktTax = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  return new Promise((resolve, reject) => {
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

    lineReader.on('close', () => {
      resolve(taskTktTax(values, dbConfig));
    });
  });
};

export const importTktTaxDetail = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  return new Promise((resolve, reject) => {
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

    lineReader.on('close', () => {
      resolve(taskTktTaxDetail(values, dbConfig));
    });
  });
};

export const importTktPayment = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  return new Promise((resolve, reject) => {
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

    lineReader.on('close', () => {
      resolve(taskTktPayment(values, dbConfig));
    });
  });
};

export const importTktRemark = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  return new Promise((resolve, reject) => {
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

    lineReader.on('close', () => {
      resolve(taskTktRemark(values, dbConfig));
    });
  });
};

export const importTktAddress = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  return new Promise((resolve, reject) => {
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

    lineReader.on('close', () => {
      resolve(taskTktAddress(values, dbConfig));
    });
  });
};

export const importTktDocumentHistory = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  return new Promise((resolve, reject) => {
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

    lineReader.on('close', () => {
      resolve(taskTktDocumentHistory(values, dbConfig));
    });
  });
};

export const importTktCouponHistory = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  return new Promise((resolve, reject) => {
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

    lineReader.on('close', () => {
      resolve(taskTktCouponHistory(values, dbConfig));
    });
  });
};

export const importTktEndorsement = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  return new Promise((resolve, reject) => {
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

    lineReader.on('close', () => {
      resolve(taskTktEndorsement(values, dbConfig));
    });
  });
};

export const importResDataIndex = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  return new Promise((resolve, reject) => {
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

    lineReader.on('close', () => {
      resolve(taskResDataIndex(values, dbConfig));
    });
  });
};

export const importTktProration = async (filePath, fileDate, dbConfig) => {
  if (getFilesizeInBytes(filePath) === 0) {
    return true;
  }

  return new Promise((resolve, reject) => {
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

    lineReader.on('close', () => {
      resolve(taskTktProration(values, dbConfig));
    });
  });
};
