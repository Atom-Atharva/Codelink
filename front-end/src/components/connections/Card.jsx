/* eslint-disable react/prop-types */
const Card = ({ data, request }) => {
    const { firstName, lastName, photoUrl, about, skills, age, gender } = data;
    return (
        <div className="flex bg-base-300 w-7/12 rounded-lg">
            <img
                src={photoUrl}
                alt="photo"
                className="w-80 min-h-56 rounded-l-lg"
            />
            <div className="px-4">
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

                {request && (
                    <div className="flex justify-around my-4">
                        <button className="btn btn-success w-4/12">
                            Accept
                        </button>
                        <button className="btn btn-error w-4/12">Reject</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;
