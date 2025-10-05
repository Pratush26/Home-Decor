import { createBrowserRouter } from "react-router";
import App from "../App";
import NotFound from "../Pages/Not-Found";
import Home from "../Pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    hydrateFallbackElement:<p>Loading...</p>,
    errorElement: <NotFound />,
    children:[
      {
        index: true,
        Component: Home,
      }
    ]
  }
]);