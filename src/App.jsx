import React from "react";
import {
  createBrowserRouter, 
  RouterProvider,
} from "react-router-dom";
// import 'leaflet/dist/leaflet.css';
import {Layout, RequireAuth} from "../src/Pages/Layout"
import HomePage from "./Pages/HomePage";
import LoginForm from "./Pages/Login";
import RegisterForm from "./Pages/Register";
const App = () =>{
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      children:[
        {
          path: "/",
          element: <HomePage/>
        },
        {
          path: "/login",
          element: <LoginForm/>
        },
        {
          path: "/register",
          element: <RegisterForm/>
        },
      ]
    },
    // {
    //   path: "/",
    //   element: <RequireAuth/>,
    //   children: [
    //     {
    //       path: "/profile",
    //       element: <ProfilePage/>,
    //       loader: profilePageLoader
    //     },
    //     {
    //       path: "/profile/update",
    //       element: <ProfileUpdatePage/>
    //     },
    //     {
    //       path: "/profile/newpost",
    //       element: <NewPostPage/>
    //     }
    //   ]
    // }
  ])
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
