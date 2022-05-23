import React, { useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import BestBook from "../BestBook/BestBook";
import Blog from "../Blog/Blog";
import BookTell from "../BookTell/BookTell";
import Inventory from "../Inventory/Inventory";
import LoadingBox from "../Share/LoadingBox";

const Home = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setInterval(() => {
      setLoading(true);
    }, 1000);
  }, [loading]);

  if (!loading) {
    return <LoadingBox />;
  }
  return (
    <>
      <Banner />
      <BestBook />
      <Inventory data={6} />
      <BookTell />
      <Blog />
    </>
  );
};

export default Home;
