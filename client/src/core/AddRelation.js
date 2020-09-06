import React, { useState, useEffect } from "react";
import "materialize-css";
import NavBar from "./Reusable/NavBar";
import Footer from "./Reusable/Footer";
import ReusableHeading from "./Reusable/ReusableHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { relationship } from "./helper/relationshipHelper";

const AddRelation = () => {
  const [values, setValues] = useState({
    peopleFirst: "",
    peopleSecond: "",
    relationshipp: "",
    error: "",
    success: "",
  });

  const { peopleFirst, peopleSecond, relationshipp } = values;

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
    relationship({ peopleFirst, peopleSecond, relationship })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            peopleFirst: "",
            peopleSecond: "",
            relationshipp: "",
            error: "",
            success: true,
          });
          return toast("Relationship is saved......!", { type: "success" });
        }
      })
      .catch(() => {
        return toast("Not able to save..!", { type: "error" });
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
        <div class="input-field row s4">
          <i className="material-icons prefix"></i>
          <select value={relationshipp}>
            <option disabled selected>
              Choose your option
            </option>
            <option value="1">BROTHER</option>
            <option value="2">SISTER</option>
            <option value="3">FATHER</option>
            <option value="4">MOTHER</option>
            <option value="5">FRIEND</option>
            <option value="6">SON</option>
            <option value="7">DAUGHTER</option>
            <option value="8">GRANDFATHER</option>
            <option value="9">GRANDMOTHER</option>
          </select>
          <label>Select RelationShip Tag</label>
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
      <ReusableHeading title="Add Relations" />
      {relationshipForm()}
      <Footer />
    </div>
  );
};

export default AddRelation;
