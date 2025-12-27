import { useRef, useState } from "react"
import close from "../assets/close.png"
import "./MatchCard.css"

export default function MatchCard() {
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
                <div className="Match_photo" />
                <div className="Match_info">
                    <h1 className="Match_nickname">Nickname</h1>
                    <div className="Match_place">Бар “Какой то” 21.02.26 вечер</div>
                </div>
            </div>
            {isOpen &&
                <div className="MatchCard_open">
                    <div className="MatchCard_info">
                        <div className="MatchCard_photos" ref={photoRef}
                        onScrollEnd={() => onScrollEnd()}>
                            <div className="MatchCard_photo" />
                            <div className="MatchCard_photo" />
                        </div>
                        <div className="MatchCard_body">
                            <h1 className="MatchCard_nick">Nickname</h1>
                            <div className="MatchCard_tg">@tgNick</div>
                            <div className="MatchCard_same_events">
                                <div className="MatchCard_same_event">Бар “Какой то” 21.02.26 вечер</div>
                            </div>
                            <div className="MatchCard_desc">Описание профиля</div>
                        </div>
                    </div>
                    <div className="MatchCard_close" onClick={() => setIsOpen(false)}>
                        <div style={{mask: `url(${close}) no-repeat center`, maskSize: `24px 24px`}} className="MatchCard_close_icon" />
                    </div>
                </div>
            }
        </>
    )
}