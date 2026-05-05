import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Test connection
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
testConnection();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout failed", error);
  }
};

export const deleteCurrentUser = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("Tidak ada pengguna yang masuk");
  
  try {
    // 1. Delete Firestore data first (optional but recommended)
    // await deleteDoc(doc(db, 'users', user.uid));
    
    // 2. Delete Auth account
    await user.delete();
  } catch (error: any) {
    if (error.code === 'auth/requires-recent-login') {
      throw new Error("Sesi login anda sudah terlalu lama. Silakan logout dan login kembali untuk menghapus akun.");
    }
    throw error;
  }
};
