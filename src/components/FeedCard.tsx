import { useRef, useState } from "react"
import like from "../assets/like.png"
import "./FeedCard.css"

export default function FeedCard() {
    const photoRef = useRef(null)
    const [activePhoto, setActivePhoto] = useState(0)
    const [isSnapped, setIsSnapped] = useState(false)
    const [isLiked, setIsLiked] = useState(false)

    function onLikeClick(ev: any) {
        ev.stopPropagation()
        setIsLiked(liked=>!liked)
    }

    function onScrollEnd() {
        let photos: any;
        if (photoRef.current) {
            photos = photoRef.current;
            const scrollLeft = photos.scrollLeft;
            const cardWidth = photos.clientWidth;
            const current = Math.round(scrollLeft / cardWidth);
            setActivePhoto(current)
            photos.scrollTo({
                left: current * cardWidth,
                behavior: "smooth"
            })
        }
    }

    return (
        <div className="FeedCard" >
            <div className="FeedCard_container" onClick={() => setIsSnapped(snap => !snap)}
                style={isSnapped ? { height: `40%` } : {}}>
                <div className="photo_container" ref={photoRef}
                    onScrollEnd={() => onScrollEnd()}>
                    <div className="photo" />
                    <div className="photo" />
                </div>
                <div className="card_ui">
                    <div className="like_button" onClick={(ev) => onLikeClick(ev)}>
                        <div className="like_icon" 
                        style={isLiked ? {mask: `url(${like}) no-repeat center`, backgroundColor: `var(--primary)`} 
                        : {mask: `url(${like}) no-repeat center`, backgroundColor: `var(--text)`}}/>
                    </div>
                    {!isSnapped && <div className="same_events_container">
                        <div className="same_event">Бар “Голубая лагуна с длинным назв” 12.01.26, вечер</div>
                        <div className="same_event">Бар “Голубая лагуна” 12.01.26, вечер</div>
                    </div>}
                    <div className="photo_count_container">
                        <div className="photo_dot"
                            style={activePhoto == 0 ? {
                                backgroundColor: 'var(--text)',
                                border: '1px solid var(--background)'
                            } : {}} />
                        <div className="photo_dot"
                            style={activePhoto == 1 ? {
                                backgroundColor: 'var(--text)',
                                border: '1px solid var(--background)'
                            } : {}} />
                    </div>
                </div>
            </div>
            <div className={isSnapped ? "FeedCard_description" : "FeedCard_description  FeedCard_description_hidden"}>
                <div className="FeedCard_nickname"><h1>Nickname</h1></div>
                <div className="FeedCard_events">
                    <div className="FeedCard_event">Бар “Голубая лагуна с длинным названием” 12.01.26, вечер</div>
                    <div className="FeedCard_event">Бар “Голубая лагуна” 12.01.26, вечер</div>
                </div>
                <div className="FeedCard_profile_desc">
                    Описание профиля Описание профиля Описае профиля Описание профиля Оание профля Описание пфиля Описание профиля Описание профиля
                </div>
            </div>
        </div>
    )
}