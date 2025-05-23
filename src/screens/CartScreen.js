import { useEffect } from "react";
import Header from "./../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removefromcart } from "../Redux/Action/CartActions";
import { useParams ,useLocation,useNavigate} from 'react-router-dom'; 

const CartScreen = () => {
  window.scrollTo(0, 0);
 const { search } = useLocation();
 const {id} = useParams();

  const dispatch = useDispatch();
  const productId = id;

  const navigate = useNavigate();

  //const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const qty = search ? Number(search.split("=")[1]) : 1;


  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

 

  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const checkOutHandler = () => {
    navigate("/shipping");
  };

  const printHqndler = () => {
    window.print();
  };

  const removeFromCartHandler = (id) => {
    // to do
    dispatch(removefromcart(id));
  };

  return (
    <>
      <Header />

      {/* Cart */}
      <div className="container">
        <p> {`ID AFFICHe Quantite :${qty}`} </p>
        {cartItems.length === 0 ? (
          <div className=" alert alert-info text-center mt-3">
            Your cart is empty
            <Link
              className="btn btn-success mx-5 px-5 py-3"
              to="/"
              style={{
                fontSize: "12px",
              }}
            >
              SHOPPING NOW
            </Link>
          </div>
        ) : (
          <>
            <div className=" alert alert-info text-center mt-3">
              Total Cart Products
              <Link className="text-success mx-2" to="/cart">
                ({cartItems.length})
              </Link>
            </div>
            {/* cartiterm */}

            {cartItems.map((item) => (
              <div className="cart-iterm row">
                <div
                  onClick={() => removeFromCartHandler(item.product)}
                  className="remove-button d-flex justify-content-center align-items-center"
                >
                  <i className="fas fa-times"></i>
                </div>
                <>{console.log(item.product)}</>
                <div className="cart-image col-md-3">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-text col-md-5 d-flex align-items-center">
                  <Link to={`/products/${item.product}`}>
                    <h4>{item.name} </h4>
                  </Link>
                </div>
                <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                  <h6>QUANTITY</h6>
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                  <h6>price</h6>
                  <h4> {item.price} </h4>
                </div>
              </div>
            ))}

            {/* End of cart iterms */}
            <div className="total">
              <span className="sub">total:</span>
              <span className="total-price">${total}</span>
            </div>
            <hr />

            <div className="cart-buttons d-flex align-items-center row">
              <Link to="/" className="col-md-6 ">
                <button>Continue To Shopping</button>
              </Link>

              <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                <button onClick={checkOutHandler}> Checkout </button>
              </div>
            </div>

            <div className="cart-buttons d-flex align-items-center row">
              <Link to="/" className="col-md-6 ">
                <button onClick={printHqndler}>PRINT</button>
              </Link>
            </div>
          </>
        )}

        {/* */}
      </div>
    </>
  );
};

export default CartScreen;
