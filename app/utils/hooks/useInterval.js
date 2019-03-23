import { useEffect, useRef } from 'react';

/**
 * Wraps `setInterval`. Triggers the function each interval.
 * @param {Function} fn function to call
 * @param {number} delay in milliseconds
 * @return {void}
 */
const useInterval = (fn, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = fn;
  });

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
