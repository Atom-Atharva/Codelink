import { Outlet } from "react-router-dom";
import Navbar from "../components/header-footer/Navbar";
import Footer from "../components/header-footer/Footer";

const Body = () => {
    return (
        <div className="flex flex-col min-h-screen justify-between">
            <div className="flex-grow flex flex-col">
                <Navbar />
                <Outlet />
            </div>

            <Footer />
        </div>
    );
};

export default Body;
