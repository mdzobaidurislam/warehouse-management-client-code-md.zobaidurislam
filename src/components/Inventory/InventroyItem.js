import React from "react";
import { useNavigate } from "react-router-dom";

const InventroyItem = (props) => {
  const {
    _id,
    name,
    short_description,
    price,
    image,
    supplier_name,
    quantity,
  } = props.inventory;
  const navigate = useNavigate();
  const handleInventory = (id) => {
    navigate(`/inventory/${id}`);
  };
  return (
    <div className="col-md-6 col-lg-4 ">
      <div className="item_warp shadow bg-white p-3">
        <div className="item_thum">
          <img src={image} alt="" className="img-fluid" />
          <div className="price">
            <span>${price}</span>
          </div>
        </div>
        <h3 className="mt-4 mb-2">{name}</h3>
        <div className="short_des">
          <p>{short_description}</p>
        </div>
        <div>
          <p className="quantity">
            <strong>Quantity:</strong> {quantity}
          </p>
          <p className="supler_name">
            <strong>Supler name:</strong> {supplier_name}
          </p>
          <div className="btn-group d-flex">
            <button
              type="button"
              className="btn btn-primary custom_btn"
              onClick={() => handleInventory(_id)}
            >
              Stock update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventroyItem;
