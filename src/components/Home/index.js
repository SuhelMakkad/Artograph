import Navbar from "./Navbar";
import Products from "./Products";
import History from "./History";
import Cart from "./Cart";
import Favorite from "./Favorite";
import ProductDetails from "./ProductDetails";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./style.css";

const Home = () => {
  return (
    <div className="main">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Products />
          </Route>

          <Route exact path="/history">
            <History />
          </Route>

          <Route exact path="/cart">
            <Cart />
          </Route>

          <Route path="/favorite">
            <Favorite />
          </Route>

          <Route path="/p/:id">
            <ProductDetails />
          </Route>
        </Switch>
      </Router>
      {/* <header className="App-header">hello</header>
      <h1>{products && products[0].description}</h1> */}
    </div>
  );
};

export default Home;
