import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/header-footer/Navbar";
import Footer from "../components/header-footer/Footer";
import axios from "axios";
import { useEffect } from "react";
import { PROFILE_VIEW_API } from "../utils/constants/apiList";
import { addUser } from "../utils/redux/userSlice";
import { useDispatch } from "react-redux";

const Body = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchUser = async () => {
        try {
            const res = await axios.get(PROFILE_VIEW_API, {
                withCredentials: true,
            });
            console.log(res);

            dispatch(addUser(res?.data));

            navigate("/");
        } catch (error) {
            console.log(error.response);
            if (error.status === 401) {
                navigate("/login");
            }
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

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
