import { useState } from 'react';

export const useAssetsViewModel = () => {
  const [loading, setLoading] = useState(false);
  return { loading };
};
