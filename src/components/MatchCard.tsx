import { useRef, useState } from "react"
import close from "../assets/close.png"
import "./MatchCard.css"

interface IMatchCard {
    photos: string[],
    nickname: string,
    events: string[],
    tgNick: string,
    decsription: string
}

export default function MatchCard({ photos, nickname, events, tgNick, decsription }: IMatchCard) {
    const photoRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false);

    function onScrollEnd() {
        let photos: any;
        if (photoRef.current) {
            photos = photoRef.current;
            const scrollLeft = photos.scrollLeft;
            const cardWidth = photos.clientWidth;
            const current = Math.round(scrollLeft / cardWidth);
            photos.scrollTo({
                left: current * cardWidth,
                behavior: "smooth"
            })
        }
    }

    return (
        <>
            <div className="MatchCard" onClick={() => setIsOpen(true)}>
                <div className="Match_photo" style={{backgroundImage: `url(${photos[0]})`}}/>
                <div className="Match_info">
                    <h1 className="Match_nickname">{nickname}</h1>
                    {events.map((evnt) => {
                        return <div className="Match_place">{evnt}</div>;
                    })}
                </div>
            </div>
            {isOpen &&
                <div className="MatchCard_open">
                    <div className="MatchCard_info">
                        <div className="MatchCard_photos" ref={photoRef}
                            onScrollEnd={() => onScrollEnd()}>
                            {photos.map((photo)=>{
                                return <div className="MatchCard_photo" style={{backgroundImage: `url(${photo})`}}/>;
                            })}
                        </div>
                        <div className="MatchCard_body">
                            <h1 className="MatchCard_nick">{nickname}</h1>
                            <div className="MatchCard_tg">{tgNick}</div>
                            <div className="MatchCard_same_events">
                                {events.map((evnt) => {
                                    return <div className="MatchCard_same_event">{evnt}</div>;
                                })}
                            </div>
                            <div className="MatchCard_desc">{decsription}</div>
                        </div>
                    </div>
                    <div className="MatchCard_close" onClick={() => setIsOpen(false)}>
                        <div style={{ mask: `url(${close}) no-repeat center`, maskSize: `24px 24px` }} className="MatchCard_close_icon" />
                    </div>
                </div>
            }
        </>
    )
}