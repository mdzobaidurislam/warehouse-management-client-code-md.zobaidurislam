import axios from "axios";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsTrash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../Firebase/Firebase.init";
import useGetToken from "../../../Hook/useGetToken";
import Swal from "sweetalert2";
import LoadingBox from "../../../Share/LoadingBox";
import ReactPaginate from "react-paginate";
import usePagination from "../../../Hook/usePagination";

const MyItems = () => {
  const itemsPerPage = 5;
  const [items, setItems] = useState([]);
  const { currentItems, pageCount, handlePageClick } = usePagination(
    items,
    itemsPerPage
  );
  const navigate = useNavigate();
  const usertoken = useGetToken();
  const [user] = useAuthState(auth);
  const email = user?.email;

  // get my items
  useEffect(() => {
    const getItems = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usertoken}`,
        },
      };
      const url = `https://e-book-server.herokuapp.com/api/admin/items/${email}`;
      try {
        const { data } = await axios.get(url, config);
        setItems(data);
        console.log(data);
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 403) {
          toast(error.response.data.msg);
          signOut(auth);
          navigate("/login");
        }
      }
    };
    getItems();
  }, [email, navigate, usertoken]);

  // delete inventory
  const handleInventoryDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${usertoken}`,
            },
          };
          const { data } = await axios.delete(
            `https://e-book-server.herokuapp.com/api/inventory/${id}/${user.email}`,
            config
          );

          if (data) {
            const remaining = items.filter((item) => item._id !== id);
            setItems(remaining);
            Swal.fire("Deleted!", data.msg, "success");
          }
        } catch (error) {
          if (error.response.status === 401 || error.response.status === 403) {
            toast(error.response.data.msg);
            signOut(auth);
            navigate("/login");
          }
        }
      }
    });
  };
  if (!items.length > 0) {
    return <LoadingBox msg="Data Not Found!" />;
  }
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <h1>My Items</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="table-responsive">
            <div className="man_navbar">
              <Link to="/admin/manage-inventory" className="active">
                All My Items{" "}
                <span className="badge bg-primary">{items.length}</span>
              </Link>
              <Link to="/admin/add-inventory">Add new </Link>
              <Link to="/admin/manage-inventory">Active </Link>
              <Link to="/admin/manage-inventory">In Progress</Link>
            </div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Image</th>
                  <th scope="col">Short Text</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Sold</th>
                  <th scope="col">Supplier Name</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems &&
                  currentItems.map((item, i) => (
                    <tr key={item._id}>
                      <th>{i + 1}</th>
                      <th>{item.name}</th>
                      <th>{item.email}</th>
                      <td>
                        <img src={item.image} width="100px" alt={item.name} />
                      </td>
                      <td>{item.short_description}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>{item.sold}</td>
                      <td>{item.supplier_name}</td>
                      <td>
                        {item.status ? (
                          <span className="badge bg-success">Active</span>
                        ) : (
                          <span className="badge bg-danger">In Active</span>
                        )}
                      </td>
                      <td className="manage_btn">
                        <span>
                          <BsTrash
                            onClick={() => handleInventoryDelete(item._id)}
                            className="text-dander"
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* paginations */}
        <div className="col-lg-12">
          <ReactPaginate
            className="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            activeClassName="active"
            disabledLinkClassName="page-link"
            nextLinkClassName="page-link"
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={pageCount}
            previousLabel="< Previous"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </>
  );
};

export default MyItems;
