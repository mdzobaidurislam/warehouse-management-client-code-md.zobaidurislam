import React from "react";
import { Link } from "react-router-dom";

const BlogItem = (props) => {
  const { _id, title, description, image } = props.blog;

  return (
    <div className="col-md-6 col-lg-4 mb-3 ">
      <div className="blog_item_warp p-1 ">
        <div className="blog_item_thum">
          <img src={image} alt="" className="img-fluid" />
        </div>
        <div className="blog_des p-3">
          <h5 className="mt-4 mb-2">{title}</h5>
          <p dangerouslySetInnerHTML={{ __html: description.slice(0, 50) }}></p>
          <div className="btn-group d-flex justify-content-center">
            <Link to={`/blog/${_id}`}>Read more</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
