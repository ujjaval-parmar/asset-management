import { useState } from 'react';

export const useDashboardViewModel = () => {
  const [loading, setLoading] = useState(false);
  return { loading };
};
