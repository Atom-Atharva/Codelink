import axios from "axios";
import { GET_MY_CONNECTIONS_API } from "../utils/constants/apiList";
import { useEffect, useState } from "react";
import Card from "../components/connections/Card";

const Connections = () => {
    const [connections, setConnections] = useState([]);

    const fetchConnections = async () => {
        try {
            const res = await axios.get(GET_MY_CONNECTIONS_API, {
                withCredentials: true,
            });

            setConnections(res?.data?.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    return (
        <div className="flex flex-col items-center my-10">
            <h1 className="text-3xl font-bold">Connections</h1>

            <div className="my-10 w-full">
                {connections.length === 0 ? (
                    <p>No Current Connections</p>
                ) : (
                    connections.map((connection) => {
                        return (
                            <div key={connections._id} className="mb-10 flex flex-col items-center">
                                <Card data={connection} />
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Connections;
