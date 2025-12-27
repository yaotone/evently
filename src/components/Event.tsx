import { useRef, useState } from "react"
import close from "../assets/close.png"
import place from "../assets/place.png"
import hand from "../assets/hand.png"
import chevron from "../assets/chevron.png"
import "./Event.css"

export default function Event() {
    const photoRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false);
    const [isAttending, setIsAttending] = useState(false)
    const [isAttendFormOpen, setIsAttendFromOpen] = useState(false)
    const [dayTime, setDayTime] = useState("Вечер")
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    function formatDate(date: any) {
        const formatter = new Intl.DateTimeFormat('fr-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });

        return formatter.format(date).replace(/\./g, '-');
    }

    const [date, setDate] = useState(formatDate(new Date()))

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

    function onAttendClick() {
        if (isAttending) setIsAttending(false)
        else {
            setIsAttendFromOpen(true)
            setIsAttending(true)
        }
    }


    function handleDateChange(ev: any) {
        let value = ev.currentTarget.value;
        setDate(value)
    }
    return (
        <>
            <div className="Event" onClick={() => setIsOpen(true)}>
                <div className="Event_photo" />
                <div className="Event_info">
                    <h1 className="Event_name">Концерт “Какой то”</h1>
                    <div className="Event_time">21.02.26 19:00</div>
                </div>
            </div>
            {isOpen &&
                <div className="Event_open">
                    <div className="Event_photos" ref={photoRef}
                        onScrollEnd={() => onScrollEnd()}>
                        <div className="Event_open_photo"></div>
                        <div className="Event_open_photo"></div>
                    </div>
                    <div className="Event_body">
                        <h1>Концерт “Какой то”</h1>
                        <div className="Event_body_time">21.02.26 19:00</div>
                        <div className="Event_body_place_container">
                            <div className="Event_body_place_icon" style={{ mask: `url(${place}) no-repeat center`, maskSize: `24px 24px` }} />
                            <div className="Event_body_place">г.Москва, м.Юго-западное, ул.Пушкина, д.Колотушкина 21 </div>
                        </div>
                        <div className="Event_body_desc">Описание события</div>
                    </div>
                    <div className="Event_actions">
                        <div className="Event_attend" onClick={() => onAttendClick()}>
                            <div className="Event_attend_icon" style={isAttending ? { mask: `url(${hand}) no-repeat center`, maskSize: `64px 64px`, backgroundColor: `var(--primary)` }
                                : { mask: `url(${hand}) no-repeat center`, maskSize: `64px 64px` }} />
                        </div>
                        <div className="Event_close" onClick={() => setIsOpen(false)}>
                            <div className="Event_close_icon" style={{ mask: `url(${close}) no-repeat center`, maskSize: `24px 24px` }} />
                        </div>
                    </div>
                </div>}
            {isAttendFormOpen &&
                <div className="attendForm_background" onClick={() => setIsAttendFromOpen(false)}>
                    <div className="attendForm" onClick={(ev) => ev.stopPropagation()}>
                        <h2 className="attendForm_head">Выберите время когда пойдете</h2>
                        <div className="attendForm_inputs">
                            <input type="date" className="attendForm_date" value={date}
                                onChange={(ev) => handleDateChange(ev)} />
                            <div className="attendForm_dropdown_container">
                                <div className="attendForm_dropdown_field" onClick={()=>setIsDropdownOpen(open=>!open)}>
                                    <div className="attendForm_dropdown_text">{dayTime}</div>
                                    <div className="attendForm_dropdown_icon" style={!isDropdownOpen ? { mask: `url(${chevron}) no-repeat center`, maskSize: `24px 24px` } : 
                                {mask: `url(${chevron}) no-repeat center`, maskSize: `24px 24px`, transform: `rotate(180deg)`}}/>
                                </div>
                                <div className={isDropdownOpen ? "attendForm_dropdown attendForm_dropdown_open" : "attendForm_dropdown"}>
                                    <div className="attendForm_dropdown_var" onClick={()=>setDayTime("Утро")}>Утро</div>
                                    <div className="attendForm_dropdown_var" onClick={()=>setDayTime("День")}>День</div>
                                    <div className="attendForm_dropdown_var" onClick={()=>setDayTime("Вечер")}>Вечер</div>
                                    <div className="attendForm_dropdown_var" onClick={()=>setDayTime("Ночь")}>Ночь</div>
                                </div>
                            </div>
                        </div>
                        <div className="attendForm_submit"><h1>Отправить</h1></div>
                    </div>
                </div>
            }
        </>
    )
}