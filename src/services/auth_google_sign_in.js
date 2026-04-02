import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../config/firebase";

export async function googleSignIn() {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const cred = GoogleAuthProvider.credentialFromResult(result);
    return {user:result?.user?.email, token:cred?.accessToken}
  } catch(err) {
    console.error(err)
    throw err;
  }
}