import { useState } from 'react';

export const useAssetDetailsViewModel = () => {
  const [loading, setLoading] = useState(false);
  return { loading };
};
