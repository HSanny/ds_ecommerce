import React, { PropsWithChildren } from 'react'
import { createBrowserRouter, BrowserRouter, Routes, Route, RouterProvider, Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ScrollPage from './components/common/ScrollPage';
import NaviBar from './components/NaviBar';
import Footer from './components/Footer';
import ProductsPage from './pages/ProductsPage';
import SingleProduct from './components/SingleProduct';
import Login from './pages/Login';
import SignUp from './pages/Signup';

function App() {
  const AppRoutes = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          path: '/',
          element: <HomePage />
        },
        {
          path: '/products',
          element: <ProductsPage />,
          //     children: [
          //       {
          //         path: ':slug',
          //         element: <SingleProduct />,
          //       }
          // ]
        },
        {
          path: `/products/:slug`,
          element: <SingleProduct />
        },
        {
          path: `/shipment`,
          element: <></>
        },
        {
          path: `/authentication/login`,
          element: <Login />,
        },
        {
          path: '/authentication/sign-up',
          element: <SignUp />
        },
        // {
        //   index: true,
        //   path: '/products/',
        //   element: <SingleProduct />
        // }
        // {
        //   index: true,
        //   path: '/shipment',
        //   element: <ShipmentPage />
        // },
        // {
        //   index: true,
        //   path: '/cart',
        //   element: <CartPage />
        // }
      ]
    },
  ])
  return (
    <RouterProvider router={AppRoutes} />
    // <BrowserRouter>
    //   <Routes>
    //     {routes.map((route) => (
    //       <Route
    //         path={route.path}
    //         element={route.component}
    //       />
    //     ))}
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;

const Layout = () => {
  return (
    <>
      <ScrollPage />
      <NaviBar />
      <Outlet /> {/* This will render the child routes */}
      <Footer />
    </>
  )
}