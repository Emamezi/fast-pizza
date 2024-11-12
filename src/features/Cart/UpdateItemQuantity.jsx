import { useDispatch, useSelector } from "react-redux";
import Button from "../../UI/Button";
import { decreaseItemQty, increaseItemQty, selectCart } from "./CartSlice";

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button type="round" onClick={() => dispatch(decreaseItemQty(pizzaId))}>
        &#8722;
      </Button>
      <span className="text-sm font-medium"> {currentQuantity}</span>
      <Button type="round" onClick={() => dispatch(increaseItemQty(pizzaId))}>
        &#43;
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
