import React, { useState } from "react";
import "materialize-css";
import NavBar from "./Reusable/NavBar";
import Footer from "./Reusable/Footer";
import ReusableHeading from "./Reusable/ReusableHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { people } from "./helper/peopleHelper";

const Home = () => {
  const [values, setValues] = useState({
    name: "",
    error: "",
    success: "",
  });
  const { name } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    people({ name })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            error: "",
            success: true,
          });
          return toast("People saved..!", { type: "success" });
        }
      })
      .catch(() => {
        return toast("Not able to save..!", { type: "error" });
      });
  };

  const peopleForm = () => (
    <div className="container row center">
      <form className=" col s12">
        <div className="input-field row s4">
          <i className="material-icons prefix">account_circle</i>
          <input
            id="icon_prefix"
            onChange={handleChange("name")}
            type="text"
            className="validate"
            value={name}
          />
          <label for="icon_prefix">Name</label>
        </div>

        <div className="col s12">
          <button
            class="btn waves-effect waves-light"
            type="submit"
            name="action"
            onClick={onSubmit}
            style={{ marginTop: "60px", marginBottom: "50px" }}
          >
            Save
            <i class="material-icons right">send</i>
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <ToastContainer position="top-right" />
      <NavBar />
      <ReusableHeading title="Add Peoples" />
      {peopleForm()}
      <Footer />
    </div>
  );
};

export default Home;
