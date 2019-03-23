import React, { lazy, Suspense } from 'react';
import LoadingIndicator from 'components/LoadingIndicator';

const Component = lazy(() => import('./index'));

export default props => (
  <Suspense fallback={<LoadingIndicator />}>
    <Component {...props} />
  </Suspense>
);
