import { useState, useEffect, useCallback } from 'react';

const useAsync = (fn, args) => {
  const [state, set] = useState({
    loading: true,
  });
  const memoized = useCallback(fn, args);

  useEffect(() => {
    let mounted = true;
    set({
      loading: true,
    });
    const promise = memoized();

    promise.then(
      value => {
        if (mounted) {
          set({
            loading: false,
            value,
          });
        }
      },
      error => {
        if (mounted) {
          set({
            loading: false,
            error,
          });
        }
      },
    );

    return () => {
      mounted = false;
    };
  }, [memoized]);

  return state;
};

export default useAsync;
