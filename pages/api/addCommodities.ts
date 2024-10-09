import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/utils/firebase';

export default async function addCommodities(data1: any) {
    try {
        await addDoc(collection(db, 'Commodities'), data1);
    } catch (e) {
        console.error('Error adding document:', e);
    }
}
