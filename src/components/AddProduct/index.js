import React, { useState } from "react";
import { Redirect } from "react-router";
import { auth, firebase, firestore } from "../Fire";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import "./style.css";

const AddProducts = () => {
  const [uid, setUid] = useState(true);
  auth.onAuthStateChanged(() => {
    setUid(auth.currentUser && auth.currentUser.uid === "riM609nrEsYKDf2uXcekSH4hC672");
  });
  const [title, setTitle] = useState("");
  const [aName, setAName] = useState("");
  const [price, setPrice] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [medium, setMedium] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [overview, setOverview] = useState("");
  const [year, setYear] = useState("");

  const handleChange = (e, set) => {
    set(e.target.value);
  };

  const auto_grow = (element) => {
    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
  };

  const productRef = firestore.collection("products");

  const handleAddProductsSubmit = async (e) => {
    e.preventDefault();

    productRef.add({
      title,
      aName,
      price,
      photoURL,
      medium,
      dimensions,
      overview,
      year,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      id: uuid(),
    });

    setTitle("");
    setAName("");
    setPrice("");
    setPhotoURL("");
    setMedium("");
    setDimensions("");
    setOverview("");
    setYear("");
  };

  // const handleSubmit = async () => {
  //   values.name && setValues({ name: "" });
  // };

  return (
    <>
      {!uid && <Redirect to="/" />}
      <div className="outer-container">
        <Link to="/">
          <p className="add-header">Add items</p>
        </Link>
        <div className="container">
          <div className="add-container">
            <form onSubmit={(e) => handleAddProductsSubmit(e)}>
              <label className="lable" htmlFor="title">
                Title
              </label>
              <input
                required
                onChange={(e) => handleChange(e, setTitle)}
                className="input"
                type="text"
                id="title"
                placeholder="Enter Title"
                value={title}
              />

              <label className="lable" htmlFor="artist">
                Artist Name
              </label>
              <input
                required
                onChange={(e) => handleChange(e, setAName)}
                value={aName}
                className="input"
                type="text"
                id="artist"
                placeholder="Enter Artist Name"
              />

              <label className="lable" htmlFor="price">
                Price
              </label>
              <input
                required
                onChange={(e) => handleChange(e, setPrice)}
                value={price}
                className="input"
                type="number"
                id="price"
                placeholder="Enter Price In Rupess"
                autoComplete="off"
              />

              <label className="lable" htmlFor="photo">
                Photo URL
              </label>
              <input
                required
                onChange={(e) => handleChange(e, setPhotoURL)}
                value={photoURL}
                className="input"
                type="url"
                id="photo"
                placeholder="Enter Photo URL"
              />

              <label className="lable" htmlFor="medium">
                Medium
              </label>
              <input
                required
                onChange={(e) => handleChange(e, setMedium)}
                value={medium}
                className="input"
                type="text"
                id="medium"
                placeholder="Enter Photo Medium"
              />

              <label className="lable" htmlFor="dimensions">
                Dimensions
              </label>
              <input
                required
                onChange={(e) => handleChange(e, setDimensions)}
                value={dimensions}
                className="input"
                type="text"
                id="dimensions"
                placeholder="Enter Photo Dimensions"
              />

              <label className="lable" htmlFor="year">
                Year
              </label>
              <input
                required
                onChange={(e) => handleChange(e, setYear)}
                value={year}
                className="input"
                type="text"
                id="year"
                placeholder="Enter Year"
              />

              <label className="lable" htmlFor="overview">
                Overview
              </label>
              <textarea
                required
                onChange={(e) => handleChange(e, setOverview)}
                value={overview}
                className="input"
                type="text"
                id="overview"
                placeholder="Enter Discription"
                onInput={(e) => auto_grow(e.target)}
              />
              <div className="submit-button">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProducts;
