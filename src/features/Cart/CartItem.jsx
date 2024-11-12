import Button from "../../UI/Button";
import { formatCurrency } from "../../utils/helpers";
import DeleteButton from "../../UI/DeleteButton";
import UpdateItemQuantity from "./UpdateItemQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  console.log(item);
  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="jus flex items-center justify-between sm:gap-3">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <UpdateItemQuantity pizzaId={pizzaId} currentQuantity={quantity} />
      <DeleteButton pizzaId={pizzaId} />
    </li>
  );
}

export default CartItem;
