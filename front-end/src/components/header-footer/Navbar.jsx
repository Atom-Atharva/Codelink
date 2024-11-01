import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LOGOUT_API } from "../../utils/constants/apiList";
import { removeUser } from "../../utils/redux/userSlice";
import { removeFeed } from "../../utils/redux/feedSlice";

const Navbar = () => {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignUpBtn = async () => {};

    const handleLogoutBtn = async () => {
        try {
            // Handle Logout API.
            const res = await axios.post(
                LOGOUT_API,
                {},
                { withCredentials: true }
            );
            console.log(res);

            dispatch(removeUser());
            dispatch(removeFeed());

            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="navbar bg-base-300">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">
                    CodeLink
                </Link>
            </div>
            {user ? (
                <div className="flex-none gap-4 mx-4">
                    <p className="font-semibold">Welcome, {user.firstName}</p>
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                <img alt="User Photo" src={user.photoUrl} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <a>Change Password</a>
                            </li>
                            <li>
                                <a onClick={handleLogoutBtn}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div
                    className="mx-4 font-semibold hover:font-bold cursor-pointer hover:underline hover:underline-offset-2"
                    onClick={handleSignUpBtn}
                >
                    SignUp
                </div>
            )}
        </div>
    );
};

export default Navbar;
