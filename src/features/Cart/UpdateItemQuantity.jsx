import { useDispatch, useSelector } from "react-redux";
import Button from "../../UI/Button";
import { decreaseItemQty, increaseItemQty } from "./CartSlice";

function UpdateItemQuantity({ pizzaId }) {
  const quantity = useSelector(
    (state) =>
      state.cart.cart.find((item) => item.pizzaId === pizzaId).quantity,
  );
  const dispatch = useDispatch();

  return (
    <div className="rounded-md bg-stone-200 px-2 py-1">
      <Button onClick={() => dispatch(decreaseItemQty(pizzaId))}>&#43;</Button>
      <span> {quantity}</span>
      <Button onClick={() => dispatch(increaseItemQty(pizzaId))}>
        &#8722;
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
