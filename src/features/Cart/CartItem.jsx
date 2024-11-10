import Button from "../../UI/Button";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, deleteCartItem, selectItemQuantity } from "./CartSlice";
import DeleteButton from "../../UI/DeleteButton";
import UpdateItemQuantity from "./UpdateItemQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();
  const ItemQuantity = useSelector(selectItemQuantity(pizzaId));
  if (ItemQuantity === 0) return null;
  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="jus flex items-center justify-between sm:gap-3">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <UpdateItemQuantity pizzaId={pizzaId} />
      <DeleteButton pizzaId={pizzaId} />
    </li>
  );
}

export default CartItem;
