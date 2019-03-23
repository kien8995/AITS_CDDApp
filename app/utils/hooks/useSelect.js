import { useState } from 'react';

const useSelect = initial => {
  const [value, set] = useState(initial);

  return {
    value,
    set,
    reset: () => set(initial),
    onChange: e => set(e),
  };
};

export default useSelect;
