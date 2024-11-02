import axios from "axios";
import { useEffect, useState } from "react";
import { GET_MY_REQUESTS_API } from "../utils/constants/apiList";
import Card from "../components/connections/Card";

const Request = () => {
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        try {
            const res = await axios.get(GET_MY_REQUESTS_API, {
                withCredentials: true,
            });

            setRequests(res?.data?.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <div className="flex flex-col items-center my-10">
            <h1 className="text-3xl font-bold">Pending Requests</h1>

            <div className="my-10 w-full">
                {requests.length === 0 ? (
                    <p className="text-center">No Pending Requests</p>
                ) : (
                    requests.map((request) => {
                        return (
                            <div
                                key={request._id}
                                className="mb-10 flex flex-col items-center"
                            >
                                <Card data={request.fromUserId} request={true} />
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Request;
