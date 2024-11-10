import { createSelector, createSlice } from "@reduxjs/toolkit";
createSelector;

const initialState = {
  cart: [],
  // cart: [
  // {
  //   pizzaId: 12,
  //   name: "Mediteranian",
  //   quantity: 2,
  //   price: 16,
  //   totalPrice: 32,
  // },
  // ],
  //
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      // payload = newItem object
      state.cart.push(action.payload);
    },
    deleteCartItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQty(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.price;
    },
    decreaseItemQty(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.price;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  deleteCartItem,
  increaseItemQty,
  decreaseItemQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

const selectCartItems = (state) => state.cart.cart;
export const selectCart = createSelector(
  [(state) => state.cart],
  (cart) => cart.cart,

  // (cart) => cart,
);

export const selectTotalCartQty = createSelector([selectCartItems], (cart) =>
  cart.reduce((sum, item) => sum + item.quantity, 0),
);

export const selectTotalCartPrice = createSelector([selectCartItems], (cart) =>
  cart.reduce((sum, item) => sum + item.totalPrice, 0),
);
export const selectCurrentQuantityById = (id) =>
  createSelector(
    [selectCartItems],
    (cart) => cart.find((item) => item.pizzaId === id)?.quantity ?? 0,
  );

export const selectItemQuantity = (id) =>
  createSelector(
    [selectCartItems],
    (cart) => cart.find((item) => item.pizzaId === id).quantity,
  );
