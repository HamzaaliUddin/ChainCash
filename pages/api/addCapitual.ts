import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/utils/firebase';

export default async function addCapitual(data: any) {
    try {
        await addDoc(collection(db, 'Capitual'), data);
    } catch (e) {
        console.error('Error adding document:', e);
    }
}
