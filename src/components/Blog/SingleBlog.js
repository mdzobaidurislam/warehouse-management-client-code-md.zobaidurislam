import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingBox from "../Share/LoadingBox";

const SingleBlog = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [blogItem, setBlogItem] = useState({});

  // get the inventory by id
  useEffect(() => {
    const getInventoryById = async () => {
      const url = `https://e-book-server.herokuapp.com/api/blog/${id}`;
      const { data } = await axios.get(url);
      setBlogItem(data);
      setLoading(true);
    };
    getInventoryById();
  }, [id, blogItem]);
  if (!loading) {
    return <LoadingBox />;
  }
  return (
    <div className="single_section ptb_80">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="single_thum">
              <img src={blogItem.image} className="img-fluid" alt="" />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="single_content">
              <h1>{blogItem.tite}</h1>

              <div className="sign_blog_des">
                <p
                  dangerouslySetInnerHTML={{ __html: blogItem.description }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
