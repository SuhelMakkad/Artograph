import React, { useEffect, useState } from "react";
import { firestore } from "../../Fire";
import ProductsCard from "../Products/ProductsCard";
import "./style.css";

const Favorite = () => {
  const [favItemsId, setFavItemsId] = useState([]);
  const [favItems, setFavItems] = useState([]);

  useEffect(() => {
    const favIteRef = firestore.collection("user");
    favIteRef
      .doc(localStorage.getItem("uid"))
      .get()
      .then((res) => {
        setFavItemsId(res.data().favItems);
      });
  }, []);

  useEffect(() => {
    const array = [];
    favItemsId.map((favItemId) => {
      firestore
        .collection("products")
        .doc(favItemId)
        .get()
        .then((res) => {
          array.push(res.data());
          setFavItems((prev) => [...prev, res.data()]);
        });
    });
  }, [favItemsId]);

  return (
    <>
      {favItems.length ? (
        <>
          <div className="products-container">
            {favItems &&
              favItems.map((product, i) => (
                <ProductsCard
                  key={favItemsId[i]}
                  photoURL={product.photoURL}
                  price={product.price}
                  title={product.title}
                  showAddTocart={false}
                  id={favItemsId[i]}
                />
              ))}
          </div>
        </>
      ) : (
        <div className="empty-container">
          <p className="empty-text">No Favorite Items...</p>
        </div>
      )}
    </>
  );
};

export default Favorite;
