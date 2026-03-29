import { useState } from 'react';

export const useAddEditEmployeeViewModel = () => {
  const [loading, setLoading] = useState(false);
  return { loading };
};
