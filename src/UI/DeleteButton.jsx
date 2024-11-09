import { useDispatch } from "react-redux";
import Button from "./Button";
import { deleteCartItem } from "../features/Cart/CartSlice";

function DeleteButton({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <div>
      <Button onClick={() => dispatch(deleteCartItem(pizzaId))} type="small">
        Delete
      </Button>
    </div>
  );
}

export default DeleteButton;
