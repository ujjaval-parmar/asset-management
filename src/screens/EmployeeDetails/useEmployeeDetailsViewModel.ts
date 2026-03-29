import { useState } from 'react';

export const useEmployeeDetailsViewModel = () => {
  const [loading, setLoading] = useState(false);
  return { loading };
};
