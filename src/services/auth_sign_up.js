import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

export async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)

    const user = userCredential.user
    console.log("회원가입 성공: ", user)
    return user;
    
  } catch(err) {
    console.error("회원가입 실패: ", err);
    throw err;
  }
}