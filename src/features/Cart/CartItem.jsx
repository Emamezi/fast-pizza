import Button from "../../UI/Button";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./CartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();
  // const cart = useSelector((state) => state.store.cart);

  function handleClearCart() {
    // dispatch(clearCart());
  }
  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="jus flex items-center justify-between sm:gap-3">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <Button onClick={handleClearCart} type="small">
          Delete
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
