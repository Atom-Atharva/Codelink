/* eslint-disable react/prop-types */
import { useState } from "react";
import Card from "../user-card/Card";
import axios from "axios";
import { PROFILE_EDIT_API } from "../../utils/constants/apiList";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/redux/userSlice";

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [skills, setSkills] = useState(user.skills);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const dispatch = useDispatch();

    const handleEditProfileBtn = async () => {
        try {
            const res = await axios.patch(
                PROFILE_EDIT_API,
                { firstName, lastName, age, gender, about, photoUrl, skills },
                { withCredentials: true }
            );

            dispatch(addUser(res?.data?.data));
            setError("");
            setSuccess(res?.data?.message);
        } catch (error) {
            console.log(error);
            setSuccess("");
            setError(error?.response?.data);
        }
    };

    return (
        <div className="flex flex-grow justify-center gap-32 items-center">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center mb-4">
                        Your Profile
                    </h2>

                    <label className="input input-bordered flex items-center gap-2">
                        First Name
                        <input
                            type="text"
                            className="grow"
                            placeholder={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Last Name
                        <input
                            type="text"
                            className="grow"
                            placeholder={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        Age
                        <input
                            type="text"
                            className="grow"
                            placeholder={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </label>

                    <select
                        className="select select-bordered w-full max-w-xs"
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option disabled selected>
                            Select Gender
                        </option>
                        <option>male</option>
                        <option>female</option>
                        <option>others</option>
                    </select>

                    <label className="input input-bordered flex items-center gap-2">
                        PhotoUrl
                        <input
                            type="text"
                            className="grow"
                            placeholder={photoUrl}
                            onChange={(e) => setPhotoUrl(e.target.value)}
                        />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        About
                        <input
                            type="text"
                            className="grow"
                            placeholder={about}
                            onChange={(e) => setAbout(e.target.value)}
                        />
                    </label>
                    <p className="text-red-500 text-sm">{error}</p>
                    <p className="text-green-500 text-sm">{success}</p>

                    <div className="card-actions justify-center mt-4">
                        <button
                            className="btn btn-block btn-primary text-lg "
                            onClick={handleEditProfileBtn}
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
            <Card
                user={{
                    firstName,
                    lastName,
                    age,
                    gender,
                    about,
                    photoUrl,
                    skills,
                }}
                profile={true}
            />
        </div>
    );
};

export default EditProfile;
