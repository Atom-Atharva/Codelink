import axios from "axios";
import { useState } from "react";
import { LOGIN_API, SIGNUP_API } from "../utils/constants/apiList";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/redux/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [error, setError] = useState("");

    const handleLoginBtn = async () => {
        try {
            // Fetch Data
            const res = await axios.post(
                LOGIN_API,
                {
                    emailId,
                    password,
                },
                { withCredentials: true }
            );

            // Update Store
            dispatch(addUser(res?.data?.data));

            // Navigate to Feed Page
            navigate("/");
        } catch (error) {
            setError(error?.response?.data || "Something went wrong!");
            console.log("Error: ", error);
        }
    };

    const handleSignUpBtn = async () => {
        try {
            const res = await axios.post(
                SIGNUP_API,
                {
                    firstName,
                    lastName,
                    emailId,
                    password,
                },
                { withCredentials: true }
            );
            dispatch(addUser(res?.data?.data));

            navigate("/profile");
        } catch (error) {
            setError(error?.response?.data || "Something went wrong!");
            console.log(error);
        }
    };

    return (
        <div className="flex-grow flex">
            <div className="flex justify-center items-center flex-grow">
                <div className="card bg-base-300 w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title justify-center mb-4">
                            {isLoginForm
                                ? "Welcome Back!"
                                : "Welcome to CodeLink!"}
                        </h2>

                        {!isLoginForm && (
                            <>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70"
                                    >
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                    </svg>
                                    <input
                                        type="text"
                                        className="grow"
                                        value={firstName}
                                        placeholder="First Name"
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                    />
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70"
                                    >
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                    </svg>
                                    <input
                                        type="text"
                                        className="grow"
                                        value={lastName}
                                        placeholder="Last Name"
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                    />
                                </label>
                            </>
                        )}
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70"
                            >
                                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input
                                type="text"
                                className="grow"
                                value={emailId}
                                placeholder="Email"
                                onChange={(e) => setEmailId(e.target.value)}
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <input
                                type="password"
                                className="grow"
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <p className="text-red-500 text-sm">{error}</p>
                        <div className="card-actions justify-center mt-4">
                            <button
                                className="btn btn-block btn-primary text-lg"
                                onClick={
                                    isLoginForm
                                        ? handleLoginBtn
                                        : handleSignUpBtn
                                }
                            >
                                {isLoginForm ? "Login" : "SignUp"}
                            </button>
                        </div>
                        {isLoginForm ? (
                            <p className="text-sm">
                                New to CodeLink?{" "}
                                <span
                                    className="italic underline cursor-pointer hover:font-semibold text-info"
                                    onClick={() => setIsLoginForm(false)}
                                >
                                    SignUp.
                                </span>
                            </p>
                        ) : (
                            <p className="text-sm">
                                Already on CodeLink?{" "}
                                <span
                                    className="italic underline cursor-pointer hover:font-semibold text-info"
                                    onClick={() => setIsLoginForm(true)}
                                >
                                    Login.
                                </span>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
