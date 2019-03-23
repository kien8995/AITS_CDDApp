import { useState } from 'react';

const useField = initial => {
  const [value, set] = useState(initial);

  return {
    value,
    set,
    reset: () => set(initial),
    onChange: e => set(e.target.value),
  };
};

export default useField;
