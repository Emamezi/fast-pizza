import { useState } from "react";
import { createOrder } from "../../services/apiRestaurant";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import Button from "../../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, selectCart, selectTotalCartPrice } from "../Cart/CartSlice";
import store from "../../store.js";
import { formatCurrency } from "../../utils/helpers";
import EmptyCart from "../Cart/EmptyCart";
import { fetchAddress } from "../User/userSlice.js";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const dispatch = useDispatch();
  const {
    username,
    address,
    position,
    error: adressError,
    status: adressStatus,
  } = useSelector((state) => state.user);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const cart = useSelector(selectCart);
  const formErrors = useActionData();

  const totalCartPrice = useSelector(selectTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const isLoadingAddress = adressStatus === "loading";

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Lets go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input grow"
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-600">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              disabled={isLoadingAddress}
              defaultValue={address}
              name="address"
              required
              className="input w-full"
            />
            {adressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-600">
                {adressError}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[3px] z-50 sm:right-[5px] sm:top-[5px]">
              <Button
                type="small"
                disabled={isLoadingAddress}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-300 focus:ring-offset-2"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-bold">
            Want to yo give your order priority?
          </label>
        </div>

        <div className="">
          {/* Trick to pass cart into the submitted form data
          use stringify to convert cart object to string to be sent to the server
           */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)}></input>
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.longitude} ${position.latitude}`
                : ""
            }
          ></input>
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting || isLoadingAddress
              ? " Placing Order.."
              : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);

  //modify order to include cart object and priority selection option
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    //on===on: true || off===on :false
    priority: data.priority === "true",
  };
  console.log(order);

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please provide a valid number so we can contact you";
  if (Object.keys(errors).length > 0) return errors;

  // if now erros then go ahread and create order
  const newOrder = await createOrder(order);

  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
