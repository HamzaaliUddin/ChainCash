import { setDoc, doc } from "firebase/firestore";
import { db } from "@/utils/firebase";

export default async function addUser(data: any) {
    try {
        await setDoc(doc(db, "chainCash", data.uid), data);
        return { ...data, id: data.uid };
    } catch (e) {
        console.error("Error adding document:", e);
    }
}
