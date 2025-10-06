import { createBrowserRouter } from "react-router";
import App from "../App";
import NotFound from "../Pages/Not-Found";
import Home from "../Pages/Home";
import ProductDetails from "../Pages/Details";
import WishListPage from "../Pages/wishList";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    hydrateFallbackElement:<p>Loading...</p>,
    errorElement: <NotFound />,
    children:[
      {
        index: true,
        errorElement: <NotFound />,
        Component: Home
      },
      {
        path: "/details",
        Component: ProductDetails
      },
      {
        path: "/wishlist",
        Component: WishListPage
      },
    ]
  }
]);