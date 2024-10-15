import { db } from "./config";
import { doc, setDoc, collection, query, getDocs, where } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { Slot } from '../app/components/interfaces/ScheduleObjects'


export const saveUserData = async (id: string, firstName: string, lastName: string) => {
    try {
        await setDoc(doc(db, "users", id), {
            firstName: firstName,
            lastName: lastName
        });
    } catch (e) {
        throw e;
    }
};

export const getProfileNameFromId = async (id:string) => {
    try {
        const userRef = collection(db, "users");
        const q = query(userRef,
            where("id", "==", id)
        );
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
            console.log("No matching documents.");
            return;
        }
        const user = snapshot.docs.map(doc => doc.data());
        const userName = user[0].firstName + " " + user[0].lastName;
        return userName;
    } catch (e) {
        throw e;
    }
};

export const getSchedule = async (scheduleId: string) => {
    try {
        const scheduleref = collection(db, "schedules");
        const q = query(scheduleref,
            where("id", "==", scheduleId)
        );
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
            console.log("No matching documents.");
            return;
        }
        snapshot.forEach(doc => {
            console.log(doc.id, "=>", doc.data());
        });
    } catch (e) {
        console.error("Error getting document:", e);
    }
};

export const getScheduleForDay = async (scheduleId: string, currDate: Date) => {
    if (currDate === null) {
        console.log("No date selected");
        return;
    }
    const currDateOnlyDate = currDate.toISOString().slice(0, 10);
    try {
        const slotsRef = collection(db, "slots");
        const queryConstraints = [
            where("scheduleId", "==", scheduleId),
            where("date", "==", currDateOnlyDate)
        ];

        const q = query(slotsRef,
            ...queryConstraints
        );
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
            console.log("No matching documents.");
            return;
        }
        const slots: Slot[] = snapshot.docs.map(doc => doc.data() as Slot);
        console.log(snapshot.docs.map(doc => doc.data()));

        return slots
    } catch (e) {
        console.error("Error getting document:", e);
    }
};