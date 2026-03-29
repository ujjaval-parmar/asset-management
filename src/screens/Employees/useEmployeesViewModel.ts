import { useState } from 'react';

export const useEmployeesViewModel = () => {
  const [loading, setLoading] = useState(false);
  return { loading };
};
