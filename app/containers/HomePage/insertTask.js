import sql from 'mssql';

export const taskRes = async (data, dbConfig) => {
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

    data.forEach(value => {
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

export const taskResFlight = async (data, dbConfig) => {
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

    data.forEach(value => {
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

export const taskResFlightFT = async (data, dbConfig) => {
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

    data.forEach(value => {
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

export const taskResRemark = async (data, dbConfig) => {
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

    data.forEach(value => {
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

export const taskResPreReservedSeat = async (data, dbConfig) => {
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

    data.forEach(value => {
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

export const taskResPassengerDoc = async (data, dbConfig) => {
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

    data.forEach(value => {
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

export const taskResSuspenseDocArrangement = async (data, dbConfig) => {
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

    data.forEach(value => {
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

export const taskResSuspenseTimeLimit = async (data, dbConfig) => {
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

    data.forEach(value => {
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

export const taskResEmergencyContact = async (data, dbConfig) => {
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

    data.forEach(value => {
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

export const taskResPassenger = async (data, dbConfig) => {
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

    data.forEach(value => {
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

export const taskResSSR = async (data, dbConfig) => {
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

    data.forEach(value => {
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

export const taskResTravelArranger = async (data, dbConfig) => {
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

    data.forEach(value => {
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

export const taskResPassengerEmail = async (data, dbConfig) => {
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

    data.forEach(value => {
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

export const taskResPassengerPhone = async (data, dbConfig) => {
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

    data.forEach(value => {
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

export const taskResODFlight = async (data, dbConfig) => {
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

    data.forEach(value => {
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

export const taskResAddress = async (data, dbConfig) => {
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

    data.forEach(value => {
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

export const taskTktDocument = async (data, dbConfig) => {
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

    data.forEach(value => {
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

export const taskTktCoupon = async (data, dbConfig) => {
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

    data.forEach(value => {
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

export const taskTktTax = async (data, dbConfig) => {
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

    data.forEach(value => {
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

export const taskTktTaxDetail = async (data, dbConfig) => {
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

    data.forEach(value => {
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

export const taskTktPayment = async (data, dbConfig) => {
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

    data.forEach(value => {
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

export const taskTktRemark = async (data, dbConfig) => {
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

    data.forEach(value => {
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

export const taskTktAddress = async (data, dbConfig) => {
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

    data.forEach(value => {
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

export const taskTktDocumentHistory = async (data, dbConfig) => {
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

    data.forEach(value => {
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

export const taskTktCouponHistory = async (data, dbConfig) => {
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

    data.forEach(value => {
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

export const taskTktEndorsement = async (data, dbConfig) => {
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

    data.forEach(value => {
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

export const taskResDataIndex = async (data, dbConfig) => {
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

    data.forEach(value => {
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

export const taskTktProration = async (data, dbConfig) => {
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

    data.forEach(value => {
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
