import axios from "axios";
import { REVIEW_REQUEST_API } from "../../utils/constants/apiList";

/* eslint-disable react/prop-types */
const Card = ({ data, requestId, removeRequest }) => {
    const { firstName, lastName, photoUrl, about, skills, age, gender } = data;

    const reviewRequest = async (status) => {
        console.log(status, requestId);

        try {
            const res = await axios.post(
                REVIEW_REQUEST_API + status + "/" + requestId,
                {},
                { withCredentials: true }
            );

            console.log(res);

            removeRequest(requestId);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex bg-base-300 w-7/12 rounded-lg">
            <img
                src={photoUrl}
                alt="photo"
                className="w-80 min-h-56 rounded-l-lg"
            />
            <div className="px-4 flex flex-col justify-between w-full">
                <div>
                    <div className="py-4">
                        <h2 className="text-2xl font-semibold">
                            {firstName + " " + lastName}
                        </h2>
                        {age && <span className="mr-2">{age}</span>}
                        {gender && <span>{gender}</span>}
                    </div>

                    <p className="mb-4">{about}</p>
                    <div className="flex flex-wrap gap-4">
                        {skills &&
                            skills.map((skill, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="rounded-md px-2 bg-info text-info-content "
                                    >
                                        <p>{skill}</p>
                                    </div>
                                );
                            })}
                    </div>
                </div>

                {requestId && (
                    <div className="flex justify-around my-4 pb-4">
                        <button
                            className="btn btn-error w-4/12"
                            onClick={() => reviewRequest("rejected")}
                        >
                            Reject
                        </button>
                        <button
                            className="btn btn-success w-4/12"
                            onClick={() => reviewRequest("accepted")}
                        >
                            Accept
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;
