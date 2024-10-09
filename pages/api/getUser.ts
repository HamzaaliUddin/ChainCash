/* eslint-disable consistent-return */
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

export default async function getUser(id: any) {
    try {
        const querySnapshot = await getDoc(doc(db, "chainCash", id));
        if (querySnapshot.exists()) {
            return querySnapshot;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}
