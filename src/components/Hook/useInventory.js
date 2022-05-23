import { useEffect, useState } from "react";
import axios from "axios";
const useInventory = () => {
  const [inventories, setInventory] = useState([]);
  useEffect(() => {
    const getInventory = async () => {
      const url = `https://e-book-server.herokuapp.com/api/inventory`;
      const { data } = await axios.get(url);
      setInventory(data);
    };
    getInventory();
  }, []);

  return { inventories, setInventory };
};

export default useInventory;
