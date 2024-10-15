import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./config";

export const emailVerification = async () => {
    const user = auth.currentUser as any;
    console.log("Awaiting email verification", user.email);
    try {
        await sendEmailVerification(user, {
            handleCodeInApp: true,
            url: "https://tinna-scheduler.firebaseapp.com"
        }).then(() => {
            // Show success message for user
            console.log("Email sent") });
    } catch (e) {
        throw e;
    }
};

export const signup = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await emailVerification();

        const user = userCredential.user;
        console.log("User registrered", user?.email);
        return user;
    } catch (e) {
        throw e;
    }
};

export const login = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User logged in", user?.email);
        return user;
    } catch (e) {
        throw e;
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
        console.log("User logged out");
    } catch (e) {
        throw e;
    }
};

