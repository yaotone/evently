interface Event {
    id?: number,
    photos: string[],
    name: string,
    place: string,
    description: string
}

interface TimedEvent extends Event {
    date: string,
    time: string
}

interface Place extends Event {
    worksFrom: string,
    worksTo: string,
    workDays: boolean[]
}

export type {Event}
export type {TimedEvent};
export type {Place}