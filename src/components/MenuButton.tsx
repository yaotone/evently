import "./MenuButton.css"

interface IMenuButton {
    icon: string,
    setActivePage: Function,
    isActive: boolean,
    toPage: number
}

export default function MenuButton({ icon, setActivePage, isActive, toPage }: IMenuButton) {
    return (
        <>
            <div className="MenuButton" onClick={() => setActivePage(toPage)}
                style={
                    isActive ?
                        { mask: `url(${icon}) no-repeat center`, backgroundColor: `var(--primary)` }
                        :
                        { mask: `url(${icon}) no-repeat center` }
                } />
        </>
    )
}