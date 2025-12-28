import { useQuery } from "@tanstack/react-query"
import MatchCard from "../components/MatchCard"
import "./Match.css"
import axiosInstance from "../api/axios"


export default function Match(){

    const {data} = useQuery({
        queryKey: ["matches"],
        queryFn: async () => {
            const resp = await axiosInstance.get("/matches")
            return resp.data;
        },
        refetchInterval: 2000
    })

    return(
        <>
        <div className="Match">
            {(data && data.length != 0) ? data.map((match:any)=> {
                return <MatchCard photos={match.photos} nickname={match.nickname} tgNick={match.tgNick} decsription={match.decsription} events={match.events}/>;
            }):
            <h1 className="Match_empty">Попробуй полайкать больше людей!</h1>}
        </div>
        </>
    )
}