import { useRef, useState } from "react";
import "./Profile.css"
import events from "../assets/events.png"
import edit from "../assets/edit.png"
import leave from "../assets/leave.png"
import del from "../assets/delete.png"
import MiniEvent from "../components/MiniEvent";

export default function Profile() {
    const photoRef = useRef(null)
    const [activePhoto, setActivePhoto] = useState(0);
    const [photos, setPhotos] = useState<any[]>([]);
    const [isProfileEditActive, setIsProfileEditActive] = useState(false)
    const [isEventsFormActive, setIsEventsFormActive] = useState(false)
    const [chsnEvent, setChsnEvent] = useState(0)
    const [isEditEventFormActive, setIsEditEventFormActive] = useState(false)
    const [editingPhotos, setEditingPhotos] = useState<any[]>([])
    const [wrkDays, setWrkDays] = useState<any[]>([])
    const [editingEventType, setEditingEventType] = useState(0)
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false)

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

    function handlePhotoEditUpload(ev: any) {
        const files = Array.from(ev.target.files);

        files.forEach((file: any) => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setEditingPhotos((prev: any) => [...prev, {
                        id: Date.now() + Math.random(),
                        file,
                        preview: reader.result
                    }]);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    function onEventEditClick() {
        setIsEventsFormActive(false)
        setEditingEventType(1)
        setIsEditEventFormActive(true)
    }

    function handleDelete() {

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

    function onLeaveClick() {

    }

    return (
        <>
            <div className="Profile">
                <div className="FeedCard_container"
                    style={{ height: `40%` }}>
                    <div className="photo_container" ref={photoRef}
                        onScrollEnd={() => onScrollEnd()}>
                        <div className="photo" />
                        <div className="photo" />
                    </div>
                    <div className="card_ui">
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
                <div className="Profile_body">
                    <h1 className="Profile_nick">Nickname</h1>
                    <div className="Profile_events">
                        <MiniEvent text="Бар “Голубая лагуна” 12.01.26, вечер" />
                        <MiniEvent text="Бар “Lheujq” 12.01.26, вечер" />
                    </div>
                    <div className="Profile_desc">
                        Описание профиля
                    </div>
                </div>
                <div className="Profile_actions">
                    <div className="Profile_action" onClick={() => setIsEventsFormActive(true)}>
                        <img src={events} alt="events" className="Profile_action_icon" />
                    </div>
                    <div className="Profile_action" onClick={() => setIsProfileEditActive(true)}>
                        <img src={edit} alt="edit" className="Profile_action_icon" />
                    </div>
                </div>
                {isProfileEditActive &&
                    <div className="Profile_edit_form_background" onClick={() => setIsProfileEditActive(false)}>
                        <div className="Profile_edit_form" onClick={(ev) => ev.stopPropagation()}>
                            <h2 className="Profile_edit_header">Редактировать профиль</h2>
                            <input type="file" accept="image/*" onChange={(ev) => handlePhotoEditUpload(ev)} multiple id="upload_photo" style={{ display: `none` }} />
                            <label htmlFor="upload_photo" className="createEventForm_upload">Загрузить фото</label>
                            <div className="upload_photos_container">
                                {
                                    (photos.length == 0) ? <div className="uploadedPhoto_placeholder">Здесь будут загруженные фотографии</div>
                                        : photos.map((photo: any, index: number) => (
                                            <img src={photo.preview} alt="Загруженное" className="uploaded_photo"
                                                onClick={() => setEditingPhotos((prev: any) => {
                                                    const newPhotos = [...prev];
                                                    newPhotos.splice(index, 1);
                                                    return newPhotos;
                                                })} />
                                        ))
                                }
                            </div>
                            <textarea placeholder="Описание" className="createEventForm_inputArea" style={{ height: `160px` }} />
                            <div className="createEventForm_submit"><h1>Исправить</h1></div>
                        </div>
                    </div>
                }
                {isEventsFormActive &&
                    <div className="Profile_edit_form_background" onClick={() => setIsEventsFormActive(false)}>
                        <div className="Profile_edit_form" onClick={(ev) => ev.stopPropagation()} style={{ height: `60%` }}>
                            <h2 className="Profile_edit_header">Мероприятия</h2>
                            <div className="createEventForm_choose_container">
                                <h3 onClick={() => setChsnEvent(0)} className={!(chsnEvent == 0) ? "createEventForm_choose"
                                    : "createEventForm_choose createEventForm_choose_chsn"
                                }>Иду</h3>
                                <h3 onClick={() => setChsnEvent(1)} className={!(chsnEvent == 1) ? "createEventForm_choose"
                                    : "createEventForm_choose_chsn createEventForm_choose"
                                }>Создал</h3>
                            </div>
                            <div className="Profile_edit_events">
                                {chsnEvent == 0 &&
                                    <>
                                        <div className="Profile_edit_event">
                                            <div className="Profile_edit_event_desc">Бар “Голубая лагуна” 12.01.26, вечер</div>
                                            <div className="Profile_edit_event_leave" onClick={() => onLeaveClick()}>
                                                <img src={leave} alt="leave" className="Profile_edit_event_leave_icon" />
                                            </div>
                                        </div>
                                    </>
                                }
                                {chsnEvent == 1 &&
                                    <>
                                        <div className="Profile_edit_event">
                                            <div className="Profile_edit_event_desc">Бар “Голубая лагуна” 12.01.26, вечер</div>
                                            <div className="Profile_edit_event_leave" onClick={() => onEventEditClick()}>
                                                <img src={edit} alt="edit" className="Profile_edit_event_leave_icon" />
                                            </div>
                                            <div className="Profile_edit_event_leave" onClick={() => setIsDeleteConfirmationOpen(true)}>
                                                <img src={del} alt="del" className="Profile_edit_event_leave_icon" />
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                }
                {isEditEventFormActive &&
                    <div className="Profile_edit_form_background" onClick={() => setIsEditEventFormActive(false)}>
                        <div className="Profile_edit_form" onClick={(ev) => ev.stopPropagation()}>
                            <h2 className="Profile_edit_header">Изменить данные</h2>
                            <input type="file" accept="image/*" onChange={(ev) => handlePhotoUpload(ev)} multiple id="upload_photo" style={{ display: `none` }} />
                            <label htmlFor="upload_photo" className="createEventForm_upload">Загрузить фото</label>
                            <div className="upload_photos_container">
                                {
                                    (editingPhotos.length == 0) ? <div className="uploadedPhoto_placeholder">Здесь будут загруженные фотографии</div>
                                        : editingPhotos.map((photo: any, index: number) => (
                                            <img src={photo.preview} alt="Загруженное" className="uploaded_photo"
                                                onClick={() => setPhotos((prev: any) => {
                                                    const newPhotos = [...prev];
                                                    newPhotos.splice(index, 1);
                                                    return newPhotos;
                                                })} />
                                        ))
                                }
                            </div>
                            <input type="text" placeholder="Название мероприятия" className="createEventForm_input" />
                            <input type="text" placeholder="Местоположение" className="createEventForm_input" />
                            {(editingEventType == 0) &&
                                <>
                                    <input type="date" className="createEventForm_input" />
                                    <input type="time" className="createEventForm_input" />
                                </>
                            }
                            {(editingEventType == 1) &&
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
                            <div className="createEventForm_submit"><h1>Исправить</h1></div>
                        </div>
                    </div>
                }
                {isDeleteConfirmationOpen &&
                    <div className="Profile_edit_form_background" onClick={() => setIsDeleteConfirmationOpen(false)}>
                        <div className="Profile_edit_form" onClick={(ev) => ev.stopPropagation()}>
                            <h2 className="Profile_edit_header">Удалить?</h2>
                            <div className="Profile_event_delete_choices">
                                <div className="Profile_event_delete_choice" onClick={()=>handleDelete()}>
                                    <h1>Да</h1>
                                </div>
                                <div className="Profile_event_delete_choice" onClick={()=>setIsDeleteConfirmationOpen(false)}>
                                    <h1>Нет</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}