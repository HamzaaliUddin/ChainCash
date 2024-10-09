import { auth } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import getUser from "pages/api/getUser";

export const getUserReload = (callback: any) => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const firebaseuser = await getUser(user.uid);
            if (firebaseuser) return callback({ ...firebaseuser.data(), id: firebaseuser.id });

            throw new Error("User not found");
        }
    });
};
