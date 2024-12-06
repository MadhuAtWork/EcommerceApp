import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./ReduxComponent/slices/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="col-md-3 col-sm-6 mb-4">
      {" "}
      <div className="product-card">
        <img src={product.image} alt={product.title} className="img-fluid" />
        <h3>{product.title}</h3>
        <p>${product.price}</p>
        <button
          className="btn btn-primary"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
