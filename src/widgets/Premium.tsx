import PremiumCard from "../components/PremiumCard"
import "./Premium.css"

interface IPremium{
    tg: any;
}

export default function Premium({tg}:IPremium){
    return(
        <>
        <div className="Premium">
            <PremiumCard />
        </div>
        </>
    )
}