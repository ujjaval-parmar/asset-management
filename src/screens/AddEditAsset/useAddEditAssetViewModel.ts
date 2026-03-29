import { useState } from 'react';

export const useAddEditAssetViewModel = () => {
  const [loading, setLoading] = useState(false);
  return { loading };
};
