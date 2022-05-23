import axios from "axios";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../Firebase/Firebase.init";
import useGetToken from "../../../Hook/useGetToken";
import LoadingBox from "../../../Share/LoadingBox";
const EditInventory = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const usertoken = useGetToken();
  const [user] = useAuthState(auth);

  const { id } = useParams();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [short_description, setShort_description] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [supplier_name, setSupplier_name] = useState("");

  // edit inventory by id get data from database
  useEffect(() => {
    const getInventoryById = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usertoken}`,
          },
        };
        const { data } = await axios.get(
          `https://e-book-server.herokuapp.com/api/edit-inventory/${id}/${user.email}`,
          config
        );
        setLoading(true);
        setName(data.name);
        setImage(data.image);
        setShort_description(data.short_description);
        setDescription(data.description);
        setPrice(data.price);
        setQuantity(data.quantity);
        setSupplier_name(data.supplier_name);
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 403) {
          toast(error.response.data.msg);
          signOut(auth);
          navigate("/login");
        }
      }
    };
    getInventoryById();
  }, [id, navigate, usertoken, user.email]);

  // update inventory by id
  const handleUpdateInventory = async (event) => {
    event.preventDefault();
    const dataUpdate = {
      name,
      image,
      short_description,
      description,
      price,
      quantity,
      supplier_name,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${usertoken}`,
      },
    };
    try {
      const { data } = await axios.put(
        `https://e-book-server.herokuapp.com/api/inventory/${id}/${user?.email}`,
        dataUpdate,
        config
      );
      if (data) {
        toast(data.msg);
      }
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        toast(error.response.data.msg);
        signOut(auth);
        navigate("/login");
      }
    }
  };
  if (!loading) {
    return <LoadingBox msg="Data Not Found!!" />;
  }
  return (
    <div className="">
      <div className="row justify-content-center">
        <div className="col-lg-12  p-4">
          <div className="d-flex justify-content-between ">
            <h1 className="mb-3 fw-bold">Update Inventory</h1>
            <div>
              <Link className="btn custom_btn " to="/admin/manage-inventory">
                Go Back
              </Link>
            </div>
          </div>

          <form
            action=""
            onSubmit={handleUpdateInventory}
            className="input_form"
          >
            <div className="row">
              <div className="col-lg-12"></div>
              <div className="col-lg-4">
                <Form.Group className="mb-3" controlId="brand">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter nme"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-4">
                <Form.Group className="mb-3" controlId="brand">
                  <Form.Label>Supplier name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter supplier name"
                    name="supplier_name"
                    value={supplier_name}
                    onChange={(e) => setSupplier_name(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-4">
                <Form.Group className="mb-3" controlId="brand">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter nme"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-4">
                <Form.Group className="mb-3" controlId="brand">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter supplier name"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-8">
                <Form.Group className="mb-3" controlId="brand">
                  <Form.Label>Image url</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter image url"
                    name="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-6">
                <Form.Group className="mb-3" controlId="brand">
                  <Form.Label>Short Description</Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    placeholder="Enter short description"
                    name="short_description"
                    value={short_description}
                    onChange={(e) => setShort_description(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-6">
                <Form.Group className="mb-3" controlId="brand">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    placeholder="Enter description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-12">
                <button className="btn btn-primary custom_btn" type="submit">
                  Update Inventory
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditInventory;
