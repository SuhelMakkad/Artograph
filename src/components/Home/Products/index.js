import React, { useState, useEffect } from "react";
import { firestore } from "../../Fire";
import ProductsCard from "./ProductsCard";
import "./style.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productsId, setProductsId] = useState([]);

  useEffect(async () => {
    const productsRef = firestore.collection("products");
    const res1 = await productsRef.get();
    const allItemsId = res1.docs.map((doc) => doc.id);

    if (!localStorage.getItem("uid")) {
      setProductsId(allItemsId);
      return;
    }

    const userRef = firestore.collection("user");
    const res2 = await userRef.doc(localStorage.getItem("uid")).get();
    const historyItemsId = res2.data().historyItems;
    setProductsId(allItemsId.filter((itemId) => !historyItemsId.includes(itemId)));
  }, []);

  useEffect(() => {
    const productsRef = firestore.collection("products");
    setProducts([]);
    productsId.forEach((productId) => {
      productsRef
        .doc(productId)
        .get()
        .then((res) => {
          const obj = res.data();
          obj._id = productId;
          setProducts((prev) => [...prev, obj]);
        });
    });
  }, [productsId]);
  return (
    <>
      {products.length ? (
        <div className="products-container">
          {products &&
            products.map((product, index) => (
              <ProductsCard
                key={product.id}
                photoURL={product.photoURL}
                price={product.price}
                title={product.title}
                id={product._id}
              />
            ))}
        </div>
      ) : (
        <div className="empty-container">
          <p className="empty-text">Nothing To Show!</p>
        </div>
      )}
    </>
  );
};

export default Products;
