import { useEffect, useState } from "react";

function useLocalStorage(itemName, initialValue) {
  const [error, setError] = useState(false);
  const [asyncTodo, setasyncTodo] = useState(true);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(initialValue);
  const [item2, setItem2] = useState(initialValue);

  useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;

        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }

        if(itemName === "auth1"){
            setItem(parsedItem);
        }else{
            setItem2(parsedItem);
        }


        setLoading(false);
        setasyncTodo(true);
      } catch (error) {
        setError(error);
      }
    }, 3000);
  }, [asyncTodo]);

  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      setItem(newItem);
    } catch (error) {
      setError(error);
    }
  };

  return {
    item,
    item2,
    saveItem,
    loading,
    error,
  };
}

export { useLocalStorage };
