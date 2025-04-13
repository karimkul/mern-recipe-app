import "./App.css";
import axios from "axios";
import MainNavigation from "./components/MainNavigation";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const getAllRecipes = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/recipe");
        return response.data;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return [];
    }
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainNavigation />,
        children: [
            { path: "/", element: <Home />, loader: getAllRecipes },
            { path: "/myRecipe", element: <Home /> },
            { path: "/favRecipe", element: <Home /> }
        ]
    }
]);

function App() {
    return <RouterProvider router={router}></RouterProvider>;
}

export default App;
