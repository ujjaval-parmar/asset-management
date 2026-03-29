import { useState } from 'react';

export const useProfileViewModel = () => {
  const [loading, setLoading] = useState(false);
  return { loading };
};
