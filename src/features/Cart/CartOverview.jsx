import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectTotalCartQty, selectTotalCartPrice } from "./CartSlice";

function CartOverview() {
  const totalCartQuantity = useSelector(selectTotalCartQty);
  const totalCartPrice = useSelector(selectTotalCartPrice);
  if (!totalCartQuantity) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 text-sm text-stone-200 md:text-base">
      <p className="text-tone-300 space-x-4 font-semibold uppercase">
        <span>{totalCartQuantity} pizzas</span>
        <span>${totalCartPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
