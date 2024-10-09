/* eslint-disable consistent-return */
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase';

export default async function getCapitual() {
    try {
        const querySnapshot = await getDocs(collection(db, 'Capitual'));
        return querySnapshot.docs.map((i) => ({ ...i.data(), id: i.id }));
    } catch (error) {
        console.log(error);
    }
}
