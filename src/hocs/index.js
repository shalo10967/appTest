import React, { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

export function User() {
        const subscriber = firestore()
            .collection('Banks')
            .doc("tIHTYZV9w9g8GrciE2KG")
            .onSnapshot(documentSnapshot => {
                console.log(documentSnapshot.data())
                return documentSnapshot.data();
            });

        // Stop listening for updates when no longer required
        return subscriber();
}