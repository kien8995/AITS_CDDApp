import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = initialOptions => {
  const [options, setOptions] = useState(initialOptions);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setLoading(true);

      try {
        const result = await axios(options);

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

export default useAxios;
