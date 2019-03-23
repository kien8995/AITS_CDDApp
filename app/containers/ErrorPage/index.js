import React from 'react';
import { Helmet } from 'react-helmet';
import ErrorWall from './ErrorWall';

const ErrorPage = () => (
  <div>
    <Helmet>
      <title>Error !</title>
      <meta name="description" content="Error" />
    </Helmet>

    <ErrorWall className="load-error">
      <div className="error-container">
        <h1>oh no...</h1>
        <h3>We have had an error</h3>
        <p>Sorry...please check back (click refresh) in just a moment.</p>
        <p>
          If you are tyring to process an order, we reccomend you call
          <br /> Support team at (024) 38.732795.
          <br /> Or email at helpdesk.aits@vietnamairlines.com
        </p>
      </div>
    </ErrorWall>
  </div>
);

export default ErrorPage;
