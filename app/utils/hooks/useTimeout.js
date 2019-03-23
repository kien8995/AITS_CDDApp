import { useEffect, useRef } from 'react';

/**
 * Wraps `setTimeout`. Triggers the function after a given delay.
 * @param {Function} fn function to call
 * @param {number} delay in milliseconds
 * @return {void}
 */
const useTimeout = (fn, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = fn;
  });

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    function cb() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setTimeout(cb, delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
};

export default useTimeout;
