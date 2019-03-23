/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { DatePicker, Button } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  render() {
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
          <Button type="primary" icon="download" size="large">
            Import Data
          </Button>
        </div>
      </article>
    );
  }
}

export default HomePage;
