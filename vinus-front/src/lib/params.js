const isNode = typeof window === 'undefined';
const storage = !isNode ? window.localStorage : null;

const getAppParamValue = (paramName, { defaultValue = undefined, storageKey = null } = {}) => {
  if (isNode) return defaultValue;

  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get(paramName);
  const finalStorageKey = storageKey || `vinus_${paramName}`;

  if (searchParam) {
    storage?.setItem(finalStorageKey, searchParam);
    return searchParam;
  }

  const storedValue = storage?.getItem(finalStorageKey);
  if (storedValue) return storedValue;

  return defaultValue || null;
};

const getAppParams = () => {
  if (getAppParamValue("clear_session") === 'true') {
    storage?.removeItem('vinus_token');
    storage?.removeItem('vinus_user');
  }

  return {
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
    token: getAppParamValue("token", { storageKey: 'vinus_token' }),
    env: import.meta.env.MODE,
    isDevelopment: import.meta.env.DEV,
  };
};

export const appParams = {
  ...getAppParams()
};