import sql from 'mssql';
import GetPaxDocByImportDate_Result from './entities/GetPaxDocByImportDate_Result';
import GetCustomerInsign_Result from './entities/GetCustomerInsign_Result';
import GetCustomerInsignOAL_Result from './entities/GetCustomerInsignOAL_Result';
import GetTicketOd_Result from './entities/GetTicketOd_Result';
import GetODFlight_Result from './entities/GetODFlight_Result';

export const getPaxDocByImportDate = async (dbConfig, dFrom, dTo) => {
  const pool = new sql.ConnectionPool(dbConfig);
  const poolConnect = await pool.connect();

  return new Promise((resolve, reject) => {
    const request = poolConnect.request();
    const data = [];

    request
      .input('dFrom', sql.Date, dFrom)
      .input('dTo', sql.Date, dTo)
      .execute('GetPaxDocByImportDate', (error, result) => {
        if (error) {
          reject(error);
        }
        result.recordset.forEach(item => {
          const obj = new GetPaxDocByImportDate_Result();
          obj.BookingCode = item.BookingCode;
          obj.PassengerFirstName = item.PassengerFirstName;
          obj.PassengerLastName = item.PassengerLastName;
          obj.IssueCountryCode = item.IssueCountryCode;
          data.push(obj);
        });

        resolve(data);
      });
  });
};

export const getCustomerInsign = async (dbConfig, dFrom, dTo) => {
  const pool = new sql.ConnectionPool(dbConfig);
  const poolConnect = await pool.connect();

  return new Promise((resolve, reject) => {
    const request = poolConnect.request();
    const data = [];

    request
      .input('dFrom', sql.Date, dFrom)
      .input('dTo', sql.Date, dTo)
      .execute('GetCustomerInsign', (error, result) => {
        if (error) {
          reject(error);
        }
        result.recordset.forEach(item => {
          const obj = new GetCustomerInsign_Result();
          obj.CusId = item.CusId;
          obj.Sector = item.Sector;
          obj.ImportDate = item.ImportDate;
          obj.BookingCode = item.BookingCode;
          obj.ServiceStartDate = item.ServiceStartDate;
          obj.CustomerFullName = item.CustomerFullName;
          obj.AgentCountryCode = item.AgentCountryCode;
          obj.EMailAddress = item.EMailAddress;
          obj.ClassOfService = item.ClassOfService;
          obj.IssueCountryCode = item.IssueCountryCode;
          data.push(obj);
        });

        resolve(data);
      });
  });
};

export const getCustomerInsignOAL = async (dbConfig, dFrom, dTo) => {
  const pool = new sql.ConnectionPool(dbConfig);
  const poolConnect = await pool.connect();

  return new Promise((resolve, reject) => {
    const request = poolConnect.request();
    const data = [];

    request
      .input('dFrom', sql.Date, dFrom)
      .input('dTo', sql.Date, dTo)
      .execute('GetCustomerInsignOAL', (error, result) => {
        if (error) {
          reject(error);
        }
        result.recordset.forEach(item => {
          const obj = new GetCustomerInsignOAL_Result();
          obj.CusId = item.CusId;
          obj.Sector = item.Sector;
          obj.ImportDate = item.ImportDate;
          obj.BookingCode = item.BookingCode;
          obj.ServiceStartDate = item.ServiceStartDate;
          obj.CustomerFullName = item.CustomerFullName;
          obj.AgentCountryCode = item.AgentCountryCode;
          obj.EMailAddress = item.EMailAddress;
          obj.ClassOfService = item.ClassOfService;
          obj.IssueCountryCode = item.IssueCountryCode;
          data.push(obj);
        });

        resolve(data);
      });
  });
};

export const getTicketOd = async (dbConfig, dImport) => {
  const pool = new sql.ConnectionPool(dbConfig);
  const poolConnect = await pool.connect();

  return new Promise((resolve, reject) => {
    const request = poolConnect.request();
    const data = [];

    request
      .input('dImport', sql.Date, dImport)
      .execute('GetTicketOd', (error, result) => {
        if (error) {
          reject(error);
        }
        result.recordset.forEach(item => {
          const obj = new GetTicketOd_Result();
          obj.PrimaryDocNbr = item.PrimaryDocNbr;
          obj.CouponSeqNbr = item.CouponSeqNbr;
          obj.Sector = item.Sector;
          data.push(obj);
        });

        resolve(data);
      });
  });
};

export const getODFlight = async (dbConfig, dImport) => {
  const pool = new sql.ConnectionPool(dbConfig);
  const poolConnect = await pool.connect();

  return new Promise((resolve, reject) => {
    const request = poolConnect.request();
    const data = [];

    request
      .input('dImport', sql.Date, dImport)
      .execute('GetODFlight', (error, result) => {
        if (error) {
          reject(error);
        }
        result.recordset.forEach(item => {
          const obj = new GetODFlight_Result();
          obj.BookingCode = item.BookingCode;
          obj.Sector = item.Sector;
          data.push(obj);
        });

        resolve(data);
      });
  });
};
