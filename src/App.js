import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Components/Homepage/Home";
import Introduce from "./Components/Introduce/Introduce";
import News from "./Components/News/Index";
import ProductDetail from "./Components/Homepage/Product/ProductDetail/ProductDetail";
import UserUrl from "./Components/User/UserUrl";
import Cart from "./Components/Homepage/Product/Cart/Cart";
import FilterUrl from "./Components/Filter/FilterUrl";
import Payment from "./Components/Homepage/Product/Cart/Payment";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import ScrollToTop from "./Components/ReactRoute/ScrollToTop";
import ChangePass from "./Components/Account/ChangePass";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
        <ScrollToTop></ScrollToTop>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/dang-ky" component={Register}></Route>
          <Route path="/dang-nhap" component={Login}></Route>
          <Route path="/doi-mat-khau" component={ChangePass}></Route>
          <Route path="/gioi-thieu" component={Introduce}></Route>
          <Route path="/tin-tuc" component={News}></Route>
          <Route path="/gio-hang" component={Cart}></Route>
          <Route path="/thanh-toan" component={Payment}></Route>
          <Route path="/thong-tin-ca-nhan" component={UserUrl}></Route>
          <Route path="/loc" component={FilterUrl}></Route>
          <Route path="/san-pham/:productId" component={ProductDetail}></Route>
        </Switch>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
