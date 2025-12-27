import { useRef } from "react"
import "./Feed.css"
import FeedCard from "../components/FeedCard";

export default function Feed() {
    const feedRef = useRef(null);

    function onScrollEnd(){
        let feed: any;
        if(feedRef.current){
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