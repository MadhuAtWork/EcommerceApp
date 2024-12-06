import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateQuantity,
  removeFromCart,
} from "./ReduxComponent/slices/cartSlice";

function Cart() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Your Shopping Cart</h2>

      <button
        className="btn btn-primary mb-4"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasScrolling"
        aria-controls="offcanvasScrolling"
      >
        View Cart
      </button>

      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabindex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasScrollingLabel">Shopping Cart</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <div className="row">
                {cart.map((item) => (
                  <div key={item.id} className="col-md-12 col-lg-12 mb-12">
                    <div className="card shadow-sm border-light rounded">
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="img-fluid rounded-start"
                            style={{ objectFit: "cover", height: "150px" }}
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">
                              ${item.price} x {item.quantity}
                            </p>
                            <div className="d-flex justify-content-between align-items-center">
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                  dispatch(
                                    updateQuantity({
                                      id: item.id,
                                      quantity: parseInt(e.target.value),
                                    })
                                  )
                                }
                                className="form-control w-25"
                              />
                              <button
                                className="btn btn-danger btn-sm ms-2"
                                onClick={() =>
                                  dispatch(removeFromCart(item.id))
                                }
                              >
                                Remove
                              </button>
                            </div>
                            <p className="mt-2">
                              <strong>
                                Total: ${item.price * item.quantity}
                              </strong>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-between mt-4">
                <h4>Total: ${getCartTotal()}</h4>
                <button className="btn btn-success">Proceed to Checkout</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
