/* eslint-disable consistent-return */
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

export default async function updateUser(id: any, data: any) {
    try {
        await updateDoc(doc(db, "chainCash", id), data);
    } catch (error) {
        console.log(error);
    }
}
