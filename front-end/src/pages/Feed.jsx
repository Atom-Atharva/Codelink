import axios from "axios";
import { FEED_API } from "../utils/constants/apiList";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/redux/feedSlice";
import { useEffect } from "react";
import Card from "../components/user-card/Card";

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();

    const getFeed = async () => {
        try {
            const res = await axios.get(FEED_API, { withCredentials: true });

            dispatch(addFeed(res?.data?.data));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getFeed();
    }, []);

    return (
        feed && (
            <div className="flex flex-grow justify-center items-center">
                <Card user={feed[4]} />
            </div>
        )
    );
};

export default Feed;
