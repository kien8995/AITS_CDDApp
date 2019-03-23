import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from '../ErrorPage';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // static getDerivedStateFromError(error) {
  //   // Update state so the next render will show the fallback UI.
  //   return { hasError: true };
  // }

  // componentDidCatch(error, info) {
  //   // You can also log the error to an error reporting service
  // }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorPage />;
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
};
