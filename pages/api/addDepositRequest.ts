import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/utils/firebase';

export default async function addDepositRequest(data: any) {
    try {
        await addDoc(collection(db, 'Deposit'), data);
    } catch (e) {
        console.error('Error adding document:', e);
    }
}
