import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, firestore } from "../../../Fire";
import "./styles.css";

const CheckOut = ({ setShowCheckOut, total, items }) => {
  const [received, setReceived] = useState(false);
  const history = useHistory();

  const handleOrderConfirm = async () => {
    if (!auth.currentUser) {
      return;
    }
    let cartItems, historyItems;
    const cartRef = firestore.collection("user");
    await cartRef
      .doc(auth.currentUser.uid)
      .get()
      .then((doc) => {
        cartItems = doc.data().cartItems;
        historyItems = doc.data().historyItems;
      });
    const all = [...historyItems, ...cartItems];
    historyItems = all.filter((o, index) => all.indexOf(o) === index);

    // !items.includes(id) && items.push(id);
    cartRef.doc(auth.currentUser.uid).update({ historyItems });
    cartRef.doc(auth.currentUser.uid).update({ cartItems: [] });

    setReceived(true);
    setTimeout(() => {
      history.push("/");
    }, 500);
  };

  const closeBox = () => {
    setShowCheckOut(false);
  };

  const handleOutsideCilck = (e) => {
    e.target.className === "checkout-modal-wrapper" && closeBox();
  };

  return (
    <div className="checkout-modal-wrapper" onClick={handleOutsideCilck}>
      <div className="modal-dialog">
        <p className="checkout-total-title">Totla</p>
        <p className="checkout-total">
          <span>₹</span> {total.toLocaleString("INR")}
        </p>
        <div className="checkout-confirm-wrapper">
          {received ? (
            <button className="checkout-btn checkout-received" onClick={closeBox}>
              order received
            </button>
          ) : (
            <button className="checkout-btn checkout-confirm" onClick={handleOrderConfirm}>
              confirm
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
