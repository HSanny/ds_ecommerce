import React, { PropsWithChildren } from 'react'
import { createBrowserRouter, BrowserRouter, Routes, Route, RouterProvider, Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ScrollPage from './components/common/ScrollPage';
import NaviBar from './components/NaviBar';
import Footer from './components/Footer';
import ProductsPage from './pages/ProductsPage';
import SingleProduct from './components/products/SingleProduct';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import PrivateRoute from './utils/PrivateRoute';

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
        },
        {
          path: '/products/:id',
          element: <SingleProduct />,
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
        {
          element: <PrivateRoute />, // protect the following routes
          children: [
            {
              path: '/shipment',
              element: <div> Shipment Page </div>
            },
            {
              path: '/cart',
              element: <div> Cart Page </div>
            }
          ]
        }
      ]
    },
  ])
  return (
    <RouterProvider router={AppRoutes} />
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