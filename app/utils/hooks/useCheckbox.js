import { useState } from 'react';

const useCheckbox = initial => {
  const [value, set] = useState(initial);

  return {
    value,
    set,
    reset: () => set(initial),
    onChange: e => set(e.target.checked),
  };
};

export default useCheckbox;
