// import { addDoc, collection } from 'firebase/firestore';
// import { db } from '@/utils/firebase';

// export default async function addTax(data1: any) {
//     try {
//         await addDoc(collection(db, 'Commodities'), data1);
//     } catch (e) {
//         console.error('Error adding document:', e);
//     }
// }

import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';

export default async function setTax(data1: any, userId: any) {
    try {
        await setDoc(doc(db, "TaxQoute", userId?.uid), data1);
    } catch (e) {
        console.error('Error adding document:', e);
    }
}



