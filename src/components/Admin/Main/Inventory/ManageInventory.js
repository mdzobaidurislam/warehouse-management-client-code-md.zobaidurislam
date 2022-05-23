import axios from "axios";
import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../Firebase/Firebase.init";
import useGetToken from "../../../Hook/useGetToken";
import useManageInventory from "../../../Hook/useManageInventory";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import usePagination from "../../../Hook/usePagination";
import LoadingBox from "../../../Share/LoadingBox";

const ManageInventory = () => {
  const itemsPerPage = 2;
  const { inventories, setInventory } = useManageInventory();
  const { currentItems, pageCount, handlePageClick } = usePagination(
    inventories,
    itemsPerPage
  );
  const navigate = useNavigate();
  const usertoken = useGetToken();

  const [user] = useAuthState(auth);

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
            const remaining = inventories.filter((item) => item._id !== id);
            setInventory(remaining);
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
  // handle inventory edit
  const handleInventoryUpdate = (id) => {
    navigate(`/admin/edit-inventory/${id}`);
  };

  if (!inventories.length > 0) {
    return <LoadingBox msg="Data Not Found!!" />;
  }
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <h1>Manage inventory</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="table-responsive">
            <div className="man_navbar">
              <Link to="/admin/manage-inventory" className="active">
                All Inventory{" "}
                <span className="badge bg-primary">{inventories.length}</span>
              </Link>
              <Link to="/admin/add-inventory">Add new </Link>
              <Link to="/admin/my-items">My Items </Link>
              <Link to="/admin/manage-inventory">Active </Link>
              <Link to="/admin/manage-inventory">In Progress</Link>
            </div>
            <table className="table table-hover ">
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
                          <AiOutlineEdit
                            onClick={() => handleInventoryUpdate(item._id)}
                            className="text-info"
                          />
                        </span>
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

export default ManageInventory;
