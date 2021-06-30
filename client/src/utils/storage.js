const storage = {
  setItem: (key, value) => {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  },
  getItem: (key) => {
    try {
      const data = localStorage.getItem(key);
      return JSON.parse(data);
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  deleteItem: (key) => {
    localStorage.removeItem(key);
  },
};

export default storage;
