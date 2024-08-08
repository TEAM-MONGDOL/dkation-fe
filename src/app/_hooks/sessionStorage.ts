export const storeAccessToken = (accessToken: string) => {
  sessionStorage.setItem('accessToken', accessToken);
};

export const getAccessToken = () => {
  return sessionStorage.getItem('accessToken');
};

export const removeAccessToken = () => {
  sessionStorage.removeItem('accessToken');
};

export const storeAccountId = (accountId: string) => {
  sessionStorage.setItem('accountId', accountId);
};

export const getAccountId = () => {
  return sessionStorage.getItem('accountId');
};

export const removeAccountId = () => {
  sessionStorage.removeItem('accountId');
};
