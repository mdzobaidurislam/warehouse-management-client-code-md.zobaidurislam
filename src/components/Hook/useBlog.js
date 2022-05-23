import { useEffect, useState } from "react";
import axios from "axios";
const useBlog = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const getBlog = async () => {
      const url = `https://e-book-server.herokuapp.com/api/blog`;
      const { data } = await axios.get(url);
      setBlogs(data);
    };
    getBlog();
  }, []);

  return { blogs, setBlogs };
};

export default useBlog;
