import { useRef, useState } from "react"
import close from "../assets/close.png"
import place from "../assets/place.png"
import hand from "../assets/hand.png"
import chevron from "../assets/chevron.png"
import "./Event.css"
import { useMutation, useQuery } from "@tanstack/react-query"
import axiosInstance from "../api/axios"

interface IEvent {
    title: string,
    desc?: string,
    placeName?: string,
    addr?: string,
    city: string,
    startAt?: string,
    photos: string[],
    type: string,
    id: string
}

export default function Event({ title, desc, placeName, addr, city, startAt, photos, type = "EVENT", id }: IEvent) {
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

    function parseDayTime(dayTime: string) {
        switch (dayTime) {
            case "Утро":
                return "MORNING"
            case "День":
                return "DAY"
            case "Вечер":
                return "EVENING"
            case "Ночь":
                return "NIGHT"
        }
    }

    function onAttendClick() {
        if (isAttending) setIsAttending(false)
        else {
            setIsAttendFromOpen(true)
            setIsAttending(true)
        }
    }

    function handleAttend() {
        attendEventMutation.mutate({
            "userId": "1",
            "contextType": type,
            "eventId": type == "PLACE" ? null : id,
            "placeId": type == "PLACE" ? id : null,
            "date": date,
            "timeSlot": parseDayTime(dayTime),
            "status": "GO"
        })
    }

    const attendEventMutation = useMutation({
        mutationKey: ["attendEvent"],
        mutationFn: (att: any) => {
            return axiosInstance.post("/intents", att)
        }
    })

    function handleDateChange(ev: any) {
        let value = ev.currentTarget.value;
        setDate(value)
    }
    return (
        <>
            <div className="Event" onClick={() => setIsOpen(true)}>
                <div style={{backgroundImage: `url(http://localhost:8080/api/media/download/${photos[0]})`}} className="Event_photo" />
                <div className="Event_info">
                    <h1 className="Event_name">{title}</h1>
                    {startAt && <div className="Event_time">{`${placeName} ${startAt.slice(0, -4).replace("T", " ")}`}</div>}
                </div>
            </div>
            {isOpen &&
                <div className="Event_open">
                    <div className="Event_photos" ref={photoRef}
                        onScrollEnd={() => onScrollEnd()}>
                        {photos.map((photo: any) => {
                            return <div className="Event_open_photo" style={{backgroundImage: `url(http://localhost:8080/api/media/download/${photo})`}}/>
                        })}
                    </div>
                    <div className="Event_body">
                        <h1>{title}</h1>
                        {startAt && <div className="Event_body_time">{startAt.slice(0, -4).replace("T", " ")}</div>}
                        <div className="Event_body_place_container">
                            <div className="Event_body_place_icon" style={{ mask: `url(${place}) no-repeat center`, maskSize: `24px 24px` }} />
                            {(placeName != undefined && addr != undefined) ?
                                <div className="Event_body_place">{`${placeName} ${city} ${addr}`}</div>
                                : <div className="Event_body_place">{`${city}`}</div>}
                        </div>
                        {desc && <div className="Event_body_desc">{desc}</div>}
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
                                <div className="attendForm_dropdown_field" onClick={() => setIsDropdownOpen(open => !open)}>
                                    <div className="attendForm_dropdown_text">{dayTime}</div>
                                    <div className="attendForm_dropdown_icon" style={!isDropdownOpen ? { mask: `url(${chevron}) no-repeat center`, maskSize: `24px 24px` } :
                                        { mask: `url(${chevron}) no-repeat center`, maskSize: `24px 24px`, transform: `rotate(180deg)` }} />
                                </div>
                                <div className={isDropdownOpen ? "attendForm_dropdown attendForm_dropdown_open" : "attendForm_dropdown"}>
                                    <div className="attendForm_dropdown_var" onClick={() => setDayTime("Утро")}>Утро</div>
                                    <div className="attendForm_dropdown_var" onClick={() => setDayTime("День")}>День</div>
                                    <div className="attendForm_dropdown_var" onClick={() => setDayTime("Вечер")}>Вечер</div>
                                    <div className="attendForm_dropdown_var" onClick={() => setDayTime("Ночь")}>Ночь</div>
                                </div>
                            </div>
                        </div>
                        <div className="attendForm_submit" onClick={() => handleAttend()}><h1>Отправить</h1></div>
                    </div>
                </div>
            }
        </>
    )
}