import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./UI/Home";
import Menu from "./features/Menu/Menu";
import Order, { loader as orderLoader } from "./features/Order/Order";
import Cart from "./features/Cart/Cart";
import CreateOrder, {
  action as createOrderAction,
} from "./features/Order/CreateOrder";
import AppLayout from "./UI/AppLayout";
import { menuLoader } from "./features/Menu/Menu";
import { action as updateOrderAction } from "./features/Order/UpdateOrder";
import Error from "./UI/Error";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        loader: menuLoader,
        element: <Menu />,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        loader: orderLoader,
        element: <Order />,
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },
]);
function App() {
  const x = 23;
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
