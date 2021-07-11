import React, { useState, useEffect } from "react";
import { firestore } from "../../Fire";
import CartCard from "./CartCard";
import CheckOut from "./CheckOut";
import "./style.css";

const Cart = () => {
  const [itemsId, setItemsId] = useState([]);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [updateItems, setUpdateItems] = useState(false);

  const handleCheckOut = () => {
    setShowCheckOut(true);
  };

  useEffect(async () => {
    let array = [];
    let count = 0;
    itemsId.map((itemId) => {
      firestore
        .collection("products")
        .doc(itemId)
        .get()
        .then((res) => {
          const products = res.data();
          array.push(products);
          count = count + parseInt(products?.price);
          setItems(array);
          setTotal(count);
        });
    });
  }, [itemsId]);

  useEffect(() => {
    firestore
      .collection("user")
      .doc(localStorage.getItem("uid"))
      .get()
      .then((res) => {
        setItemsId(res.data().cartItems);
      });
  }, [updateItems]);

  return (
    <>
      {itemsId.length ? (
        <>
          {showCheckOut && <CheckOut key="1" setShowCheckOut={setShowCheckOut} total={total} items={items} />}
          <div className="cart-outer-container">
            {items.map((item, i) => (
              <CartCard
                key={item.id}
                photoURL={item.photoURL}
                title={item.title}
                author={item.aName}
                aName={item.aName}
                price={item.price}
                id={itemsId[i]}
                setUpdateItems={setUpdateItems}
              />
            ))}
            <div className="check-out-container">
              <div className="total-container">
                <div className="total-text">Total Amount To Pay</div>
                <div className="total">₹ {total}</div>
              </div>
              <button className="check-out" onClick={handleCheckOut}>
                Check Out
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="empty-container">
          <p className="empty-text"> Its empty</p>
        </div>
      )}
    </>
  );
};
export default Cart;
