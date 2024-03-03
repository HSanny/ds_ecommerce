import React, { PropsWithChildren } from 'react'
import { createBrowserRouter, BrowserRouter, Routes, Route, RouterProvider, Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ScrollPage from './components/common/ScrollPage';
import NaviBar from './components/NaviBar';

const routes = [
  {
    path: "/",
    component: <HomePage />,
    name: "HomePage"
  }
]

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
        }
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
      {/* <Footer /> Add your Footer component here if needed */}
    </>
  )
}