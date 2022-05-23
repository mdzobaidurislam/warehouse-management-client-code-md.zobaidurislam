import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const SingleInventory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inventoryItem, setInventoryItem] = useState({});
  const [restock, setRestock] = useState(1);

  // get the inventory by id
  useEffect(() => {
    const getInventoryById = async () => {
      const url = `https://e-book-server.herokuapp.com/api/inventory/${id}`;
      const { data } = await axios.get(url);
      setInventoryItem(data);
    };
    getInventoryById();
  }, [id, inventoryItem, restock]);

  //   handleInventoryDelivered
  const handleInventoryDelivered = async (id) => {
    try {
      const updateData = {
        inventoryId: id,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const url = `https://e-book-server.herokuapp.com/api/update-inventory`;
      const { data } = await axios.put(url, updateData, config);
      if (data) {
        toast(data.msg);
      }
    } catch (error) {
      if (
        error.response.status === 404 ||
        error.response.status === 401 ||
        error.response.status === 403
      ) {
        toast(error.response.data.msg);
      }
    }
  };

  // handleRestock
  const handleRestock = async (e) => {
    e.preventDefault();

    try {
      if (isNaN(restock)) {
        toast("Restock must be a number!");
        return;
      }
      const restockData = {
        inventoryId: id,
        restock,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const url = `https://e-book-server.herokuapp.com/api/restock-inventory`;
      const { data } = await axios.put(url, restockData, config);
      if (data) {
        toast(data.msg);
        setRestock("");
      }
    } catch (error) {
      if (
        error.response.status === 404 ||
        error.response.status === 401 ||
        error.response.status === 403
      ) {
        toast(error.response.data.msg);
      }
    }
  };

  //handleManageInventories
  const handleManageInventories = () => {
    navigate("/admin/manage-inventory");
  };
  return (
    <div className="single_section ptb_80">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="single_thum">
              <img src={inventoryItem.image} className="img-fluid" alt="" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="single_content">
              <h1>{inventoryItem.name}</h1>

              <p className="quantity m-0">
                <strong>Availability in stock</strong> ({inventoryItem.quantity}
                )
              </p>
              <div className="single_price">
                <span>${inventoryItem.price}</span>
              </div>
              <p className="sold m-0">
                <strong>Sold </strong> ({inventoryItem.sold})
              </p>

              <div className="short_des">
                <h4>Description: </h4>
                <div
                  dangerouslySetInnerHTML={{
                    __html: inventoryItem.description,
                  }}
                ></div>
              </div>
              <div className="mb-5 d-flex mt-3">
                <button
                  type="button"
                  className="btn btn-primary custom_btn"
                  onClick={() => handleInventoryDelivered(inventoryItem._id)}
                >
                  Delivered
                </button>
              </div>
              <div>
                <form
                  action=""
                  onSubmit={handleRestock}
                  className="restock login_form d-flex align-items-center"
                >
                  <div className="form-group">
                    <input
                      type="text"
                      name="restock"
                      className="form_control"
                      value={restock}
                      onChange={(e) => setRestock(e.target.value)}
                      placeholder="Enter restock number"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary custom_btn">
                    Restock
                  </button>
                </form>
              </div>
            </div>
          </div>
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

export default SingleInventory;
