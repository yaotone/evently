import "./Events.css"
import plus from "../assets/plus.png"
import search from "../assets/search.png"
import Event from "../components/Event"
import { useState } from "react"

export default function Events() {
    const [isCreateEventOpen, setIsCreateEventOpen] = useState(false)
    const [chsnEvent, setChsnEvent] = useState(0)
    const [wrkDays, setWrkDays] = useState<boolean[]>([false, false, false, false, false, false, false])
    const [photos, setPhotos] = useState<any>([])

    function handlePhotoUpload(ev: any) {
        const files = Array.from(ev.target.files);

        files.forEach((file: any) => {
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

    return (
        <>
            <div className="Events">
                <div className="Events_container">
                    <Event />
                </div>
                <div className="Events_actions">
                    <div className="Events_search_container">
                        <input className="Events_search" placeholder="Поиск..." />
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
                            <div className="createEventForm_choose_container">
                                <h3 onClick={() => setChsnEvent(0)} className={!(chsnEvent == 0) ? "createEventForm_choose"
                                    : "createEventForm_choose createEventForm_choose_chsn"
                                }>Событие</h3>
                                <h3 onClick={() => setChsnEvent(1)} className={!(chsnEvent == 1) ? "createEventForm_choose"
                                    : "createEventForm_choose_chsn createEventForm_choose"
                                }>Место</h3>
                            </div>
                            <input type="file" accept="image/*" onChange={(ev) => handlePhotoUpload(ev)} multiple id="upload_photo" style={{ display: `none` }} />
                            <label htmlFor="upload_photo" className="createEventForm_upload">Загрузить фото</label>
                            <div className="upload_photos_container">
                                {
                                    (photos.length == 0) ? <div className="uploadedPhoto_placeholder">Здесь будут загруженные фотографии</div>
                                        : photos.map((photo: any, index:number) => (
                                            <img src={photo.preview} alt="Загруженное" className="uploaded_photo"
                                                onClick={() => setPhotos((prev:any) => {
                                                    const newPhotos = [...prev];
                                                    newPhotos.splice(index, 1);
                                                    return newPhotos;
                                                })} />
                                        ))
                                }
                            </div>
                            <input type="text" placeholder="Название мероприятия" className="createEventForm_input" />
                            <input type="text" placeholder="Местоположение" className="createEventForm_input" />
                            {(chsnEvent == 0) &&
                                <>
                                    <input type="date" className="createEventForm_input" />
                                    <input type="time" className="createEventForm_input" />
                                </>
                            }
                            {(chsnEvent == 1) &&
                                <>
                                    <div className="createEventForm_place_work_time">
                                        <div className="createEventForm_place_work_hours">
                                            <h1>С</h1>
                                            <input type="time" className="createEventForm_time" />
                                        </div>
                                        <div className="createEventForm_place_work_hours">
                                            <h1>До</h1>
                                            <input type="time" className="createEventForm_time" />
                                        </div>
                                    </div>
                                    <div className="createEventForm_place_work_days">
                                        <div style={wrkDays[0] ? { color: `var(--primary)` } : {}}
                                            className="createEventForm_place_work_day"
                                            onClick={() => setWrkDays(days => { const newDays = [...days]; newDays[0] = !newDays[0]; return newDays })}>ПН</div>
                                        <div style={wrkDays[1] ? { color: `var(--primary)` } : {}}
                                            className="createEventForm_place_work_day"
                                            onClick={() => setWrkDays(days => { const newDays = [...days]; newDays[1] = !newDays[1]; return newDays })}>ВТ</div>
                                        <div style={wrkDays[2] ? { color: `var(--primary)` } : {}}
                                            className="createEventForm_place_work_day"
                                            onClick={() => setWrkDays(days => { const newDays = [...days]; newDays[2] = !newDays[2]; return newDays })}>СР</div>
                                        <div style={wrkDays[3] ? { color: `var(--primary)` } : {}}
                                            className="createEventForm_place_work_day"
                                            onClick={() => setWrkDays(days => { const newDays = [...days]; newDays[3] = !newDays[3]; return newDays })}>ЧТ</div>
                                        <div style={wrkDays[4] ? { color: `var(--primary)` } : {}}
                                            className="createEventForm_place_work_day"
                                            onClick={() => setWrkDays(days => { const newDays = [...days]; newDays[4] = !newDays[4]; return newDays })}>ПТ</div>
                                        <div style={wrkDays[5] ? { color: `var(--primary)` } : {}}
                                            className="createEventForm_place_work_day"
                                            onClick={() => setWrkDays(days => { const newDays = [...days]; newDays[5] = !newDays[5]; return newDays })}>СБ</div>
                                        <div style={wrkDays[6] ? { color: `var(--primary)` } : {}}
                                            className="createEventForm_place_work_day"
                                            onClick={() => setWrkDays(days => { const newDays = [...days]; newDays[6] = !newDays[6]; return newDays })}>ВС</div>
                                    </div>
                                </>
                            }
                            <textarea placeholder="Описание" className="createEventForm_inputArea" />
                            <div className="createEventForm_submit"><h1>Добавить</h1></div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}