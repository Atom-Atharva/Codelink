import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "../pages/Body";
import Login from "../pages/Login";
import Feed from "../pages/Feed";
import Profile from "../pages/Profile";
import Connections from "../pages/Connections";

// Router with Browser Router Component.
const AppRouter = () => {
    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/" element={<Body />}>
                    <Route path="/" element={<Feed />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/connections" element={<Connections />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
