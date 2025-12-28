import "./Events.css"
import plus from "../assets/plus.png"
import search from "../assets/search.png"
import Event from "../components/Event"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "../api/axios"

export default function Events() {
    const queryClient = useQueryClient();

    const [isCreateEventOpen, setIsCreateEventOpen] = useState(false)
    const [chsnEvent, setChsnEvent] = useState(0)
    // const [wrkDays, setWrkDays] = useState<boolean[]>([false, false, false, false, false, false, false])
    // const [wrkFrom, setWrkFrom] = useState("")
    // const [wrkTo, setWrkTo] = useState("")
    const [photos, setPhotos] = useState<any>([])
    const [photosToSend, setPhotosToSend] = useState<any>([])
    const [title, setTitle] = useState("");
    const [placeName, setPlaceName] = useState("");
    const [placeAddr, setPlaceAddr] = useState("");
    const [placeCity, setPlaceCity] = useState("");
    const [desc, setDesc] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");

    const [query, setQuery] = useState("");

    function handlePhotoUpload(ev: any) {
        const files = Array.from(ev.target.files);

        files.forEach((file: any) => {
            parsePhotoMutations.mutate(file);
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPhotos((prev: any) => [...prev, {
                        id: Date.now() + Math.random(),
                        file,
                        preview: reader.result
                    }]);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    const { data } = useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            const resp = await axiosInstance.get("/events")
            return resp.data;
        }
    })
    const { data: placesData } = useQuery({
        queryKey: ["places"],
        queryFn: async () => {
            const resp = await axiosInstance.get("/places")
            return resp.data;
        }
    })

    const parsePhotoMutations = useMutation({
        mutationKey: ["parsePhotos"],
        mutationFn: async (file: any) => {
            const formData = new FormData();
            formData.append('file', file)
            const { data } = await axiosInstance.post("/media/upload", formData)
            setPhotosToSend([...photosToSend, data.slice(20)])
        }
    })

    const createEventMutation = useMutation({
        mutationFn: async (evnt: any) => {
            return axiosInstance.post("/events", evnt)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] })
        }
    })

    const createPlaceMutation = useMutation({
        mutationFn: async (place: any) => {
            return axiosInstance.post("/places", place)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["places"] })
        }
    })

    function handleCreation() {
        if (chsnEvent == 0) {
            createEventMutation.mutate({
                "title": title,
                "description": desc,
                "placeName": placeName,
                "address": placeAddr,
                "city": placeCity,
                "startAt": `${eventDate}T${eventTime}:00Z`,
                "type": "CONCERT",
                "source": "EXTERNAL",
                "photos": photosToSend
            })
        }
        else {
            createPlaceMutation.mutate({
                "name": placeName,
                "type": "BAR",
                "city": placeCity,
                photos: photosToSend,
                description: desc
            })
        }
    }

    const { data: eventSearch } = useQuery({
        queryKey: ["eventsSearch", query],
        queryFn: async () => {
            const resp = await axiosInstance.get(`/events/search/${query}`)
            console.log(resp)
            return resp.data
        },
        enabled: query != "",
        refetchOnWindowFocus: false
    })
    const { data: placeSearch } = useQuery({
        queryKey: ["placesSearch", query],
        queryFn: async () => {
            const resp = await axiosInstance.get(`/places/search/${query}`)
            return resp.data
        },
        enabled: query != "",
        refetchOnWindowFocus: false
    })

    return (
        <>
            <div className="Events">
                <div className="createEventForm_choose_container">
                    <h3 onClick={() => setChsnEvent(0)} className={!(chsnEvent == 0) ? "createEventForm_choose"
                        : "createEventForm_choose createEventForm_choose_chsn"
                    }>Событие</h3>
                    <h3 onClick={() => setChsnEvent(1)} className={!(chsnEvent == 1) ? "createEventForm_choose"
                        : "createEventForm_choose_chsn createEventForm_choose"
                    }>Место</h3>
                </div>
                <div className="Events_container">
                    {chsnEvent == 0 ?
                        (query != "" ?
                            eventSearch && eventSearch.map((event: any) => {
                                return <Event title={event.title} desc={event.description} placeName={event.placeName} type="EVENT"
                                    addr={event.address} city={event.city} startAt={event.startAt} photos={event.photos} id={event.id} />
                            })
                            :
                            data?.map((event: any) => {
                                return <Event title={event.title} desc={event.description} placeName={event.placeName} type="EVENT"
                                    addr={event.address} city={event.city} startAt={event.startAt} photos={event.photos} id={event.id} />
                            })
                        ) :
                        (query != "" ?
                            placeSearch && placeSearch.map((place: any) => {
                                return <Event title={place.name} city={place.city} photos={place.photos} type="PLACE"
                                    id={place.id} />
                            })
                            :
                            placesData?.map((place: any) => {
                                return <Event title={place.name} city={place.city} photos={place.photos} type="PLACE"
                                    id={place.id} />
                            })
                        )
                    }
                </div>
                <div className="Events_actions">
                    <div className="Events_search_container">
                        <input className="Events_search" placeholder="Поиск..." onChange={(ev) => setQuery(ev.currentTarget.value)} />
                        <div className="Events_search_icon" style={{ mask: `url(${search}) no-repeat center`, backgroundColor: `var(--primary)` }} />
                    </div>
                    <div className="Events_add" onClick={() => setIsCreateEventOpen(true)}>
                        <div className="Events_add_icon" style={{ mask: `url(${plus}) no-repeat center`, backgroundColor: `var(--primary)` }} />
                    </div>
                </div>
                {isCreateEventOpen &&
                    <div className="crateEventForm_background" onClick={() => setIsCreateEventOpen(false)}>
                        <div className="crateEventForm" onClick={ev => ev.stopPropagation()}>
                            <h2 className="crateEventForm_header">Добавь мероприятие</h2>
                            <input type="file" accept="image/*" onChange={(ev) => handlePhotoUpload(ev)} multiple id="upload_photo" style={{ display: `none` }} />
                            <label htmlFor="upload_photo" className="createEventForm_upload">Загрузить фото</label>
                            <div className="upload_photos_container">
                                {
                                    (photos.length == 0) ? <div className="uploadedPhoto_placeholder">Здесь будут загруженные фотографии</div>
                                        : photos.map((photo: any, index: number) => (
                                            <img src={photo.preview} alt="Загруженное" className="uploaded_photo"
                                                onClick={() => setPhotos((prev: any) => {
                                                    const newPhotos = [...prev];
                                                    newPhotos.splice(index, 1);
                                                    const newTPhotos = [...photosToSend]
                                                    newTPhotos.splice(index, 1)
                                                    setPhotosToSend(newTPhotos);
                                                    return newPhotos;
                                                })} />
                                        ))
                                }
                            </div>
                            <input type="text" placeholder="Название места" className="createEventForm_input" onChange={(ev) => setPlaceName(ev.currentTarget.value)} />
                            <input type="text" placeholder="Город" className="createEventForm_input" onChange={(ev) => setPlaceCity(ev.currentTarget.value)} />
                            {(chsnEvent == 0) &&
                                <>
                                    <input type="text" placeholder="Название мероприятия" className="createEventForm_input" onChange={(ev) => setTitle(ev.currentTarget.value)} />
                                    <input type="text" placeholder="Адрес" className="createEventForm_input" onChange={(ev) => setPlaceAddr(ev.currentTarget.value)} />
                                    <input type="date" className="createEventForm_input" onChange={(ev) => setEventDate(ev.currentTarget.value)} />
                                    <input type="time" className="createEventForm_input" onChange={(ev) => setEventTime(ev.currentTarget.value)} />
                                </>
                            }
                            <textarea placeholder="Описание" className="createEventForm_inputArea" onChange={(ev) => setDesc(ev.currentTarget.value)} />
                            <div className="createEventForm_submit" onClick={() => handleCreation()}><h1>Добавить</h1></div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}