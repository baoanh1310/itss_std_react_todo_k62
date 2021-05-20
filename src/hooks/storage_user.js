import { useState, useEffect } from 'react';
import {db_user, storageImage} from '../lib/firebase'

function useStorageUser() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchData =  async () => {
            const snap = await db_user.get();
            setUsers(snap.docs.map(doc => (
                {...doc.data(), key: doc.id}
            )));
        };
        fetchData();
    }, []);

    const addUser = async user => {
        await db_user.doc(`${user.key}`).set({
            name: user.name,
            image: user.image,
        });
        setUsers([user,...users]);
    };

    const updateUser = async user => {
        await db_user.doc(`${user.key}`).update({
            name: user.name,
            image: user.image,
        })
    };

    return [users, addUser, updateUser];
}

export default useStorageUser;
