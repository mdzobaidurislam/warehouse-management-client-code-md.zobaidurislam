import React from "react";
import "./Blog.css";
import useBlog from "../Hook/useBlog";
import BlogItem from "./BlogItem";

import LoadingBox from "../Share/LoadingBox";

const Blog = () => {
  const { blogs } = useBlog();
  return (
    <div className="blog_section  ">
      <div className="blog_warp ptb_80">
        <div className="container ">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="heading_title">
                Latest<span> Blog </span> Post
              </h1>
            </div>
          </div>
          <div className="row">
            {blogs.length > 0 ? (
              blogs.map((item) => <BlogItem key={item._id} blog={item} />)
            ) : (
              <LoadingBox msg="Data Not Found!" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
