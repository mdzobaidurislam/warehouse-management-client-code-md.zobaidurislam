import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "../Firebase/Firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import useGetToken from "./useGetToken";
const useManageInventory = () => {
  const [user] = useAuthState(auth);
  const usertoken = useGetToken();

  const navigate = useNavigate();
  const [inventories, setInventory] = useState([]);

  useEffect(() => {
    const getInventory = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usertoken}`,
        },
      };
      const url = `https://e-book-server.herokuapp.com/api/admin/inventory/${user?.email}`;
      try {
        const { data } = await axios.get(url, config);
        setInventory(data.inventory);
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 403) {
          toast(error.response.data.msg);
          signOut(auth);
          navigate("/login");
        }
      }
    };
    getInventory();
  }, [navigate, usertoken, user.email]);

  return { inventories, setInventory };
};

export default useManageInventory;
