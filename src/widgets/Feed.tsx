import { useRef } from "react"
import "./Feed.css"
import FeedCard from "../components/FeedCard";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import type { Slice } from "../model/Slice";
// import axiosInstance from "../api/axios";

export default function Feed() {
    const feedRef = useRef(null);

    function onScrollEnd() {
        let feed: any;
        if (feedRef.current) {
            feed = feedRef.current;
            const scrollTop = feed.scrollTop;
            const cardHeight = feed.clientHeight;
            const current = Math.round(scrollTop / cardHeight);
            feed.scrollTo({
                top: current * cardHeight,
                behavior: "smooth"
            })
        }
    }

    // const { data } = useInfiniteQuery({
    //     queryKey: ["feed"],
    //     queryFn: async ({ pageParam = 0 }): Promise<Slice<any>> => {
    //         const { data } = await axiosInstance.get<Slice<any>>(`/feed/page=${pageParam}`)
    //         return data;
    //     },
    //     getNextPageParam: (lastPage) => {
    //         if (!lastPage.last) {
    //             return lastPage.number + 1
    //         }
    //     },
    //     refetchOnWindowFocus: false,
    //     retry: 5
    // })

    return (
        <>
            <div className="Feed_container" ref={feedRef}
                onScrollEnd={() => onScrollEnd()}>
                <FeedCard />
                <FeedCard />
                <FeedCard />
            </div>
        </>
    )
}