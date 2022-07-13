const useLocalStorageContext = (key) => {
  const saveStorageValue = (value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }

  const getStorageValue = () => {
    return JSON.parse(localStorage.getItem(key));
  }

  const removeStorageValue = () => {
    localStorage.removeItem(key);
  }

  return [saveStorageValue, getStorageValue, removeStorageValue]
}

export default useLocalStorageContext;