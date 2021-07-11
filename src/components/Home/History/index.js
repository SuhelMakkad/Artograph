import React, { useState, useEffect } from "react";
import { firestore } from "../../Fire";
import ProductsCart from "../Products/ProductsCard";

const History = () => {
  const [hisItemsId, setHisItemsId] = useState([]);
  const [hisItems, setHisItems] = useState([]);

  useEffect(() => {
    const hisItemsRef = firestore.collection("user");
    hisItemsRef
      .doc(localStorage.getItem("uid"))
      .get()
      .then((res) => setHisItemsId(res.data().historyItems));
  }, []);

  useEffect(() => {
    setHisItems([]);
    hisItemsId.map((hisItemId) => {
      firestore
        .collection("products")
        .doc(hisItemId)
        .get()
        .then((res) => {
          setHisItems((prev) => [...prev, res.data()]);
        });
    });
  }, [hisItemsId]);

  return (
    <>
      {hisItems.length ? (
        <div className="products-container">
          {hisItems.map((item, i) => (
            <ProductsCart
              key={hisItemsId[i]}
              photoURL={item.photoURL}
              price={item.price}
              title={item.title}
              id={hisItemsId[i]}
              showAddTocart={false}
            />
          ))}
        </div>
      ) : (
        <div className="empty-container">
          <p className="empty-text">You Havent Bought Anythin Yet!!</p>
        </div>
      )}
    </>
  );
};

export default History;
