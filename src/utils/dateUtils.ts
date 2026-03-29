export const getRelativeVerificationTime = (dateValue: any) => {
  if (!dateValue) return { text: 'Never', needsVerification: true };

  let date;
  if (typeof dateValue.toDate === 'function') {
    date = dateValue.toDate();
  } else if (dateValue._seconds) {
    date = new Date(dateValue._seconds * 1000);
  } else {
    date = new Date(dateValue);
  }

  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  const needsVerification = diffInDays >= 7;

  let timeString = '';
  if (diffInMinutes < 1) {
    timeString = 'just now';
  } else if (diffInMinutes < 60) {
    timeString = `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
  } else if (diffInHours < 24) {
    timeString = `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  } else {
    timeString = `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
  }

  if (needsVerification) {
    timeString = `${date.toLocaleDateString()}`;
  }

  return { 
    text: timeString, 
    needsVerification
  };
};

export const formatDate = (dateValue: any) => {
  if (!dateValue) return 'N/A';
  if (typeof dateValue.toDate === 'function') {
    return dateValue.toDate().toLocaleDateString();
  }
  if (dateValue._seconds) {
    return new Date(dateValue._seconds * 1000).toLocaleDateString();
  }
  if (dateValue.seconds) {
    return new Date(dateValue.seconds * 1000).toLocaleDateString();
  }
  return String(dateValue);
};
