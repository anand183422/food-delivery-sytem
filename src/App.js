import React from 'react';
import ReactDOM from 'react-dom/client';

import Login from './components/Login';
import Signup from './components/Signup';

import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import RestaurantMenu from './components/RestaurantMenu';
import Cart from './components/Cart';
import { CartProvider } from '../src/utils/CartProvider';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import AppStore from './utils/AppStore';

const AppLayout = () => {
  // console.log(<Body />);
 
  return (
     <>
    <Provider   store={AppStore}>
    <div className="app">
      <Header />
     
      <Outlet />
      <Footer />
    </div>
    </Provider>
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Body />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/restaurants/:resId',
        element: <RestaurantMenu />,
      },
    ],
    errorElement: <Error />,
  },
   {
     path: '/login',
     element: <Login />,
   },
   {
     path: '/signup',
     element: <Signup />,
   },
   
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={appRouter} />);
