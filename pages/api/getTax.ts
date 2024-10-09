/* eslint-disable consistent-return */

import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase';

export default async function getTax() {
    try {
        const querySnapshot = await getDocs(collection(db, 'TaxQoute'));
        return querySnapshot.docs.map((doc) => ({
            normalUserTax: doc.data().normalUserTax,
            specialUserTax: doc.data().specialUserTax,
        }));
    } catch (error) {
        console.log(error);
    }
}
