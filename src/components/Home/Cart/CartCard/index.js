import { Link } from "react-router-dom";
import { firestore } from "../../../Fire";
import "./style.css";

const CartCard = ({ photoURL, title, price, id, author, setUpdateItems }) => {
  const deleteSvg = (
    <svg width="24px" height="24px" viewBox="0 0 24 24">
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
    </svg>
  );

  const removeItem = async () => {
    const res1 = await firestore.collection("user").doc(localStorage.getItem("uid")).get();
    const { cartItems } = res1.data();
    const index = cartItems.indexOf(id);

    if (index !== -1) {
      cartItems.splice(index, 1);
    } else {
      console.log("error", { cartItems, id });
    }
    firestore.collection("user").doc(localStorage.getItem("uid")).update({ cartItems });
    setUpdateItems((prev) => !prev);
  };

  return (
    <>
      <div className="cart-container">
        <div className="delete-svg" onClick={removeItem}>
          {deleteSvg}
        </div>
        <Link to={`/p/${id}`} key="1">
          <img alt={title} className="cart-image" src={photoURL} />
        </Link>
        <div className="cart-details">
          <Link to={`/p/${id}`} key="2">
            <p className="cart-title">{title}</p>
            <p className="cart-author">- {author}</p>
          </Link>
          <p className="cart-price">₹{price}</p>
        </div>
      </div>
      <hr className="cart-hr" />
    </>
  );
};

export default CartCard;
