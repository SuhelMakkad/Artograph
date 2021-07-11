import Home from "./Home";
import Login from "./Login";
import AddProduct from "./AddProduct";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/sign-in">
          <Login />
        </Route>

        <Route path="/add">
          <AddProduct />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
