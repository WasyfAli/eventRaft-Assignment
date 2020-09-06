import React, { useState, useEffect } from "react";
import "materialize-css";
import NavBar from "./Reusable/NavBar";
import Footer from "./Reusable/Footer";
import ReusableHeading from "./Reusable/ReusableHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getrelationship } from "./helper/relationshipHelper";

const GetRelationship = () => {
  const [values, setValues] = useState({
    peopleFirst: "",
    peopleSecond: "",
    error: "",
    success: "",
  });

  const { peopleFirst, peopleSecond } = values;

  useEffect(() => {
    const M = window.M;
    M.AutoInit();
  }, []);
  //   const optionItems = values.map((val, index) => (
  //     <option key={index}>{val.name}</option>
  //   ));

  const handleChange = (peopleFirst) => (event) => {
    setValues({ ...values, error: false, [peopleFirst]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    getrelationship({ peopleFirst, peopleSecond })
      .then((data) => {
        // console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            peopleFirst: "",
            peopleSecond: "",
            error: "",
            success: true,
          });

          return toast(data.data, {
            position: "top-center",
            autoClose: 15000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch(() => {
        return toast("Not able to get data..!", { type: "error" });
      });
  };

  const relationshipForm = () => (
    <div className="container row center">
      <form className=" col s12">
        <div className="input-field row s4">
          <i className="material-icons prefix">account_circle</i>
          <input
            id="icon_prefix"
            onChange={handleChange("peopleFirst")}
            type="text"
            className="validate"
            value={peopleFirst}
          />
          <label for="icon_prefix">First People Name</label>
        </div>

        <div className="input-field row s4">
          <i className="material-icons prefix">account_circle</i>
          <input
            id="icon_prefix"
            onChange={handleChange("peopleSecond")}
            type="text"
            className="validate"
            value={peopleSecond}
          />
          <label for="icon_prefix">Second People Name</label>
        </div>

        <div className="col s12">
          <button
            class="btn waves-effect waves-light"
            type="submit"
            name="action"
            onClick={onSubmit}
            style={{ marginTop: "60px", marginBottom: "50px" }}
          >
            Get
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
      <ReusableHeading title="Get Relations" />
      {relationshipForm()}
      <Footer />
    </div>
  );
};

export default GetRelationship;
