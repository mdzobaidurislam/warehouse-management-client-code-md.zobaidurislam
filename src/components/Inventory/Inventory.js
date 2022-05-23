import React from "react";
import { useNavigate } from "react-router-dom";
import useInventory from "../Hook/useInventory";
import LoadingBox from "../Share/LoadingBox";
import "./Inventory.css";
import InventroyItem from "./InventroyItem";
const Inventory = ({ data }) => {
  const navigate = useNavigate();
  const { inventories } = useInventory();
  const handleManageInventories = () => {
    navigate("/admin/manage-inventory");
  };
  if (!inventories.length > 0) {
    return <LoadingBox msg="Data Not Found!" />;
  }
  return (
    <div className="inventory_section ptb_80">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h1 className="heading_title">
              Latest<span> Inventory </span> Featured
            </h1>
          </div>
        </div>
        <div className="row">
          {inventories &&
            inventories
              .slice(0, data)
              .map((item) => <InventroyItem key={item._id} inventory={item} />)}
        </div>
        <div className="row">
          <div className="colg-lg-12 mt-5 text-center">
            <button
              type="button"
              className="btn btn-primary custom_btn"
              onClick={handleManageInventories}
            >
              Manage Inventories
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
