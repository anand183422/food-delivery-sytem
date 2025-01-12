import { useSelector, useDispatch } from "react-redux";
import ItemList from "./ItemList";
import { clearItem } from "../utils/CartSlice";
import { useState } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.item);

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState(null);

  let total = 0;
  cartItems.forEach((item) => {
    total += item.card.info.price
      ? item.card.info.price / 100
      : item.card.info.defaultPrice / 100;
  });

  const handleClearCart = () => {
    dispatch(clearItem());
    setOrderConfirmed(false); // Reset the order confirmation state
    setDeliveryTime(null); // Reset delivery time
  };

  const handleConfirmOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Add items to confirm an order.");
      return;
    }

    // Mock order confirmation
    setOrderConfirmed(true);

    // Set a mock delivery time (e.g., 30 minutes from now)
    const deliveryEstimate = new Date();
    deliveryEstimate.setMinutes(deliveryEstimate.getMinutes() + 30);
    setDeliveryTime(deliveryEstimate.toLocaleTimeString());
  };

  return (
    <>
      <div className="w-9/12 mx-auto flex gap-10">
        <div className="text-center text-xl">Cart</div>
        <button
          className="bg-gray-300 m-2 p-2 rounded-lg"
          onClick={handleClearCart}
        >
          Clear All
        </button>
      </div>
      <div className="w-6/12 m-auto">
        {cartItems.length === 0 ? (
          <h3>Cart is empty. Please add items to the cart from Home.</h3>
        ) : (
          <>
            <ItemList items={cartItems} data={true} />
            <br />
            <h3>Total price: Rs {total}</h3>
            {!orderConfirmed && (
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4"
                onClick={handleConfirmOrder}
              >
                Confirm Order
              </button>
            )}
          </>
        )}

        {orderConfirmed && (
          <div className="mt-6 p-4 bg-gray-100 border rounded-lg">
            <h3 className="text-lg font-semibold">Order Confirmed!</h3>
            <p>Your order has been successfully placed.</p>
            <p>Estimated Delivery Time: <strong>{deliveryTime}</strong></p>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
