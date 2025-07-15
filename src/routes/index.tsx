import { createBrowserRouter } from "react-router-dom"
import Catalog from "@/pages/Catalog"
import Home from "@/pages/Home"
import Cart from "@/pages/Cart"
import Contact from "@/pages/Contact"
import Profile from "@/pages/Profile"
import ProductDetail from "@/pages/ProductDetail"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/catalog",
    element: <Catalog />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/product/:id",
    element: <ProductDetail />,
  }
])

export default router
