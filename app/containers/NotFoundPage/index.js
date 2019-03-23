/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import './style.css';

const NotFoundPage = () => (
  <div>
    <Helmet>
      <title>404</title>
      <meta name="description" content="Page not found" />
    </Helmet>

    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <div />
          <h1>404</h1>
        </div>
        <h2>Page not found</h2>
        <p>
          The page you are looking for might have been removed had its name changed or is
          temporarily unavailable.
        </p>
        <a href="/">home page</a>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
