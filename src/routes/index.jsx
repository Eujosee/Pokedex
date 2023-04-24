import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from "../pages/Home";
import Pokemon from "../pages/Pokemon";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/pokemon/:id",
        element: <Pokemon/>
    }
])

export default function Routes() {
    return <RouterProvider router={router} />;
}