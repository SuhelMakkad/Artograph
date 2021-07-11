import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, firestore } from "../../../Fire";
import Message from "../../Message";
import "./style.css";

const ProductsCart = ({ photoURL, price, title, id, showAddTocart = true }) => {
  const [showError, setShowError] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const arrayRemove = (arr, value) => {
    const index = arr.indexOf(value);
    index > -1 && arr.splice(index, 1);
    return arr;
  };

  const handleAddItem = async () => {
    if (!auth.currentUser) {
      setShowError(true);
      return;
    }
    const cartRef = firestore.collection("user");
    let items = [];
    await cartRef
      .doc(auth.currentUser.uid)
      .get()
      .then((doc) => (items = doc.data().cartItems));

    !items.includes(id) && items.push(id);
    cartRef.doc(auth.currentUser.uid).update({ cartItems: items });
    setShowDone(true);
  };

  const addToFavorites = async () => {
    if (!auth.currentUser) {
      setShowError(true);
      return;
    }
    const cartRef = firestore.collection("user");
    let items = [];
    await cartRef
      .doc(auth.currentUser.uid)
      .get()
      .then((doc) => (items = doc.data().favItems));
    items.includes(id) ? arrayRemove(items, id) : items.push(id);
    cartRef.doc(auth.currentUser.uid).update({ favItems: items });
    items.includes(id) ? setIsLiked(true) : setIsLiked(false);
  };

  const likeSvg = (
    <svg onClick={addToFavorites} className="like-svg" width="28px" height="28px" viewBox="0 0 24 24">
      <path
        className={isLiked ? "liked" : "not-liked"}
        d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path>
    </svg>
  );

  useEffect(() => {
    const cartRef = firestore.collection("user");
    localStorage.getItem("uid") &&
      cartRef
        .doc(localStorage.getItem("uid"))
        .get()
        .then((res) => (res.data().favItems.includes(id) ? setIsLiked(true) : setIsLiked(false)));
  }, []);

  return (
    <>
      {showError && <Message type="error" msg="Please First Sign In" setShowMessage={setShowError} />}
      {showDone && <Message msg="Added!" setShowMessage={setShowDone} />}
      <div className="products-outer-container">
        <Link to={`/p/${id}`} className="display-image-wrapper">
          <img className="display-image" src={photoURL} />
          <p className="title">{title}</p>
        </Link>
        <div className="button-price">
          <p className="price">₹{price}</p>
          {likeSvg}
          {showAddTocart && (
            <div className="add-svg">
              <button onClick={handleAddItem} className="buy-button">
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsCart;
