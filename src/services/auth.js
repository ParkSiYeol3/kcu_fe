import { auth } from "../config/firebase";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

export async function login(email, password) {
    try {
        const cred = await signInWithEmailAndPassword(auth, email, password)
        return cred.user;
    } catch(err) {
        console.error(err)
        throw err;
    }
}

export async function logout() {
    try {
        await signOut(auth);
    } catch(err) {
        console.error(err)
        throw err;
    }
}

// 인증 상태 변경 감지 함수
export function onAuthStateChange(callback) {
    return onAuthStateChanged(auth, callback);
}