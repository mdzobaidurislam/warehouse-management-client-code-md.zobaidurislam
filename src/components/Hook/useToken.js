import axios from "axios";
import { useEffect, useState } from "react";

const useToken = (user) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const getToken = async () => {
      const email = user?.user?.email;
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (email) {
        const { data } = await axios.post(
          "https://e-book-server.herokuapp.com/api/login",
          { email },
          config
        );
        setToken(data);
        if (data.token) {
          localStorage.setItem("token", JSON.stringify(data.token));
        }
      }
    };
    getToken();
  }, [user]);
  return [token];
};

export default useToken;
