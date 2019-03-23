import { useState, useEffect, useRef } from 'react';
import { apiClient } from 'utils';

const { aitsClient } = apiClient;

const useAitsApi = initialOptions => {
  const [options, setOptions] = useState(initialOptions);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const refMounted = useRef(false);
  const aitsApi = aitsClient();

  useEffect(() => {
    if (!refMounted.current) {
      refMounted.current = true;
      return;
    }

    const fetchData = async () => {
      setError(false);
      setLoading(true);

      try {
        const result = await aitsApi(options);

        setData(result.data);
      } catch (e) {
        setError(e);
      }

      setLoading(false);
    };

    fetchData();
  }, [options]);

  const doFetch = _options => {
    setOptions(_options);
  };

  return { data, loading, error, doFetch };
};

export default useAitsApi;
