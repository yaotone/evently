import MatchCard from "../components/MatchCard"
import "./Match.css"

export default function Match(){
    return(
        <>
        <div className="Match">
            <MatchCard />
            <MatchCard />
            <MatchCard />
        </div>
        </>
    )
}