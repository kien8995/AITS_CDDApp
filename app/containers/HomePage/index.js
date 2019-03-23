import React from 'react';
import { Helmet } from 'react-helmet';
import { DatePicker, Button } from 'antd';
import moment from 'moment';
import sql from 'mssql';

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';

const HomePage = () => {
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

  return (
    <article>
      <Helmet>
        <title>CDD App v1.0</title>
        <meta name="description" content="CDD App" />
      </Helmet>
      <div>
        <RangePicker
          defaultValue={[
            moment('2019/01/01', dateFormat),
            moment('2019/01/01', dateFormat),
          ]}
          format={dateFormat}
        />
        <Button type="primary" icon="download" size="large" onClick={callSql}>
          Import Data
        </Button>
      </div>
    </article>
  );
};

export default HomePage;
