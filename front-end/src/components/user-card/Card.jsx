/* eslint-disable react/prop-types */
const Card = ({ user }) => {
    const { photoUrl, firstName, lastName, age, gender, skills, about } = user;
    return (
        <div className="card bg-base-300 w-96 shadow-xl">
            <figure>
                <img src={photoUrl} alt="Photo" className="w-full h-80" />
            </figure>
            <div className="card-body p-4">
                <div>
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    <div className="text-sm">
                        {age && <span className="mr-2">{age}</span>}
                        {gender && <span>{gender}</span>}
                    </div>
                </div>

                <p>{about}</p>
                {skills && (
                    <div className="flex gap-2 flex-wrap">
                        {skills.map((skill, index) => {
                            return (
                                <div
                                    className="rounded-md px-2 bg-info text-info-content"
                                    key={index}
                                >
                                    {skill}
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="card-actions justify-between mt-2">
                    <button className="btn btn-error w-5/12">Ignore</button>
                    <button className="btn btn-success w-5/12">
                        Interested
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
