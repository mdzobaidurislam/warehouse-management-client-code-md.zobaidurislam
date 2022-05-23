import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/From/Login";
import SignUp from "./components/From/SignUp";
import SingleInventory from "./components/Inventory/SingleInventory";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Admin/Layout/Layout";
import ManageInventory from "./components/Admin/Main/Inventory/ManageInventory";
import EditInventory from "./components/Admin/Main/Inventory/EditInventory";
import AddInventory from "./components/Admin/Main/Inventory/AddInventory";
import MyItems from "./components/Admin/Main/MyItem/MyItems";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import NotFound from "./components/NotFound/NotFound";
import Blog from "./components/Blog/Blog";
import SingleBlog from "./components/Blog/SingleBlog";
import Inventory from "./components/Inventory/Inventory";
import Contact from "./components/Contact/Contact";
import { useEffect, useState } from "react";
import LoadingBox from "./components/Share/LoadingBox";

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setInterval(() => {
      setLoading(true);
    }, 2000);
  }, [loading]);

  if (!loading) {
    return <LoadingBox />;
  }
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="blog" element={<Blog />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="blog/:id" element={<SingleBlog />} />
        <Route path="contact" element={<Contact />} />

        <Route
          path="/inventory/:id"
          element={
            <RequireAuth>
              <SingleInventory />
            </RequireAuth>
          }
        />
        <Route
          path="admin"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route path="manage-inventory" element={<ManageInventory />} />
          <Route path="add-inventory" element={<AddInventory />} />
          <Route path="edit-inventory/:id" element={<EditInventory />} />

          <Route path="my-items" element={<MyItems />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
