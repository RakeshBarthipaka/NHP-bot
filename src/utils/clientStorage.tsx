const setLocalStorageData = (key:string, value:any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorageData = (key:string) => {
  let data = localStorage.getItem(key);
  return data;
};


export { setLocalStorageData, getLocalStorageData };
