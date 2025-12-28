
import Events from "./Events"
import Feed from "./Feed"
import "./Main.css"
import Match from "./Match"
import Premium from "./Premium"
import Profile from "./Profile"

interface IMain {
    activePage: number
}

const wnd: any = window;
const tg = wnd.Telegram?.WebApp;
console.log(tg)

export default function Main({ activePage }: IMain) {
    if (activePage === 1)
        return (
            <>
                <div className="Main_container">
                    <Match tg={tg}/>
                </div>
            </>
        )
    else if (activePage == 2)
        return (
            <>
                <div className="Main_container">
                    <Events />
                </div>
            </>
        )
    else if (activePage == 3)
        return (
            <>
                <div className="Main_container">
                    <Feed />
                </div>
            </>
        )
    else if (activePage == 4)
        return (
            <>
                <div className="Main_container">
                    <Profile/>
                </div>
            </>
        )
    else if (activePage == 5)
        return (
            <>
                <div className="Main_container">
                    <Premium tg={tg}/>
                </div>
            </>
        )
}