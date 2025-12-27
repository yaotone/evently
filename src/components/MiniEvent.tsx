import "./MiniEvent.css"

interface IMiniEvent {
    text: string
}

export default function MiniEvent({ text }: IMiniEvent) {
    return (
        <div className="MiniEvent">{text}</div>
    )
}