export interface Slot {
    id: string;
    date: string;
    time: string;
    duration: string;
    user: string;
    scheduleId: string;
    userName?: string;
}



export interface Schedule {
    id: string;
    name: string;
    owner: string;
}