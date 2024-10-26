import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "../pages/Body";
import Login from "../pages/Login";

// Router with Browser Router Component.
const AppRouter = () => {
    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/" element={<Body />}>
                    <Route path="/login" element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
