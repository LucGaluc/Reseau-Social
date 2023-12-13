import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home/Home";
import React from "react";
import CreatePost from "./Post/CreatePost";
import RecupPost from "./Post/RecupPosts";
import SearchPage from "./components/searchPage/SearchPage";
import SearchPosts from "./SearchPosts/SearchPosts";
import LoginForm from "./Auth/Login/LoginForm";
import Logout from "./Auth/Logout/Logout";
import Register from "./Auth/Register/Register";
import Profile from "./components/Profile/Profile";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/LoginForm.jsx",
            element: <LoginForm />,
        },
        {
            path: "/Register.jsx",
            element: <Register />,
        },
        {
            path: "/Profile.jsx",
            element: <Profile />,
        },
        {
            path: "/Logout.jsx",
            element: <Logout />,
        },
        {
            path: "/search",
            element: <SearchPage />,
        },
        {
            path: "/SearchPosts.jsx",
            element: <SearchPosts />,
        },
        {
            path: "/CreatePost.jsx",
            element: <CreatePost />,
        },
        {
            path: "/RecupPosts.jsx",
            element: <RecupPost />,
        },
        // {
        //   path: "/src/assets/comment.jsx",
        //   element: <Comment />,
        // },
    ]);

    /* console.log('app', array[0].original_title); */
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
